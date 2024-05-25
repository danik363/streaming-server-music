const router = require('express').Router();
const controller = require('../components/tracks/controller.js');

router.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*'); // Puedes ajustar esto a tu dominio específico
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

router.get('/tracks/:id', (req, res)=> {
    res.setHeader('Content-Type', 'audio/mpeg');
    console.log('Init route');
    controller.getTrack(req.params.id)
        .then((path) =>{
            console.log(path)
            controller.musicLoader(path, req, res);
        })
})

router.get('/playLists/:id', (req, res)=> {
    console.log('playLists');
    res.end('playList');
})

module.exports = router;
