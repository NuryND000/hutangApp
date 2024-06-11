import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import NavBar from "./NavBar";

const AddUser = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/users", {
        name,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <NavBar/>
      <Row>
        <Col></Col>
        <Col><h1 className="py-2">Tambah pelanggan</h1></Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col md={5}>
          <form onSubmit={saveUser}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button type="submit" className="button is-success">
                  Save
                </button>
              </div>
            </div>
          </form>
        </Col>
        <Col></Col>
      </Row>
    </>
  );
};

export default AddUser;
