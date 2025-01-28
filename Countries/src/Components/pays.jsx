import React, { useEffect } from "react";
import { useStore } from "../stores/Stores.jsx";
import "./CountriesList.css";

const CountriesList = () => {
  const {
    countries,
    searchQuery,
    selectedRegion,
    loading,
    fetchCountries,
    setSearchQuery,
    setSelectedRegion,
  } = useStore();

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === "All" || country.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  if (loading) return <p>Chargement en cours...</p>;

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Rechercher un pays..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <select
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
        className="select-region"
      >
        <option value="All">Tous les continents</option>
        <option value="Africa">Afrique</option>
        <option value="Americas">Amériques</option>
        <option value="Asia">Asie</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Océanie</option>
        <option value="Antarctic">Antarctique</option>
      </select>

      <div className="countries-container">
        {filteredCountries.map((country, index) => (
          <div key={index} className="country-card">
            <img
              src={country.flag}
              alt={`Drapeau de ${country.name}`}
              className="country-flag"
            />
            <h3>{country.name}</h3>
            <p>
              <strong>Capitale :</strong> {country.capital}
            </p>
            <p>
              <strong>Population :</strong> {country.population.toLocaleString()}
            </p>
            <p>
              <strong>Continent :</strong> {country.region}
            </p>
          </div>
        ))}
      </div>

      {filteredCountries.length === 0 && (
        <p className="no-results">
          Aucun pays trouvé pour "<strong>{searchQuery}</strong>" dans la région "<strong>{selectedRegion}</strong>"
        </p>
      )}
    </div>
  );
};

export default CountriesList;
