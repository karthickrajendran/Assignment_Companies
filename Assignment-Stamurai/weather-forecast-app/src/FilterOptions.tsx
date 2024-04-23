import React, { useState } from 'react';
import styled from 'styled-components';

interface FilterOptionsProps {
  onFilter: (filter: string) => void;
}

const StyledFilterOptions = styled.div`
  margin-bottom: 1rem;
`;

const StyledSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const FilterOptions: React.FC<FilterOptionsProps> = ({ onFilter }) => {
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectedFilter(value);
    onFilter(value);
  };

  return (
    <StyledFilterOptions>
      <StyledSelect value={selectedFilter} onChange={handleFilterChange}>
        <option value="">Filter by...</option>
        <option value="country">Country</option>
        <option value="timezone">Timezone</option>
        {/* Add more filter options as needed */}
      </StyledSelect>
    </StyledFilterOptions>
  );
};

export default FilterOptions;