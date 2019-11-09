import React from "react";
import { Col, Card, CardHeader, CardBody } from "reactstrap";
import styled from "styled-components";

const border = "2px solid green"
const DayWrapper = styled.article`
.card {
    border: ${props => props.isActive ? "2px solid teal" : "1px solid gray"};
    text-align: center;
}
img {
    width: 30px;
    border: ${border}
}
`

const DayCard = props => {
    console.log(props);
    return (
        <Col onClick={props.setSelectedDay}>
            <DayWrapper isActive={props.isActive}>
                <Card>
                    <CardHeader>{props.day}</CardHeader>
                    <CardBody>
                        <h2>{props.current}°</h2>
                        <img src={`${process.env.PUBLIC_URL}/icons/${props.icon}.png`} alt={props.description} />
                        <h4><strong>High:</strong>{props.high}°</h4>
                        <h4><strong>Low:</strong>{props.low}°</h4>
                    </CardBody>
                </Card>
            </DayWrapper>
        </Col>
    )
}

export default DayCard;