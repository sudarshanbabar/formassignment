import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [errMessage, setErrMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrMessage("");
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(email) === false) {
      setErrMessage("Please enter valid email-ID");
      return;
    }

    if (email == "") {
      setErrMessage("Email Id is required");
      return;
    }
    if (password == "") {
      setErrMessage("Password is required");
      return;
    }

    if (email == "test@web.com" && password == "test") {
      navigate("/dashboard");
    } else {
      setErrMessage("Incorrect user credentials");
      return;
    }
    const userData = {
      email: email,
      password: password,
    };
    console.log("Login user ", userData);

    setEmail("");
    setPassword("");
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Not registered yet?{" "}
            <span className="link-primary">
              <Link to="/register">Sign Up</Link>
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              value={email}
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          {errMessage != "" ? (
            <div className="form-group mt-3 error-message">{errMessage}</div>
          ) : (
            ""
          )}
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
