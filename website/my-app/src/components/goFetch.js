

export default function goFetch(uri,stateFunc){
    
    const requestOptions = {
        method: 'GET'
    };
    fetch(uri,requestOptions)
    .then((response)=>
        response.json()
    )
    .then((data)=>{
        stateFunc(data);
    })
    .catch((error)=>{
        throw new Error(error);
    });
}