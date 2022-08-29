import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { MAIN_URL } from '../../router'
import './NavigationBar.css'

export default function NavigationBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link className="navbar-brand" to={MAIN_URL}>
            Onboardings Manager
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" defaultActiveKey="/">
            <Nav.Item>
              <Link className="btn btn-light" to="/">
                Onboardings
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className="btn btn-light" to="/builder">
                New Onboarding
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className="btn btn-light" to="/data">
                Collected Data
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
