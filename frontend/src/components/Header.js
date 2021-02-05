import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Container } from 'react-bootstrap';
import SearchBar from './SearchBar';

const Header = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>TPBML</Navbar.Brand>
          </LinkContainer>
          <SearchBar />
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
