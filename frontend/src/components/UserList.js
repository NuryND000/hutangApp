import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUser] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5001/users");
    const updatedUsers = response.data.map((user,index) => {
      // Calculate the sum of hutang for each user
      const hutangArray = user.hutang.map((h)=> h.hutang);
      const bayarArray = user.bayar.map((h)=> h.bayar);
      const sumOfHutang = hutangArray.reduce((total, hutang) => total + hutang, 0);
      const sumOfBayar = bayarArray.reduce((total, bayar) => total + bayar, 0);
      // Update sisahutang property based on the sum
      return { ...user, sisahutang: sumOfHutang - sumOfBayar };
    });
    setUser(updatedUsers);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/users/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Button href="add" variant="success" className="my-4">
        Add New
      </Button>
      <Table striped hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Sisa Hutang</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        {users.length != 0 ? <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.sisahutang}</td>
              <td>{user.sisahutang !== 0 ? user.sisahutang <= 0 ? "kembalian kurang": "belum lunas" : "lunas"}</td>
              <td>
                <Link to={`edit/${user._id}`} className="mx-1">
                  <Button variant="warning" size="sm"
                  >
                    Detail
                  </Button>
                </Link>
                <Button variant="danger" size="sm" className="mx-1"
                  onClick={() => {
                    if (window.confirm(`Apakah anda yakin untuk menghapus ${user.name}`)) {
                      deleteUser(user._id)
                    }
                  }
                  }
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody> : <tbody>
          <tr>
            <td colSpan={5} style={{ textAlign: 'center' }}><h6>Data Empty</h6></td>
          </tr>
        </tbody> }
        
      </Table>
    </Container>
  );
};

export default UserList;
