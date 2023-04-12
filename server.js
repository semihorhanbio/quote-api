const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    res.json({quote: randomQuote});
});

app.get('/api/quotes', (req, res, next) => {
    if (req.query.person) {
        const personQuotes = quotes.filter(quote => quote.person === req.query.person);
        res.json({quotes: personQuotes});
    } else if (req.query.person === '') {
        res.json({quotes: []});
    }

    res.json({quotes: quotes});
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));