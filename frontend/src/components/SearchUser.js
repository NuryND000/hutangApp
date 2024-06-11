import axios from "axios";
import { useState } from "react";
import { Col, Container, Form, ListGroup, Row, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

export default function SearchUser() {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [users, setUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();
    const handleInputChange = (event) => {

        const { value } = event.target;
        setSearchTerm(value);

        // You can fetch suggestions based on the entered search term here
        // For demonstration, I'm just filtering some static suggestions

        const getUsers = async () => {
            const response = await axios.get("http://localhost:5001/users");
            setUser(response.data);
        };

        getUsers();

        const filteredSuggestions = users.map(user => user.name).filter(name =>
            name.toLowerCase().includes(value.toLowerCase())
        );

        console.log(filteredSuggestions)
        setSuggestions(filteredSuggestions);
    };

    const deleteUser = async (id, navigate) => {
        try {
            await axios.delete(`http://localhost:5001/users/${id}`);
            //   getUsers();
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion);
        const user = users.find(user => user.name.toLowerCase() === suggestion.toLowerCase());
        // const userArr = user[0];
        setSelectedUser(user);

        console.log(selectedUser);
        setSuggestions([]);
    };

    return (
        <><NavBar/>
        <Container fluid className="mt-4">
            
            <Row>
                <Col></Col>
                <Col >
                    <Form >
                        <Form.Group controlId="search">
                            <Form.Control
                                type="text"
                                placeholder="Cari Pelanggan..."
                                value={searchTerm}
                                onChange={handleInputChange}
                            />
                            {suggestions.length > 0 && (
                                <ListGroup className="suggestions">
                                    {suggestions.map((suggestion, index) => (
                                        <ListGroup.Item
                                            key={index}
                                            action
                                            onClick={() => {
                                                handleSuggestionClick(suggestion)
                                            }}
                                        >
                                            {suggestion}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </Form.Group>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
            {selectedUser && (
                <>
                    <Row className="mt-4">
                        <Col xs={12} md={8}>
                            <Row>
                                <Col xs={4} md={4}><h5>Nama Pelanggan</h5></Col>
                                <Col xs={1} md={1}><h5>:</h5></Col>
                                <Col xs={7} md={7}><h5>{selectedUser.name}</h5></Col>
                            </Row>
                            <Row>
                                <Col xs={4} md={4}><h5>Sisa Hutang</h5></Col>
                                <Col xs={1} md={1}><h5>:</h5></Col>
                                <Col xs={7} md={7}><h5>{selectedUser.sisahutang}</h5></Col>
                            </Row>
                            <Row>
                                <Col xs={4} md={4}><h5>Hutang Kembalian</h5></Col>
                                <Col xs={1} md={1}><h5>:</h5></Col>
                                <Col xs={7} md={7}><h5>{selectedUser.kembalian}</h5></Col>
                            </Row>
                        </Col>
                        <Col xs={12} md={4}>
                            <Row>
                                <Col md={6}></Col>
                                <Col md={6}><Button variant="danger" size="sm" className="mx-1 mb-2" style={{ width: "100%" }}
                                    onClick={() => {
                                        if (window.confirm(`Apakah anda yakin untuk menghapus ${selectedUser.name}`)) {
                                            deleteUser(selectedUser._id, navigate)
                                        }
                                    }
                                    }
                                >
                                    Hapus Pelanggan
                                </Button></Col>
                            </Row>
                            <Row>
                                <Col md={6}></Col>
                                <Col md={6}><Button variant="warning" size="sm" className="mx-1 " style={{ width: "100%" }}
                                    onClick={() => {
                                        window.alert("still in development")
                                    }
                                    }
                                >
                                    Edit Pelanggan
                                </Button></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row></Row>

                    <Row className="mt-4">
                        <Col>
                            <h6 className="text-center">Detail Hutang</h6>
                            <Table striped>
                                <thead>
                                    <tr >
                                        <th>
                                            tanggal
                                        </th>
                                        <th>
                                            jumlah
                                        </th>
                                        <th>
                                            keterangan
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedUser.hutang.length != 0 ? selectedUser.hutang.map((item, index) => {
                                        const date = typeof item.date === 'string' ? new Date(item.date) : item.date;
                                        return (
                                            <tr>
                                                <td>
                                                    {date instanceof Date && !isNaN(date) ? date.toLocaleDateString("en-GB") : ""}
                                                </td>
                                                <td>
                                                    {item.hutang}
                                                </td>
                                                <td>
                                                    {item.ket}
                                                </td>
                                            </tr>
                                        )
                                    }) : (
                                        <tr>
                                            <td colSpan={3} className="text-center">
                                                belum ada data
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Col>
                        <Col>
                            <h6 className="text-center">Detail Bayar Hutang</h6>
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>
                                            tanggal
                                        </th>
                                        <th>
                                            jumlah
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedUser.bayar.length != 0 ? selectedUser.bayar.map((item, index) => {
                                        const date = typeof item.date === 'string' ? new Date(item.date) : item.date;
                                        return (
                                            <tr>
                                                <td>
                                                    {date instanceof Date && !isNaN(date) ? date.toLocaleDateString("en-GB") : ""}
                                                </td>
                                                <td>
                                                    {item.bayar}
                                                </td>
                                            </tr>
                                        )
                                    }) : (
                                        <tr>
                                            <td colSpan={3} className="text-center">
                                                belum ada data
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </>

            )}


        </Container>
        </>
    );
}