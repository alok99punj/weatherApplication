const cityf = document.querySelector("form ");
const details= document.querySelector(".details");
const card = document.querySelector(".card");
const time= document.querySelector("img.time");
const icon= document.querySelector("icons.img");

/*cityf.addEventListener("submit",(e)=>{
    e.preventDefault();
    const cityName= cityf.city.value.trim();
    cityf.reset();
   update(cityName).then(data=>{
    //uiUpdate(data);
      console.log(data.cityDets);
      console.log(data.weather);
      //func(data);

   }).catch(err=>{
       console.log("an error has occured");

   });
});*/

cityf.addEventListener('submit', async (e) => {
    e.preventDefault();
   
    const city = cityf.city.value.trim();
    cityf.reset();
   
    try {
      const data = await update(city);
      uiUpdate(data);
    } catch (err) {
      console.log(err);
    }
   
    // updateCity(city)
    //   .then((data) => updateUI(data))
    //   .catch((err) => console.log(err));
  });

//updating the ui of the web page 
const uiUpdate=(data)=>{
    const cityDets=data.cityDets;
    const weather=data.weather;
    //updating the document object 
    details.innerHTML=` <div class="text-muted text-uppercase text-center details">
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  </div>`
  if(card.classList.contains("d-none"))
  
    card.classList.remove("d-none");
    let timeSrc=null;
    if(weather.IsDayTime)
    {
      timeSrc="img/day.svg";
    }
  else{
    timeSrc="img/night.svg";
  }
  time.setAttribute("src",timeSrc);
  const type= `img/icons/${weather.WeatherIcon}.svg`;
  icons.setAttribute("src",type);
}

//retrieving info via api calls 
 const update= async(name)=>
 {
  const cityDets= await info(name);
   const weather = await current(cityDets.Key);
   //console.log(weather);
   //console.log(cityDets);
   return {
       cityDets,
       weather

   }
 }

 const func=(dat)=>{
     uiUpdate(dat);
 }