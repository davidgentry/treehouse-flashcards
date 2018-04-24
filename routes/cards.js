const express = require('express');
const router = express.Router();
const { data } = require('../data/flashCardData.json');
const { cards } = data;

router.get('/', (req, res) => {
    const numCards = cards.length;
    const flashCardID  = Math.floor( Math.random() * numCards );
    res.redirect( `/cards/${flashCardID}?side=question`)
});


router.get('/:id', (req, res) => {
    const { side } = req.query;
    const { id } = req.params;

    if ( !side ) {
        return res.redirect(`/cards/${id}?side=question`);

    }
    const name = req.cookies.username;
    const text = cards[id][side];
    const { hint } = cards[id];
    
    const templateData = { id, text, name, side };

    if (side === "question") {
        
        templateData.hint = hint;
        templateData.sideToShow = 'answer';
        templateData.sideToShowDisplay = 'Answer';

    } else if (side === "answer"){
        templateData.sideToShow = 'question';
        templateData.sideToShowDisplay = 'Question';

    }
    res.render('card', templateData)
    });



module.exports = router;
