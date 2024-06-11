import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NavBar.css"; // Mengimpor file CSS khusus untuk navbar

export default function NavBar() {
  const navigate = useNavigate();
  const Logout = async () => {
    try {
      await axios.delete("http://localhost:5001/logout");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navbar expand="lg" className="full-width-navbar">
      <Container>
        <Navbar.Brand href="/">
          <Image
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="Logo"
            height={5}
            width={80}
          />{" "}
          {/* Mengatur tinggi logo */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className="custom-nav-link">
              Home
            </Nav.Link>
            <Nav.Link href="cari" className="custom-nav-link">
              Cari
            </Nav.Link>
            <Nav.Link href="#" className="custom-nav-link" onClick={Logout}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
