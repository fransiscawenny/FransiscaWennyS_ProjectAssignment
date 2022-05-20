import React from "react";
import { Col, Card, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../assets/style/CharacterList.css";

export default function CharacterList({ results }) {
  let listCharacters;
  if (results) {
    listCharacters = results.map((item) => {
      return (
        <Link className="nav-link text-dark" to={`/DetailCharacter/${item.id}`} key={item.id}>
          <Card className="card" key={item.id}>
            <Card.Img variant="top" src={item.image} />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <br></br>
              <Card.Subtitle>Last Location</Card.Subtitle>
              <Card.Text>{item.location.name}</Card.Text>
            </Card.Body>
          </Card>
        </Link>
      );
    });
  } else {
    listCharacters = "Character Not Found";
  }
  return (
    <Row xs={1} md={5} className="g-10">
      <>{listCharacters}</>
    </Row>
  );
}
