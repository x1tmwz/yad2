const sortByPriceLowToHigh = ()=>({
    type:'SORT_BY',
    sortBy:'lowToHigh'
})
const sortByPriceHighToLow = ()=>({
    type:'SORT_BY',
    sortBy:'highToLow'
})
const sortByDate =()=>({
    type:'SORT_BY',
    sortBy:'date'
})
const sortByPicture =()=>({
    type:"SORT_BY_PICTURE"
})
const sortByPriceTag=()=>({
    type:"SORT_BY_PRICE_TAG"
})
export {sortByDate,sortByPriceHighToLow,sortByPriceLowToHigh,sortByPicture,sortByPriceTag};