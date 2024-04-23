import React, { useState } from 'react';
import styled from 'styled-components';

interface SortOptionsProps {
  onSort: (sortBy: string, order: 'asc' | 'desc') => void;
}

const StyledSortOptions = styled.div`
  margin-bottom: 1rem;
`;

const StyledSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  margin-right: 0.5rem;
`;

const SortOptions: React.FC<SortOptionsProps> = ({ onSort }) => {
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSortBy(value);
    onSort(value, order);
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setOrder(value as 'asc' | 'desc');
    onSort(sortBy, value as 'asc' | 'desc');
  };

  return (
    <StyledSortOptions>
      <StyledSelect value={sortBy} onChange={handleSortByChange}>
        <option value="">Sort by...</option>
        <option value="name">Name</option>
        <option value="country">Country</option>
        <option value="timezone">Timezone</option>
        {/* Add more sort options as needed */}
      </StyledSelect>
      <StyledSelect value={order} onChange={handleOrderChange}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </StyledSelect>
    </StyledSortOptions>
  );
};

export default SortOptions;