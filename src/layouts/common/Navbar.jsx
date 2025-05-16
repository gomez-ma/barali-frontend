import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

const MainNavbar = ({ isUser, logOut }) => {
    return (
        <Navbar expand="lg" bg="white" data-bs-theme="white" className="shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img
                        src="./logo.png"
                        alt="Barali Beach Resort Koh Chang"
                        style={{ height: '60px', width: 'auto', objectFit: 'contain' }}
                        className="d-inline-block align-text-center"
                    />
                    {' '}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto nav-white">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                    <Nav>
                        {isUser ? (
                            <div className="d-flex align-items-center gap-3">
                                <Navbar.Text className="text-secondary d-flex align-items-center">
                                    <i className="bi bi-person fs-4 me-2"></i>
                                    <span>{isUser.name} {isUser.lastname}</span>
                                </Navbar.Text>
                                <Button
                                    variant="light"
                                    as={Link}
                                    onClick={logOut}
                                    to="/"
                                    className="px-3"
                                >
                                    ออกจากระบบ
                                </Button>
                            </div>
                        ) : (
                            <div className="d-flex gap-2">
                                <Button variant="primary" as={Link} to="/login">เข้าสู่ระบบ</Button>
                                <Button variant="light" as={Link} to="/register">สมัครสมาชิก</Button>
                            </div>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default MainNavbar;