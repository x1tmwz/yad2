export default (status=500)=>{
    if(status === 500){
        return "יש לך בעיה באינטרנט סטאטוס 500"
    }
    if(status === 200 || status === 201 ){
        return false;
    }else{
        return `${status} בקשה גרועה סטאטוס`
    }
}