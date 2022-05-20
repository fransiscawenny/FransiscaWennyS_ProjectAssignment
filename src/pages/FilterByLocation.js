import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import InputGroupJS from "../utils/InputGrup";

export default function FilterByLocation({ locations, characters }) {
  let [filteredCharacter, setFilteredCharacter] = useState([]);

  console.log("ini caracterr", characters);

  useEffect(() => {
    setFilteredCharacter(characters.results ?? []);
    filterCharacter("");
  }, [characters]);

  const filterCharacter = (selectedLocation) => {
    let filtering = characters.results.filter((character) => character.location.name == selectedLocation);
    setFilteredCharacter(filtering);
  };

  return (
    <div className="container mt-3">
      <h1 className="text-center mb-3">Characters By Location</h1>
      <Row>
        <Col className="col-lg-3 col-12 mb-4">
          <h4 className="text-center mb-4">Pick Location</h4>
          <InputGroupJS changeID={filterCharacter} name="Location" total={126} locations={locations} />
        </Col>
        <Col className="col-lg-9 col-12">
          <Row xs={1} md={4} className="g-4">
            {filteredCharacter.map((item) => (
              <Col key={item.id}>
                <Card className="card">
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <br></br>
                    <Card.Subtitle>Last Location</Card.Subtitle>
                    <Card.Text>{item.location.name}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}
