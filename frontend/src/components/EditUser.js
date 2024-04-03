import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const EditUser = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("berikan");
  const [transaksi, SetTransaksi] = useState("hutangbaru");
  const [nominal, setNominal] = useState();
  const [hutangUser, setHutangUser] = useState([]);
  const [bayarHutangUser, setBayarHutangUser] = useState([]);
  const [date, setDate] = useState(null);
  const [ket, setKet] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  // transaksi == "hutangbaru" ? console.log(transaksi) : console.log(transaksi)

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5001/users/${id}`);
    setHutangUser(response.data.hutang)
    setBayarHutangUser(response.data.bayar)
    setName(response.data.name);
    setStatus(response.data.status);
    setNominal(response.data.nominal);
    setDate(response.data.date);
    setKet(response.data.ket);
  };

  const updateUser = async (e) => {
    e.preventDefault();


    const hutangSchema = {
      hutang: [...hutangUser, {
        date: date,
        hutang: nominal,
        ket: ket,
      }]
    }

    console.log(hutangUser)

    const bayarHutangSchema = {
      bayar: [...bayarHutangUser, {
        bayar: nominal,
        date: date
      }]

    }
    try {
      await axios.patch(`http://localhost:5001/users/${id}`, transaksi === "hutangbaru" ?
        hutangSchema
        : bayarHutangSchema
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = date => {
    setDate(date);
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
            <label className="label">Jenis Transaksi</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={status}
                  onChange={(e) => SetTransaksi(e.target.value)}
                >
                  <option value="hutangbaru">hutang baru</option>
                  <option value="bayarhutang">bayar hutang</option>
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
              <ReactDatePicker className="input"
                selected={date}
                value={date}
                onChange={handleChange}
                dateFormat="dd/MM/yyyy" // Adjust date format as needed
                isClearable // Allow clearing the date
                placeholderText="Select a date" // Placeholder text when no date is selected
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
                placeholder="Keterangan"
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
