import Moment from 'moment'

const filterSelector = (ads, { sortBy,picture,price }) => {
    return ads.filter((ad) => {
        const needPictureMatch = picture ? (!!ad.image1|| !!ad.image2 || !!ad.image3) :true;
        const needPriceTag = price ? !!ad.price :true;
        return needPictureMatch && needPriceTag;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return  new Moment(b.createdAt).valueOf() -  new Moment(a.createdAt).valueOf();
        }
        if (sortBy === 'highToLow') {
            return a.price < b.price ? 1 : -1;
        }
        if (sortBy === 'lowToHigh') {
            return a.price < b.price ? -1 : 1;
        }
        return 1;
    })
}
export default filterSelector;