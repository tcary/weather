import React from "react";
import { Card } from "reactstrap";


const DayDetails = props => {

    return (
        <Card>
            <h2>Detailed Weather Info for {props.day}:</h2>
            <img src={`${process.env.PUBLIC_URL}/icons/${props.icon}.png`} alt={props.description} />
            <h4><strong>High:</strong>{props.high}°</h4>
            <h4><strong>Low:</strong>{props.low}°</h4>
            <h4><strong>Wind Speed:</strong>{props.windSpeed}mph</h4>
            <h4><strong>Wind Direction:</strong>{props.windDir}</h4>
            <h4><strong>Precipitation:</strong>{props.precip}</h4>
        </Card>
    )
}

export default DayDetails;