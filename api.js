const express = require('express');
const aposToLexForm = require('apos-to-lex-form');
const app = express()
const natural = require('natural');
const SpellCorrector = require('spelling-corrector');
const SW = require('stopword');

const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();

app.use(express.json());

app.post('/', function (req, res) {
	console.log('body is:', req.body);
	const {description} = req.body;
	console.log('Description is:', description);

	const lexedReview = aposToLexForm(description);
	const caseReview = lexedReview.toLowerCase();
	const alphaOnlyReview = caseReview.replace(/[^a-zA-Z\s]+/g, '');

	const { WordTokenizer } = natural;
	const tokenizer = new WordTokenizer();
	const tokenReview = tokenizer.tokenize(alphaOnlyReview);

	tokenReview.forEach((word, index) => {
		tokenReview[index] = spellCorrector.correct(word);
	})
	const filteredReview = SW.removeStopwords(tokenReview);

	const { SentimentAnalyzer, PorterStemmer } = natural;
	const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
	const analysis = analyzer.getSentiment(filteredReview);


	console.log('Sentiment is:', analysis);

	res.status(200).json(JSON.stringify({analysis}))
})

app.listen(3000, () => {
	console.log('listening on port 3000');
});
