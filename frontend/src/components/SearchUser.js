import axios from "axios";
import { useState } from "react";
import { Col, Container, Form, ListGroup, Row } from "react-bootstrap";

export default function SearchUser() {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [users, setUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
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

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion);
        const user = users.find(user => user.name.toLowerCase() === suggestion.toLowerCase());
        // const userArr = user[0];
        setSelectedUser(user);
        console.log(selectedUser);
        setSuggestions([]);
    };

    return (
        <Container fluid className="mt-4">
        <h3 style={{color:"grey"}}>masih dalam pengembangan....</h3>
            <Row>
                <Col>
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
                <Col></Col>
            </Row>
            <Row className="mt-4">
                <Col></Col>
            </Row>
        </Container>

    );
}