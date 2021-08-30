import './App.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useEffect, useState } from 'react';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import cold from './cold-bg.jpg';
import warm from './warm-bg.jpg';

function App() {
  const API_KEY = ""; //GET IT FROM OPENWEATHER
  const [cityName, setCityName] = useState('Mumbai');
  const [query, setQuery] = useState(`https://api.openweathermap.org/data/2.5/weather?q=mumbai&units=metric&appid=${API_KEY}`);
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const getData = async () => {
      await fetch(query)
      .then((res) => res.json())
      .then((data) => {
        const fdata = {
          temp: Math.round(data.main.temp),
          main: data.weather[0].main,
          name: data.name,
          country: data.sys.country
        }
        setWeather(fdata);
      });
    };
    getData();
    setCityName('');
  }, [query]);

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let today = new Date(),
    time = today.getHours() + ':' + today.getMinutes();

    return `${day} ${date} ${month} ${year} ${time}`
  }

  const search = (event) => {
    event.preventDefault();
    setQuery(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`);
  }

  return (
    <div className="App">
      <Card className="main-card" style={weather.temp <= 20 ? {backgroundImage: `url(${cold})`}:{backgroundImage:`url(${warm})`}}>
        <CardContent >
          <div className="search-box">
          <form onSubmit={search} className="search-box">
          <InputBase
              className="search-bar"
              placeholder="City Name"
              onChange={e => setCityName(e.target.value)}
              value={cityName}
          />
          <IconButton onClick={search}><SearchIcon/></IconButton>
          </form>
          </div>
          <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weathers-box">
            <div className="temprature">
              {weather.temp}°c
            </div>
          </div>
          <div className="weathers">{weather.main}</div>
        </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
