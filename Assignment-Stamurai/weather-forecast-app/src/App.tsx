import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CitiesTable from './CitiesTable';
import WeatherPage from './WeatherPage';
import SearchBar from './SearchBar';
import FilterOptions from './FilterOptions';
import SortOptions from './SortOptions';

interface City {
  name: string;
  country: string;
  timezone: string;
}

const StyledApp = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
`;

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get(
        'https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=&rows=20&sort=name'
      );
      setCities((prevCities) => [...prevCities, ...response.data.records.map((record: any) => record.fields)]);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (filter: string) => {
    setFilterValue(filter);
  };

  const handleSort = (sortBy: string, order: 'asc' | 'desc') => {
    setSortBy(sortBy);
    setSortOrder(order);
  };

  const handleCityClick = (city: City) => {
    setSelectedCity(city);
  };

  const filteredCities = cities.filter((city) => {
    const nameMatch = city.name.toLowerCase().includes(searchQuery.toLowerCase());
    const countryMatch = filterValue === 'country' ? city.country.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    const timezoneMatch = filterValue === 'timezone' ? city.timezone.toLowerCase().includes(searchQuery.toLowerCase()) : true;

    return nameMatch && countryMatch && timezoneMatch;
  });

  const sortedCities = sortBy
    ? filteredCities.slice().sort((a, b) => {
        const aValue = a[sortBy as keyof City].toLowerCase();
        const bValue = b[sortBy as keyof City].toLowerCase();

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      })
    : filteredCities;

  return (
    <StyledApp>
      <h1>Weather Forecast App</h1>
      <SearchBar onSearch={handleSearch} />
      <FilterOptions onFilter={handleFilter} />
      <SortOptions onSort={handleSort} />
      <CitiesTable cities={sortedCities} onCityClick={handleCityClick} />
      {selectedCity && <WeatherPage city={selectedCity} />}
    </StyledApp>
  );
};

export default App;