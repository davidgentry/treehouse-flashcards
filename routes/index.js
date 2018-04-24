const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    const name = req.cookies.username;

    if (name == null )
        res.redirect('/hello');
    else 
        res.render('index', { name });

});

router.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if (name)
        res.redirect('/');
    else   
        res.render('hello');

});

router.post('/hello', (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/');

});

router.post('/goodbye', (req, res) => {
    const name = req.cookies.username;
    res.clearCookie('username');
    res.redirect('/hello');

});

module.exports = router;
