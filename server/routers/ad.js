const express = require('express');
const Ad = require('../models/ad');
const auth = require('../middleware/auth');
const {saveAd,getAllAds,getMyAds,updateAd,deletAd,validAd,getAllMatchAds,validFilter} = require('../middleware/ad');
const {deletS3,uploadS3,updateS3} = require('../middleware/s3Middleware');
const router = new express.Router();


router.post('/newAd', auth,validAd,uploadS3,saveAd,deletS3, async (req, res) => {
    res.status(201).send();
})

router.get('/ads',getAllAds ,async (req, res) => {
    res.status(200).send(res.body);
})
router.post('/ads',validFilter,getAllMatchAds ,async (req, res) => {
    res.status(200).send(res.body);
})

router.get('/myAds', auth,getMyAds, async (req, res) => {
    res.status(200).send(res.body)
    
})
router.patch('/editAd/:id', auth,validAd,updateAd,updateS3, async (req, res) => {
    res.status(200).send()
})
router.delete('/removeAd/:id', auth,deletAd,deletS3, async (req, res,next) => {
    res.status(200).send()
})


module.exports = router;