import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./App.css"; // Pastikan mengimpor file CSS
import useAuth from "./authService";
import NavBar from "./NavBar.js";

const UserList = () => {
  const [users, setUser] = useState([]);
  const [showAdditionalField, setShowAdditionalField] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const {token} = useAuth();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/users", { name,password });
      setShowAdditionalField(false);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClick = () => {
    setShowAdditionalField(true);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5001/users");
    const updatedUsers = response.data.map((user) => {
      // Calculate the sum of hutang for each user
      const hutangArray = user.hutang.map((h) => h.hutang);
      const bayarArray = user.bayar.map((h) => h.bayar);
      const sumOfHutang = hutangArray.reduce(
        (total, hutang) => total + hutang,
        0
      );
      const sumOfBayar = bayarArray.reduce((total, bayar) => total + bayar, 0);
      // Update sisahutang property based on the sum
      return { ...user };
    });
    setUser(updatedUsers);
  };

  return (
    <>
      <NavBar/>
    <Container fluid className="mt-4">
      <Row className="my-4">
        <Col md={2}>
          <Button variant="success" onClick={handleButtonClick}>
            Pelanggan Baru
          </Button>
        </Col>
        <Col md={4}>
          {showAdditionalField && (
            <Form onSubmit={saveUser}>
              <Row>
                <Col>
                  <Form.Group controlId="formName">
                    <Form.Control
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                    />
                  </Form.Group>
                </Col>
                {/* <Col>
                  <Form.Group controlId="formName">
                    <Form.Control
                      type="text"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="***"
                    />
                  </Form.Group>
                </Col> */}
                <Col>
                  <Button variant="success" type="submit">
                    Save
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Col>
      </Row>
      <Table striped hover className="custom-table">
        <thead>
          <tr>
            <th className="judul-tabel">No</th>
            <th className="judul-tabel">Nama</th>
            <th className="judul-tabel">nominal</th>
            
            <th className="judul-tabel">Status</th>
            <th className="judul-tabel action-column">Aksi</th>
          </tr>
        </thead>
        {users.length !== 0 ? (
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                
                <td>{user.kembalian > 0 ? user.kembalian : user.sisahutang == 0 ? '-' : user.sisahutang}</td>
                <td>
                  {user.kembalian > 0 ? 'anda berhutang' : user.sisahutang <= 0 ? 'lunas' : ' pelanggan berhutang'
                  }
                </td>
                <td className="action-column">
                  <Link to={`edit/${user._id}`} className="mx-1">
                    <Button variant="success" size="sm">
                      Transaksi Baru
                    </Button>
                  </Link>
                  <Link to={`editpel/${user._id}`} className="mx-1">
                    <Button variant="primary" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Link to={`detail/${user._id}`} className="mx-1">
                    <Button variant="warning" size="sm">
                      Detail
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                <h6>Data Empty</h6>
              </td>
            </tr>
          </tbody>
        )}
      </Table>
    </Container>
    </>
  );
};

export default UserList;
