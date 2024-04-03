import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <h1 className="py-2">Tambah pelanggan</h1>
      <div className="columns mt-1">
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
            <div className="control">
              <button type="submit" className="button is-success">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default AddUser;
