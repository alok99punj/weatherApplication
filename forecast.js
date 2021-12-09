const key = "1SAGSDqBbaiLrWvDwnqxAWmrwd7ihyDb";
// getting weather info
const current=async(keu)=>
{
    const resource= "http://dataservice.accuweather.com/currentconditions/v1/";
    const query= `${keu}?apikey=${key}`;
    const response=await  fetch(resource+query);
    const data = await response.json();
    return data[0];
};

// getting location info
const info=async(city)=>{
 const base="http://dataservice.accuweather.com/locations/v1/cities/search";
 const query=`?apikey=${key}&q=${city}`;
 const response = await fetch(base+query);
 const data = await response.json();
 if(response.status==200)

 return data[0];
 else 
 return "an error has occured";
}
 info("bangalore").then(data=>{
    return current(data.Key);
   
}).then(data=>{
  console.log(data);
}).catch(err=>{
    console.log(err);

});
