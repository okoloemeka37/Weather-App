let get_btn=document.querySelector(".get");

let appid="a154d3fb48eb4c32e22b024bed3eae2a";
get_btn.addEventListener("click",()=>{
    let input=document.querySelector("#Input");
   City =input.value;
   
get()


})





function get() {
    
    
// Make a request to the OpenWeatherMap API
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${appid}`)

        .then(response => {
            // Check if the request was successful (status code 200)
            if (!response.ok) {
          
              document.querySelector(".err").innerHTML=(`Error: Unable to retrieve weather data. Check Your City Name`);
             
              return false;
           
            }else{
                document.querySelector(".err").innerHTML='';
                document.querySelector(".location").innerHTML=City;
                return response.json();
            }
            // Parse the JSON response
            
          })
        
    .then(data => {
        // Extract and use the weather data
       
        document.querySelector(".condition").innerHTML=data.weather[0].description;
        document.querySelector(".high").innerHTML="High : " + Math.round(data.main.temp_max - 273.15)+ "°C";
        document.querySelector(".low").innerHTML="Low : " + Math.round(data.main.temp_min - 273.15)+ "°C";
        document.querySelector(".temperature").innerHTML=Math.round(data.main.temp- 273.15)+ "°C";

        //getting icon code
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
        document.querySelector(".icon").src=iconUrl;
       // console.log(data)
    })
    .catch(error => console.error('Error fetching weather data:', error));

   
}





if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
  
        // Use the OpenStreetMap Nominatim API for reverse geocoding
        const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
  
        // Make the GET request for reverse geocoding
        fetch(apiUrl)
          .then(response => {
            if (!response.ok) {
                document.querySelector(".err").innerHTML=(`Error: Unable to retrieve address. Status code ${response.status}`);
            }
            return response.json();
          })
          .then(locationData => {
            // Extract and log the address information
            City=locationData.address.state;
           document.querySelector(".location").innerHTML=City;
           document.querySelector("#Input").value=City
            let country=locationData.address.country;
            get()
          })
         
      },
   
    );
  } else {
    console.error('Geolocation is not supported by your browser');
  }
  