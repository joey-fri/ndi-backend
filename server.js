const express = require('express');

const app = express();

const PORT = process.env.PORT || 4200;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
