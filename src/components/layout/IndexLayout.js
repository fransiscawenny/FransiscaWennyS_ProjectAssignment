import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import { Col, Container, Row } from "react-bootstrap";
import NavigationBar from "./NavigationBar";
import ErrorPage from "../../pages/ErrorPage";
import CharacterList from "../../pages/CharacterList";
import DetailCharacter from "../../pages/DetailCharacter";
import FilterByLocation from "../../pages/FilterByLocation";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function IndexLayout() {
  const [characters, setCharacterList] = useState([]);
  const [locations, setLocations] = useState([]); //daftar lokasi yg tersedia

  let api = API_URL + `/character`;

  const getLocation = async () => {
    if (localStorage.getItem("locations") != null) {
      let listLocationLocal = JSON.parse(localStorage.getItem("locations"));
      setLocations(listLocationLocal);
    } else {
      axios
        .get(API_URL + "/location")
        .then((res) => {
          let location_arr = [];
          for (let i = 0; i < res.data.results.length; i++) {
            location_arr.push(res.data.results[i].name);
          }
          setLocations(location_arr);
          localStorage.setItem("locations", JSON.stringify(location_arr));
          console.log("lokasi", location_arr);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("characters") != null) {
      let listCharacterLocal = JSON.parse(localStorage.getItem("characters"));
      setCharacterList(listCharacterLocal);
    } else {
      axios
        .get(api)
        .then((res) => {
          console.log(res);
          setCharacterList(res.data);
          localStorage.setItem("characters", JSON.stringify(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getLocation();
  }, [api]);

  const updateLocation = (location_baru, id) => {
    characters.results.forEach((character) => {
      if (character.id == id) {
        character.location.name = location_baru;
      }
    });
    let count = 0;
    locations.forEach((location) => {
      if (location_baru == location) {
        count += 1;
      }
    });
    if (count == 0) {
      locations.push(location_baru);
      localStorage.setItem("locations", JSON.stringify(locations));
    }
    setCharacterList(characters);
    localStorage.setItem("characters", JSON.stringify(characters));
  };

  return (
    <Router>
      <div className="IndexLayout">
        <NavigationBar />
      </div>
      <Routes>
        <Route path="/" element={<Home characters={characters} />} />
        <Route
          path="/DetailCharacter/:id"
          element={<DetailCharacter characters={characters} updateLocation={updateLocation} locations={locations} />}
        />
        <Route path="/filterbylocation/" element={<FilterByLocation locations={locations} characters={characters} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}
function Home({ characters, setSearch }) {
  let { info, results } = characters;

  return (
    <div className="mt-3">
      <h1 className="text-center mb-3">Characters</h1>
      <Container fluid>
        <CharacterList results={results} />
      </Container>
    </div>
  );
}
