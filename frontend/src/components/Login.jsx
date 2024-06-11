// src/components/login/Login.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./authService";
import { Image } from "react-bootstrap";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/"); // Redirect to the desired page if already logged in
    }
  }, [isLoggedIn, navigate]);

  const Auth = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/login", {
        name,
        password,
      });
      navigate('/');
    } catch (error) {
      setMsg(error.response.data.msg);
    }
  };

  return (
    <section className="hero is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-widescreen">
              <div className="columns is-centered mb-5">
                <div className="column">
                <Image
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="Logo"
          />
                </div>
              </div>
              <form className="box" onSubmit={Auth}>
                <p className="has-text-centered">{msg}</p>
                <div className="field">
                  <label className="label">Nama</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      required
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      type="password"
                      placeholder="*******"
                      className="input"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="checkbox">
                    <input type="checkbox" />
                    Remember me
                  </label>
                </div>
                <div className="field">
                  <button className="button is-success" type="submit">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
