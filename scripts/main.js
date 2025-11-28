// 1. SELEÇÃO DE ELEMENTOS DOM
const body = document.querySelector('body');
const themeSwitch = document.getElementById('theme-switch');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author')
const generateBtn = document.getElementById('generate-btn');
const twitterShareBtn = document.getElementById('twitter-share-btn');

// URL DA API ZENQUOTES
const API_URL = 'https://zenquotes.io/api/random';