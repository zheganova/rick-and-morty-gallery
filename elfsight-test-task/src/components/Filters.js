import { useState, useCallback } from 'react';
import { useData } from './providers';
import styled from 'styled-components';

const STATUS_OPTIONS = ['alive', 'dead', 'unknown'];
const GENDER_OPTIONS = ['female', 'male', 'genderless', 'unknown'];
const SPECIES_OPTIONS = [
  'Human',
  'Alien',
  'Humanoid',
  'Poopybutthole',
  'Mythological Creature',
  'Animal',
  'Robot',
  'Cronenberg',
  'Planet',
  'Disease',
  'Unknown'
];

export function Filters() {
  const { setApiURL, setActivePage } = useData();
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    species: '',
    gender: '',
    type: ''
  });

  const applyFilters = useCallback(() => {
    const url = new URL('https://rickandmortyapi.com/api/character/');
    Object.entries(filters).forEach(([key, value]) => {
      if (value) url.searchParams.set(key, value);
    });
    setActivePage(0);
    setApiURL(url.toString());
  }, [filters, setActivePage, setApiURL]);

  const resetFilters = useCallback(() => {
    setFilters({
      name: '',
      status: '',
      species: '',
      gender: '',
      type: ''
    });
    setActivePage(0);
    setApiURL('https://rickandmortyapi.com/api/character/');
  }, [setActivePage, setApiURL]);

  const handleStatusChange = useCallback(
    (e) => setFilters({ ...filters, status: e.target.value }),
    [filters]
  );

  const handleGenderChange = useCallback(
    (e) => setFilters({ ...filters, gender: e.target.value }),
    [filters]
  );

  const handleSpeciesChange = useCallback(
    (e) => setFilters({ ...filters, species: e.target.value }),
    [filters]
  );

  const handleNameChange = useCallback(
    (e) => setFilters({ ...filters, name: e.target.value }),
    [filters]
  );

  const handleTypeChange = useCallback(
    (e) => setFilters({ ...filters, type: e.target.value }),
    [filters]
  );

  return (
    <FiltersWrapper>
      <FiltersContainer>
        {/* Первый ряд */}
        <TopRow>
          <SelectWrapper>
            <StatusSelect value={filters.status} onChange={handleStatusChange}>
              <option value="">Status</option>
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </StatusSelect>
          </SelectWrapper>

          <SelectWrapper>
            <GenderSelect value={filters.gender} onChange={handleGenderChange}>
              <option value="">Gender</option>
              {GENDER_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </GenderSelect>
          </SelectWrapper>

          <SelectWrapper>
            <SpeciesSelect
              value={filters.species}
              onChange={handleSpeciesChange}
            >
              <option value="">Species</option>
              {SPECIES_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </SpeciesSelect>
          </SelectWrapper>
        </TopRow>

        {/* Второй ряд */}
        <BottomRow>
          <NameInput
            placeholder="Name"
            value={filters.name}
            onChange={handleNameChange}
          />

          <TypeInput
            placeholder="Type"
            value={filters.type}
            onChange={handleTypeChange}
          />

          <ButtonsWrapper>
            <ApplyButton onClick={applyFilters}>Apply</ApplyButton>
            <ResetButton onClick={resetFilters}>Reset</ResetButton>
          </ButtonsWrapper>
        </BottomRow>
      </FiltersContainer>
    </FiltersWrapper>
  );
}

// стили
const FiltersWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: fit-content;
`;

const Row = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const TopRow = styled(Row)``;
const BottomRow = styled(Row)``;

const SelectWrapper = styled.div`
  position: relative;
`;

const BaseSelect = styled.select`
  padding: 6px 20px 6px 10px;
  width: 120px;
  height: 34px;
  border: 1px solid #83bf46;
  border-radius: 4px;
  background: #263750
    url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")
    no-repeat right 8px center;
  color: white;
  font-size: 14px;
  cursor: pointer;
  appearance: none;
  outline: none;
  transition: all 0.2s;

  &:hover {
    background-color: #2a3a4a;
  }

  option {
    background: #1a2a3a;
    color: white;
    padding: 8px;
  }

  option:hover {
    background: #83bf46 !important;
    color: #000 !important;
  }
`;

const StatusSelect = styled(BaseSelect)``;
const GenderSelect = styled(BaseSelect)``;
const SpeciesSelect = styled(BaseSelect)``;

const BaseInput = styled.input`
  padding: 6px 10px;
  width: 120px;
  height: 34px;
  border: 1px solid #83bf46;
  border-radius: 4px;
  background: #2a3a4a;
  color: white;
  font-size: 14px;
  outline: none;
`;

const NameInput = styled(BaseInput)``;
const TypeInput = styled(BaseInput)``;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

const BaseButton = styled.button`
  padding: 0 8px;
  width: 58px;
  height: 34px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
  box-sizing: border-box;
  background-color: transparent;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
`;

const ApplyButton = styled(BaseButton)`
  color: #83bf46;
  border: 1px solid #83bf46;

  &:hover {
    background-color: #83bf46;
    color: white;
    border-color: #83bf46;
  }
`;

const ResetButton = styled(BaseButton)`
  color: #ff5152;
  border: 1px solid #ff5152;

  &:hover {
    background-color: #ff5152;
    color: white;
    border-color: #ff5152;
  }
`;
