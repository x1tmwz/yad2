const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    assetType: {
        type: String,
        trim: true,
        required: true
    },
    assetStatus: {
        type: String,
        trim: true,
        required: true
    },
    city: {
        type: String,
        trim: true,
        required: true
    },
    street: {
        type: String,
        trim: true,
        required: true
    },
    floor: {
        type: Number,
        trim: true,
        required: true
    },
    floorsInBuilding: {
        type: Number,
        trim: true,
        required: true
    },
    rooms: {
        type: Number,
        trim: true,
        required: true
    },
    apartmentProperties: [{
        type: String,
        trim: true,
    }],
    description: {
        type: String,
        trim: true,
    },
    houseSize: {
        type: Number,
        trim: true,
        required: true
    },
    gardenSize: {
        type: Number,
        trim: true,
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    image1: {
        type: String,
        trim: true,
    },
    image2: {
        type: String,
        trim: true,
    },
    image3: {
        type: String,
        trim: true,
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: true
    },
    contact: {
        type: String,
        trim: true,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
}
)


const Ad = mongoose.model('Ad', adSchema)
module.exports = Ad;