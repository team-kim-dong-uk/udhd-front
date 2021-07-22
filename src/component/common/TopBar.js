import Link from 'next/link';
import { Navbar, Nav } from 'react-bootstrap';

const TopBar = () => {
  return (
    <Navbar fixed="top" bg="light" expand="lg">
      <Navbar.Brand>Brand</Navbar.Brand>
      <Navbar.Toggle>Toggle</Navbar.Toggle>
      <Nav>
        <Link href="/upload/select" passHref>
          <Nav.Link>
            <div>업로드</div>
          </Nav.Link>
        </Link>
      </Nav>
      <Navbar.Collapse>
        <Nav>
          <Nav.Link> Test </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopBar;
