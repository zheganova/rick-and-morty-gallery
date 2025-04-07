import styled from 'styled-components';
import { Logo } from './Logo';
import { Filters } from '../Filters';

export function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <Filters />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
