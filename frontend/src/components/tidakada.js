import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdatePelanggan() {
  const { id } = useParams();
  const [values, setValues] = useState({
    id: id,
    name: "",
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5001/users/" + id)
      .then((res) => {
        setValues({ ...values, name: res.data.name });
      })
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch("http://127.0.0.1:5001/users/" + id, values)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex w-100 vh-100 align-items-center justify-content-center">
      <div className="w-50 border bg-secondary text-white p-5 mt-5 mx-auto">
        {" "}
        {/* Tambahkan margin dan align center di sini */}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Masukkan nama"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
            <br />
            <button className="btn btn-info">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdatePelanggan;
