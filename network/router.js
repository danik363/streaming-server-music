const router = require('express').Router();


router.use((req, res, next)=>{
    res.contentType('application/json');
    next();
})

router.get('/tracks/:id', (req, res)=> {
  console.log('tracks');
  res.end('tracks');  
})

router.get('/playLists/:id', (req, res)=> {
    console.log('playLists');
    res.end('playList');
})

module.exports = router;
