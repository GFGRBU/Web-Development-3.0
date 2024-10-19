import React from 'react'
import './Weather.css'
import { useState } from 'react'
// import { FaSearch } from "react-icons/fa";
// import { MdSearch } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
function Weather() {

    const[inputImg,setInputImg]=useState('Img/clear.png');
    let api_key=process.env.REACT_APP_API_KEY;
    const search= async ()=>{
        const searchPlace=document.getElementsByClassName("searchInput");
        if(searchPlace[0].value==0){
            alert('Invalid city on search');
            console.log("no city found");        }
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchPlace[0].value}&units=Metric&appid=${api_key}`

        let response=await fetch(url);
        let data=await response.json();
        const humidity=document.getElementsByClassName("humidity");
        const temp=document.getElementsByClassName("temp");
        const wind=document.getElementsByClassName("wind");
        const place=document.getElementsByClassName("place")

        humidity[0].innerHTML= data.main.humidity+"%";
        temp[0].innerHTML=Math.floor(data.main.temp)+"°C";
        wind[0].innerHTML=data.wind.speed+"Km/h";
        place[0].innerHTML=data.name;

        if(data.weather[0].icon==='01d' || data.weather[0].icon==='01n'){
            setInputImg('Img/clear.png');
        }
        else if(data.weather[0].icon==='02d' || data.weather[0].icon==='02n'|| data.weather[0].icon==='03d' || data.weather[0].icon==='03n' ){
            setInputImg('Img/cloud.png');
        }
        else if(data.weather[0].icon==='10d' || data.weather[0].icon==='10n' || data.weather[0].icon==='11d' || data.weather[0].icon==='11n'){
            setInputImg('Img/rain.png');
        }
        else if(data.weather[0].icon==='04d' || data.weather[0].icon==='04n' || data.weather[0].icon==='09d' || data.weather[0].icon==='09n'){
            setInputImg('Img/drizzle.png');
        }
        else if(data.weather[0].icon==='13d' || data.weather[0].icon==='13n'){
            setInputImg('Img/snow.png');
        }
        else{
            setInputImg('Img/clear.png');
        }
    }


  return (

    <div className='main'>
        <div className='top'>
            <input type='text' className="searchInput" placeholder='Search'/>
            <div className='search' onClick={()=>{search()}}><FaSearch color='black' size={40} /></div>
        </div>

        <div className='logo'>
            <img src={inputImg}/>
        </div>
        
        <div className='temp'>24°C</div>
        <div className='place'>Amla</div>

        <div className='bottom'>
            <div className='bottom-in'>
                <img src='Img/humidity.png'/>
                <div className='data'>
                    <div className='humidity'>50%</div>
                    <div className='text'>Humidity</div>
                </div>
            </div>
            
            <div className='bottom-in'>
                <img src='Img/wind.png'/>
                <div className='data'>
                    <div className='wind'>18km/h</div>
                    <div className='text'>Wind Speed</div>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Weather
