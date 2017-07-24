const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser').urlencoded({ extended: false });
const Word = require('./Word');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => {
    Word.find()
    .then(words => res.render('home', { words }));
});

app.get('/remove/:id', (req, res) => {
    const { id } = req.params;
    Word.findByIdAndRemove(id)
        .then(() => res.redirect('/'))
        .catch(err => {
            res.send(err);
            console.log(err);
        });
});

app.get('/edit/:id', (req, res) => {
    Word.findById(req.params.id)
        .then(word => res.render('edit', word))
        .catch(err => res.send(err));
});

app.post('/word/:id', parser, (req, res) => {
    const { vn, en } = req.body;
    Word.findByIdAndUpdate(req.params.id, { vn, en })
        .then(() => res.redirect('/'))
        .catch(err => res.send(err));
});

app.post('/word', parser, (req, res) => {
    const { en, vn } = req.body;
    const word = new Word({ en, vn });
    word.save()
        .then(() => res.redirect('/'))
        .catch(err => res.send('Got an error here'));
});

//Start server code
mongoose.connect('mongodb://localhost/words_db');

mongoose.connection.once('open', () => {
    app.listen(3000, () => console.log('Server started!'));
})

