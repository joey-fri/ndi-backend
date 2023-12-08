# NDI-BACKEND Project

## Overview

NDI-BACKEND is a backend service built with Node.js using the Express.js framework and Mongoose for MongoDB object data modeling. It is designed to serve multi-lingual question and answer data for a frontend application.

## Features

- Support for multiple languages: French (FR), English (EN), Spanish (ES), German (DE), Russian (RU), Arabic (AR), Chinese (ZH), Japanese (JA).
- Cross-Origin Resource Sharing (CORS) enabled for a pre-defined list of origins.
- MongoDB database integration for storing and querying question data.
- RESTful API endpoint to fetch five random questions in a specific language.
- Secured endpoints that require an API key for access.

## Installation

To set up the NDI-BACKEND project, follow these steps:

### Prerequisites

- Node.js must be installed on your system.
- A MongoDB instance should be running and accessible.
- You need to create a `.env` file in the project root with the following keys:
  - `PORT`: The port on which the server will run.
  - `DB_ACCESS`: Your MongoDB connection URI.
  - `API_KEY`: A secure API key to protect routes.

### Setup

1. Clone the project repository to your local machine.
2. In the project directory, run `npm install` to install dependencies.
3. Start the server with `node server.js`.

### Configuring Environment Variables

Create a `.env` file in the root directory and fill in the following template with your details:

```env
PORT=3000
DB_ACCESS=mongodb://<username>:<password>@<host>:<port>/<database>
API_KEY=your_chosen_api_key
```

## API Endpoints

### Get Random Questions

**GET** `/api/questions/:lang`

Fetches five random questions in a specified language. The `:lang` parameter should be one of the supported language codes: `FR`, `EN`, `ES`, `DE`, `RU`, `AR`, `ZH`, `JA`.

#### Headers

- `apikey`: Your API key for authorization.

## Project Structure

```plaintext
NDI-BACKEND
│   .env
│   .gitignore
│   package-lock.json
│   package.json
│   server.js
│
└───node_modules
│
└───routes
    │   questions.js

