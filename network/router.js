const router = require('express').Router();
const controller = require('../components/tracks/controller.js');

router.use((req, res, next)=>{
    next();
})

router.get('/tracks/:id', (req, res)=> {

    res.setHeader('Content-Type', 'audio/mp3');
    console.log('Init route');
    controller.getTrack(req.params.id)
        .then((path) =>{
            controller.musicLoader(path, res);
        })
})

router.get('/playLists/:id', (req, res)=> {
    console.log('playLists');
    res.end('playList');
})

module.exports = router;
