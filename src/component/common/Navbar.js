import { Navbar, Nav } from 'react-bootstrap';

export default function () {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Brand</Navbar.Brand>
      <Navbar.Toggle>Toggle</Navbar.Toggle>
      <Navbar.Collapse>
        <Nav>
          <Nav.Link> Test </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
