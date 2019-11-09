import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import moment from "moment";
import SearchBar from "./components/SearchBar";
import DayCard from "./components/DayCard";
import DayDetails from "./components/DayDetails";
import sampleData from "./data/sample.json";
import API from "./utils/API";

const App = () => {
  // array destructuring
  // naming the state value, and then naming the method I want to use
  // const [day, setDay] = useState("Monday");
  // const [mood, setMood] = useState("Sad");

  const [data, setData] = useState({
    days: [],
    location: "",
    selectedDay: null,
    searchTerm: ""
  })

  const getWeather = city => {
    API.getWeather(city)
      .then(res => {
        console.log(res);
        setData({
          searchTerm: "",
          selectedDay: null,
          days: res.data.data,
          location: res.data.city_name + ", " + res.data.state_code
        })
      })
      .catch(err => console.log(err));
  }

  // destructuring so wouldn't have to use data.days etc
  const { days, location, selectedDay, searchTerm } = data;

  // only on initial render trigger getWeather with Denver, CO
  useEffect(() => {
    getWeather("Denver, CO");
  }, []);

  useEffect(() => {
    document.title = `This week's weather ${location ? "for " + location : ""}`;
  }, [location]);



  const setSelectedDay = day => {
    setData({
      ...data, // copy in the existing state so we don't lose it
      selectedDay: day // add our change on top of it!!!
    });
  }

  const handleInputChange = event => {
    setData({
      ...data,
      searchTerm: event.target.value
    })
  }

  const handleFormSubmit = event => {
    event.preventDefault();
    if (searchTerm) {
      getWeather(searchTerm);
    } else {
      alert("You must type a city to search!");
    }

  }

  return (
    <Container>
      <Row>
        <Col md={8}><h1>Weather For {location}</h1></Col>
        <Col md={4}>
          <SearchBar
            searchTerm={searchTerm}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
          />
        </Col>
      </Row>
      <Row>
        {/* generating a DayCard for each day */}
        {days.map(day => (
          <DayCard
            key={day.ts}
            day={moment(day.valid_date, "YYYY-MM-DD").format("dddd")}
            current={day.temp}
            high={day.max_temp}
            low={day.min_temp}
            icon={day.weather.icon}
            description={day.weather.description}
            setSelectedDay={() => setSelectedDay(day)}
            isActive={day === selectedDay}
          />
        ))}
      </Row>
      <Row>
        <Col>
          {selectedDay ? (
            <DayDetails
              day={moment(selectedDay.valid_date, "YYYY-MM-DD").format("dddd, MMMM Do, YYYY")}
              current={selectedDay.temp}
              high={selectedDay.max_temp}
              low={selectedDay.min_temp}
              icon={selectedDay.weather.icon}
              description={selectedDay.weather.description}
              windSpeed={selectedDay.wind_spd}
              windDir={selectedDay.wind_cdir_full}
              precip={selectedDay.pop}
            />
          ) : (
              <h3>Click on the day above to get weather details!</h3>
            )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
