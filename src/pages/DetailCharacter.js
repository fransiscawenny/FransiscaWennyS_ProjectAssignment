import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Button, Form, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { API_URL } from "../utils/constants";
import "../assets/style/autocomplete.css";

export default function DetailCharacter({ characters, updateLocation, locations }) {
  const [detailCharacter, setDetailCharacter] = useState([]);

  const [locationCharacter, getLocationCharacter] = useState(); //lokasi karakter saat ini
  const [originCharacter, getOriginCharacter] = useState(); //origin karakter
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { id } = useParams();
  let { info, results } = characters;

  useEffect(() => {
    const getDetailCharacter = async () => {
      results.forEach((character) => {
        if (character.id == id) {
          setDetailCharacter(character);
          getLocationCharacter(character.location.name);
          getOriginCharacter(character.origin.name);
        }
      });
    };
    getDetailCharacter();
  }, []);

  const onSuggestHandler = (text) => {
    setText(text);
    setSuggestions([]);
  }; //menampilkan text yg sdh dipilih, kalau sudah dipilih nanti suggestion yg dibawah hilang oleh karena itu array nya dikosongkan

  const autoCompleteHandler = (text) => {
    // updateLocation(text); //ini untuk assign location user berdasarkan location yg dipilih
    let matches = [];
    if (text.length > 0) {
      matches = locations.filter((location) => {
        const regex = new RegExp(`${text}`, "gi");
        return location.match(regex);
      });
    }
    console.log("matches", matches);
    setSuggestions(matches);
    setText(text);
  }; //proses matching

  const assignLocation = () => {
    setShow(false);
    updateLocation(text, id);
    getLocationCharacter(text);
  };

  return (
    <div className="col d-flex mt-3 justify-content-center">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={detailCharacter.image} />
        <Card.Body>
          <Card.Title>{detailCharacter.name}</Card.Title>
          <Card.Text>
            Status&ensp;&ensp;&nbsp;: {detailCharacter.status}
            <br></br>
            Species&ensp;&nbsp;: {detailCharacter.species}
            <br></br>
            Gender&ensp;&nbsp;: {detailCharacter.gender}
            <br></br>
            Location : {locationCharacter}
            <br></br>
            Origin&ensp;&nbsp;&nbsp;&nbsp;: {originCharacter}
          </Card.Text>
          {show ? null : (
            <div className="d-flex justify-content-center">
              <Button onClick={() => setShow(true)} variant="primary">
                Assign to location
              </Button>
            </div>
          )}
          {show ? (
            <Form>
              <Col>
                <Form.Control
                  className="mb-1"
                  placeholder="Location"
                  // onClick={() => getLocation()}
                  onChange={(e) => autoCompleteHandler(e.target.value)}
                  value={text}
                  onBlur={() => {
                    setTimeout(() => {
                      setSuggestions([]);
                    }, 100);
                  }}
                />
                {suggestions &&
                  suggestions.map((suggestion, i) => (
                    <div key={i} className="suggestion col-md-12 justify-content-md-center" onClick={() => onSuggestHandler(suggestion)}>
                      {suggestion}
                    </div>
                  ))}
              </Col>
              <Col className="mt-2 d-flex justify-content-center">
                <Button onClick={() => assignLocation()} variant="primary">
                  Assign Location Character
                </Button>
              </Col>
            </Form>
          ) : null}
        </Card.Body>
      </Card>
    </div>
  );
}
