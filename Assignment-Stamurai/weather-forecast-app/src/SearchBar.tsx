import React, { useState } from 'react';
import styled from 'styled-components';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const StyledSearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
`;

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
    onSearch(value);
  };

  return (
    <StyledSearchBar>
      <StyledInput
        type="text"
        placeholder="Search cities..."
        value={query}
        onChange={handleInputChange}
      />
    </StyledSearchBar>
  );
};

export default SearchBar;