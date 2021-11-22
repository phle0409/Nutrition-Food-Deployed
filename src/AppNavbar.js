import { Button, Container, Nav } from 'react-bootstrap'
import { Navbar } from 'react-bootstrap'

const AppNavbar = () => {
  return (
    <Navbar className="border p3">
      <Container>
        <Navbar.Brand href="/">
          <h2>Food Nutrition</h2>
        </Navbar.Brand>
        <Nav.Link href="/macro-calculator"><Button>Macro Calculator</Button></Nav.Link>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;