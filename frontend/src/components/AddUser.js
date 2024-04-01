import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("berikan");
  const [nominal, setNominal] = useState();
  const [date, setDate] = useState("");
  const [ket, setKet] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/users", {
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
            <label className="label">Status</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="betikan">berikan</option>
                  <option value="terima">terima</option>
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
                placeholder="Nominal"
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
                placeholder="dd/mm/yy"
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
                placeholder="tulis keterangan mu"
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
      </div>
    </div>
  );
};

export default AddUser;
