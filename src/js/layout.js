import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const Layout = () => {
  const [people, setPeople] = useState([]);
  const [starships, setStarships] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch('https://swapi.dev/api/people/')
      .then((response) => response.json())
      .then((data) => setPeople(data.results))
      .catch((error) => console.log(error));

    fetch('https://swapi.dev/api/starships/')
      .then((response) => response.json())
      .then((data) => setStarships(data.results))
      .catch((error) => console.log(error));

    fetch('https://swapi.dev/api/planets/')
      .then((response) => response.json())
      .then((data) => setPlanets(data.results))
      .catch((error) => console.log(error));
  }, []);

  const toggleFavorite = (item) => {
    const index = favorites.findIndex((fav) => fav.url === item.url);
    if (index === -1) {
      setFavorites([...favorites, item]);
    } else {
      const updatedFavorites = favorites.filter((fav) => fav.url !== item.url);
      setFavorites(updatedFavorites);
    }
  };

  const isFavorite = (item) => {
    return favorites.some((fav) => fav.url === item.url);
  };

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            SWAPI App
          </Link>
        </nav>

        <div className="container mt-4">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  people={people}
                  starships={starships}
                  planets={planets}
                  toggleFavorite={toggleFavorite}
                  isFavorite={isFavorite}
                />
              }
            />
            <Route path="/people/:id" element={<PeopleDetails />} />
            <Route path="/starships/:id" element={<StarshipDetails />} />
            <Route path="/planets/:id" element={<PlanetDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const HomePage = ({ people, starships, planets, toggleFavorite, isFavorite }) => {
  return (
    <div>
      <h1>SWAPI App</h1>

      <h2>People</h2>
      <div className="row">
        {people.map((person) => (
          <div key={person.url} className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{person.name}</h5>
                <p className="card-text">
                  <strong>Height:</strong> {person.height}
                </p>
                <p className="card-text">
                  <strong>Mass:</strong> {person.mass}
                </p>
                <p className="card-text">
                  <strong>Gender:</strong> {person.gender}
                </p>
                <button
                  className={`btn ${isFavorite(person) ? 'btn-danger' : 'btn-primary'}`}
                  onClick={() => toggleFavorite(person)}
                >
                  {isFavorite(person) ? 'Remove Favorite' : 'Add Favorite'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2>Starships</h2>
      <div className="row">
        {starships.map((starship) => (
          <div key={starship.url} className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{starship.name}</h5>
                <p className="card-text">
                  <strong>Model:</strong> {starship.model}
                </p>
                <p className="card-text">
                  <strong>Manufacturer:</strong> {starship.manufacturer}
                </p>
                <p className="card-text">
                  <strong>Class:</strong> {starship.starship_class}
                </p>
                <button
                  className={`btn ${isFavorite(starship) ? 'btn-danger' : 'btn-primary'}`}
                  onClick={() => toggleFavorite(starship)}
                >
                  {isFavorite(starship) ? 'Remove Favorite' : 'Add Favorite'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2>Planets</h2>
      <div className="row">
        {planets.map((planet) => (
          <div key={planet.url} className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{planet.name}</h5>
                <p className="card-text">
                  <strong>Climate:</strong> {planet.climate}
                </p>
                <p className="card-text">
                  <strong>Terrain:</strong> {planet.terrain}
                </p>
                <p className="card-text">
                  <strong>Population:</strong> {planet.population}
                </p>
                <button
                  className={`btn ${isFavorite(planet) ? 'btn-danger' : 'btn-primary'}`}
                  onClick={() => toggleFavorite(planet)}
                >
                  {isFavorite(planet) ? 'Remove Favorite' : 'Add Favorite'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PeopleDetails = () => {
  return <h2>People Details Page</h2>;
};

const StarshipDetails = () => {
  return <h2>Starship Details Page</h2>;
};

const PlanetDetails = () => {
  return <h2>Planet Details Page</h2>;
};

export default Layout;
