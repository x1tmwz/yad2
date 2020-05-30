export default (value="",dataValue=[],dictionary=[])=>{
    const index = dataValue.findIndex((name)=>value === name);
    return dictionary[index];
}