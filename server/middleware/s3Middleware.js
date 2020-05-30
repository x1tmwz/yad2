const imageOptions = require('../data/data/values.json').imageOptions;
const s3 = require('../aws/s3');

const getFileKeyName=(url)=>{
    return url.split("/")[3];
}

const uploadS3 = async (req, res, next) => {
    try {
        for(let imageOption of imageOptions){
            const image =req.body[imageOption];
            if(image){
               const url = await s3.uploadFile(image);
               req.body[imageOption] = url;
            }
        }
        next();
    } catch (e) {
        
        res.status(400).send({ error: 'image Upload failed' });
    }

}
const deletS3 = async (err, req, res,next) => {
    try {
        for (let imageOption of imageOptions) {
            const image = req.body[imageOption];
            if (image) {
                const imageKey = getFileKeyName(image);
                await s3.deletFile(imageKey)
            }
        }
        if(err.message){
         
            res.status(400).send();
        }
        next();
    } catch (e) {
        
        res.status(400).send({ error: 'somthing went wrong' });
    }
}
const updateS3 =async(req,res,next)=>{
    try{
        for(let imageOption of imageOptions){
            const image =req.body[imageOption];
            if(typeof image !=="string"){
               await s3.deletFile(getFileKeyName(req.ad[imageOption]));
               const url = await s3.uploadFile(image);
               req.ad[imageOption] = url;
            }
        }
        await req.ad.save();
        next();
    }catch(e){
        res.status(400).send();
    }

}

module.exports = {deletS3,uploadS3,updateS3};