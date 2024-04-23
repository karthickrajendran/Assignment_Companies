import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import FilterOptions from './FilterOptions';
import SortOptions from './SortOptions';

interface City {
  name: string;
  country: string;
  timezone: string;
  // Add any other relevant properties
}
interface WeatherPageProps {
    city: City; // Define the type of the city property
  }

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const StyledTh = styled.th`
  background-color: #f2f2f2;
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const StyledTd = styled.td`
  padding: 8px;
  border-bottom: 1px solid #ddd;
`;

const CitiesTable: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get(
        'https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=&rows=20&sort=name'
      );
      setCities((prevCities) => [...prevCities, ...response.data.records.map((record: any) => record.fields)]);
      setHasMore(response.data.records.length > 0);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <InfiniteScroll
        dataLength={filteredCities.length}
        next={fetchCities}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more cities to display.</p>}
      >
        <StyledTable>
          <thead>
            <tr>
              <StyledTh>City Name</StyledTh>
              <StyledTh>Country</StyledTh>
              <StyledTh>Timezone</StyledTh>
            </tr>
          </thead>
          <tbody>
            {filteredCities.map((city, index) => (
              <tr key={index}>
                <StyledTd>{city.name}</StyledTd>
                <StyledTd>{city.country}</StyledTd>
                <StyledTd>{city.timezone}</StyledTd>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </InfiniteScroll>
    </div>
  );
};

export default CitiesTable;