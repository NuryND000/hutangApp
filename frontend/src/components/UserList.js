import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Col, Row, Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUser] = useState([]);
  const [showAdditionalField, setShowAdditionalField] = useState(false);
  const [name, setName] = useState("");

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/users", {
        name,
      });
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
    const updatedUsers = response.data.map((user, index) => {
      // Calculate the sum of hutang for each user
      const hutangArray = user.hutang.map((h) => h.hutang);
      const bayarArray = user.bayar.map((h) => h.bayar);
      const sumOfHutang = hutangArray.reduce((total, hutang) => total + hutang, 0);
      const sumOfBayar = bayarArray.reduce((total, bayar) => total + bayar, 0);
      // Update sisahutang property based on the sum
      return { ...user };
    });
    setUser(updatedUsers);
  };



  return (
    <Container fluid className="mt-4">
      <Row className="my-4">
        <Col md={2}>
          <Button
            variant="success"
            onClick={handleButtonClick}
          >
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
      <Table striped hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Sisa Hutang</th>
            <th>Hutang Kembalian</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        {users.length !== 0 ? <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.sisahutang == 0 ? "-" : user.sisahutang}</td>
              <td>{user.kembalian == 0 ? "-" : user.kembalian}</td>
              <td>{user.sisahutang != 0 ? user.sisahutang <= 0 ? "kembalian kurang" : "belum lunas" : "lunas"}</td>
              <td>
                <Link to={`edit/${user._id}`} className="mx-1">
                  <Button variant="success" size="sm"
                  >
                    Transaksi Baru
                  </Button>
                </Link>
                <Link to={`editpel/${user._id}`} className="mx-1">
                  <Button color="blue" size="sm"
                  >
                    Edit
                  </Button>
                </Link>
                <Link to={`detail/${user._id}`} className="mx-1">
                  <Button variant="warning" size="sm"
                  >
                    detail
                  </Button>
                </Link>

              </td>
            </tr>
          ))}
        </tbody> : <tbody>
          <tr>
            <td colSpan={6} style={{ textAlign: 'center' }}><h6>Data Empty</h6></td>
          </tr>
        </tbody>}

      </Table>
    </Container>
  );
};

export default UserList;
