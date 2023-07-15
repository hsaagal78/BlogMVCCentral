// all dependes
require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const session = require('express-session');

//Import our data base from connection folder
const session = require('express-session');


const app = express();
const PORT = process.env.PORT || 3333;

// Our first Middleware
app.use(express.json());  //"Let's the client/browser send JSON in a request."
