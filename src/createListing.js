import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import './createListing.css';

const CreateListing = (props) => {
    
  const [movieName, setMovieName] = useState("");
  const [noTicket, setNoTicket] = useState(null);
  const [price, setPrice] = useState(null);
  const [image, setImage] = useState('')
  const [location, setLocation] = useState('')
  const [eDate, setDate] = useState(undefined)
  const [eTime, setTime] = useState(undefined)
  const [error, setError] = React.useState("");

  const Create = () => {
    console.log(props.handleClose)
    fetch(`https://cms.dotcheckout.com/movies`, {
      method: "POST",
      body:JSON.stringify({
        "price_per_ticket": parseInt(price),
        "show_time": `${eTime}:00`,
        "show_date": new Date(eDate),
        "listed_by_name": "raja",
        "movie_name": movieName,
        "listed_by_contact": "9191919191",
        "description": "a",
        "theatre_location": location,
        "no_of_tickets": parseInt(noTicket)
    })
    })
      .then((resp) =>
        resp.json().then((res) => {
          if (res.error) {
            setError('something went wrong');
          }else{
            alert('Created successfully');
            setError('')
            props.handleClose()
          }
        })
      )
      .catch((err) => setError(err));
  }

  return (
    <section className="create-container">
      <Container fluid>
        <Row>
          <Col>
            <h2 className="heading">Add movie ticket listing</h2>
            {error !== '' && <h6>{error}</h6> }
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="form-section">
                <label>Movie name</label>
                <input
                type="text"
                value={movieName}
                onChange={(e) => setMovieName(e.target.value)}
                />
            </div>
            <div className="form-section">
                <label>Number of Tickets</label>
                <input
                type="number"
                value={noTicket}
                onChange={(e) => setNoTicket(e.target.value)}
                />
            </div>
            <div className="form-section">
                <label>Price of Each Ticket</label>
                <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                />
            </div>
            <div className="form-section">
                <label>Add Image</label>
                <input
                type="file"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                />
                <div className="img-section">
                    +
                </div>
            </div>
            <div className="form-section">
                <label>Theater Location</label>
                <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                />
            </div>
          </Col>
        </Row>
        <Row>
            <Col>
                <div className="form-section">
                    <label>Show Date</label>
                    <input
                    type="date"
                    value={eDate}
                    onChange={(e) => setDate(e.target.value)}
                    />
                </div>
            </Col>
            <Col>
                <div className="form-section">
                    <label>Show Time</label>
                    <input
                    type="time"
                    value={eTime}
                    onChange={(e) => setTime(e.target.value)}
                    />
                </div>
            </Col>
        </Row>
        <Row>
            <Col>
                <Button className="cancel-btn" onClick={() => props.handleClose()}>
                    CANCEL
                </Button>
            </Col>
            <Col>
                <Button className="submit-btn" onClick={() => Create()}>
                    POST
                </Button>
            </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CreateListing;
