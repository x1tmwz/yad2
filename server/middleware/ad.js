const Ad = require('../models/ad');
const adOptions = require('../data/data/values.json').AdOptions;
const filterOptions = require('../data/data/values.json').filterOptions;

const saveAd = async (req, res, next) => {
    const ad = new Ad({ ...req.body, owner: req.user._id })
    try {
        await ad.save();
        next();
    } catch (e) {
        next(e);
    }
}
const getAllAds = async (req, res, next) => {
    try {
        const ads = await Ad.find({}).sort({createdAt: -1}).limit(parseInt(req.query.limit));
        res.body = ads;
        next();
    } catch (e) {
        res.status(400).send(e.message)
    }
}
const getAllMatchAds = async (req, res, next) => {
    const filterQuery = ({
        assetType,
        city,
        street,
        floorFrom,
        floorTo,
        roomFrom,
        roomTo,
        apartmentProperties,
        priceFrom,
        priceTo,
        houseSizeFrom,
        houseSizeTo,
        date }) => {
        const rangeObj = (from, to = 0) => {
            if (to === 0) {
                return { $gte: from }
            } else {
                return { $gte: from, $lte: to }
            }
        }
        const query = {
            assetType: assetType ? assetType : undefined,
            city: city ? city : undefined,
            street: street ? street : undefined,
            floor: rangeObj(floorFrom, floorTo),
            rooms: rangeObj(roomFrom, roomTo),
            apartmentProperties: apartmentProperties.length !== 0 ? { $in: apartmentProperties } : undefined,
            price: rangeObj(priceFrom, priceTo),
            houseSize: rangeObj(houseSizeFrom, houseSizeTo),
            date: date ? { $lte: date } : undefined
        }
        Object.keys(query).forEach(key => query[key] === undefined && delete query[key])
        return query
    }
    try {
        const ads = await Ad.find(filterQuery(req.body)).sort({createdAt: -1}).limit(parseInt(req.query.limit));
        res.body = ads;
        next();
    } catch (e) {
        res.status(400).send(e.message)
    }
}
const getMyAds = async (req, res, next) => {
    try {
        await req.user.populate({
            path: 'ads',
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
            }
        }).execPopulate();
        res.body = (req.user.ads)
        next()
    } catch (e) {
        res.status(500).send(e)
    }
}
const validAd = (req, res, next) => {
    const updates = Object.keys(req.body)
    const isValidOption = updates.every((update,index) => adOptions.includes(update));
    if (!isValidOption) return res.status(400).send({ error: 'invalid updates' });
    next();
}
const validFilter = (req, res, next) => {
    const filters = Object.keys(req.body)
    const isValidOption = filters.every((update) => filterOptions.includes(update));
    if (!isValidOption) return res.status(400).send({ error: 'invalid updates' });
    next();
}
const updateAd = async (req, res, next) => {
    try {
        const ad = await Ad.findOne({ _id: req.params.id, owner: req.user._id });
        if (!ad) res.status(404).send();
        adOptions.slice(0).splice(0, 14).forEach((update) => {
            return ad[update] = req.body[update]
        }
       )
        req.ad = ad;
        next();
    } catch (e) {
        res.status(500).send();
    }
}
const deletAd = async (req, res, next) => {
    try {
        const ad = await Ad.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        if (!!ad) {
            req.body = ad;
            next(new Error(""));
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        res.sendStatus(500)
    }
}


module.exports = {
    saveAd,
    getAllAds,
    getMyAds,
    updateAd,
    deletAd,
    validAd,
    getAllMatchAds,
    validFilter
}