import "./Search.css";
import { AsyncPaginate } from "react-select-async-paginate";
import React, { useState } from "react";
import { geo_url, geo_api } from "./api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const loadOptions = async (inputValue) => {
    return fetch(
      `${geo_url}?minPopulation=1000000&namePrefix=${inputValue}`,
      geo_api
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude}, ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((error) => console.error(error));
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search By City"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      className="searchbar"
      loadOptions={loadOptions}
    />
  );
};
export default Search;
