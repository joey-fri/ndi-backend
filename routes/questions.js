const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define the subdocument schema for the content of each language
const LanguageContentSchema = new mongoose.Schema({
    Question_1: { type: String, required: true },
    Answer_1: { type: String, required: true },
    Answer_2: { type: String, required: true },
    Answer_3: { type: String, required: true },
    Explication_1: { type: String, required: true },
    Explication_2: { type: String, required: true },
    Explication_3: { type: String, required: true },
    Score_1: { type: Number, required: true },
    Score_2: { type: Number, required: true },
    Score_3: { type: Number, required: true },
}, { _id: false }); // No need for _id in subdocument schema

// Define the main document schema
const QuestionSchema = new mongoose.Schema({
    FR: { type: LanguageContentSchema, required: false },
    EN: { type: LanguageContentSchema, required: false },
    ES: { type: LanguageContentSchema, required: false },
    DE: { type: LanguageContentSchema, required: false }, // Langue allemande
    RU: { type: LanguageContentSchema, required: false }, // Langue russe
    AR: { type: LanguageContentSchema, required: false }, // Langue arabe
    ZH: { type: LanguageContentSchema, required: false }, // Langue chinoise
    JA: { type: LanguageContentSchema, required: false }, // Langue japonaise
});

// Create the Mongoose model from the schema
const QuestionModel = mongoose.model('Question', QuestionSchema);

// GET route to fetch 5 random questions in a specific language
router.get('/:lang', async (req, res) => {
    const lang = req.params.lang.toUpperCase();
    if (!['FR', 'EN', 'ES', 'DE', 'RU', 'AR', 'ZH', 'JA'].includes(lang)) {
        return res.status(400).send('Invalid language code');
    }

    try {
        // Fetch all questions in the specified language
        const questionsData = await QuestionModel.aggregate([
            { $match: {} },
            { $project: { content: `$${lang}` } },
            { $sample: { size: 5 } } // Randomly select 5 documents
        ]);

        if (!questionsData || questionsData.length === 0) {
            return res.status(404).send('No questions found for this language');
        }

        res.json(questionsData.map(q => q.content));
    } catch (error) {
        res.status(500).send('Server error: ' + error.message);
    }
});

module.exports = router;
