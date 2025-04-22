import {Container, Nav, Navbar } from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import logo from "../logo.svg";
import "./Header.css";

const Header = () => {
    return (
        <Navbar expand="lg" className="bg-secondary navbar-dark">
            <Container>
                <Navbar.Brand><img className="logo" src={logo} alt="react logo"/> YumYumYard</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/users">
                            <Nav.Link>Users</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/recipes">
                            <Nav.Link>Recipes</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;