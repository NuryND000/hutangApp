import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("berikan");
  const [nominal, setNominal] = useState();
  const [date, setDate] = useState("");
  const [ket, setKet] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5001/users/${id}`);
    setName(response.data.name);
    setStatus(response.data.status);
    setNominal(response.data.nominal);
    setDate(response.data.date);
    setKet(response.data.ket);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5001/users/${id}`, {
        name,
        status,
        nominal,
        date,
        ket,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns mt-5">
      <div className="column is-half">
        <form onSubmit={updateUser}>
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
            <label className="label">Status</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Male">berikan</option>
                  <option value="Female">terima</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Nominal</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={nominal}
                onChange={(e) => setNominal(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Date</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Keterangan</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={ket}
                onChange={(e) => setKet(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-success">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
