import { Navbar, Nav } from 'react-bootstrap';
import { HouseDoorFill, Person } from 'react-bootstrap-icons';

const Bottombar = () => {
  return (
    <Navbar fixed="bottom">
      <Nav>
        <Nav.Link href="#">
          <HouseDoorFill />
        </Nav.Link>
        <Nav.Link href="#">
          <Person />
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Bottombar;
