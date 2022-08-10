import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

export default function Login(props) {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [contact, setContact] = useState("");
  let [gender, setGender] = useState("Male");
  let [password, setPassword] = useState("");
  let [errMessage, setErrMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrMessage("");

    if (name == "") {
      setErrMessage("Name is required");
      return;
    }

    if (contact == "" || contact.length != 10) {
      setErrMessage("Contact No is required and its length should be 10");
      return;
    }

    if (email == "") {
      setErrMessage("Email is required");
      return;
    }
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(email) === false) {
      setErrMessage("Please enter valid email-ID");
      return;
    }

    if (gender == "") {
      setErrMessage("Gender is required");
      return;
    }
    if (password == "") {
      setErrMessage("Password is required");
      return;
    }

    const userData = {
      name: name,
      email: email,
      contact: contact,
      gender: gender,
      password: password,
    };
    console.log("Regsiter user ", userData);
    setName("");
    setContact("");
    setEmail("");
    setPassword("");
    setGender("Male");
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary">
              <Link to="/login">Sign In</Link>
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Name *</label>
            <input
              type="text"
              value={name}
              className="form-control mt-1"
              placeholder="Name"
              pattern="[a-zA-Z0-9\s]+"
              onChange={(event) =>
                event.target.validity.valid ? setName(event.target.value) : ""
              }
            />
          </div>
          <div className="form-group mt-3">
            <label>Email *</label>
            <input
              type="email"
              value={email}
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Contact No *</label>
            <input
              type="text"
              pattern="[0-9]+"
              maxlength="10"
              className="form-control mt-1"
              value={contact}
              placeholder="Contact No"
              onChange={(event) =>
                event.target.validity.valid
                  ? setContact(event.target.value)
                  : ""
              }
            />
          </div>
          <div className="form-group mt-3">
            <label>Gender *</label>
            <br />
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                checked={gender === "Male"}
                id="gender"
                value="Male"
                onChange={(event) => setGender("Male")}
              />
              <label className="form-check-label" for="gender">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                checked={gender === "Female"}
                id="gender"
                value="Female"
                onChange={(event) => setGender("Female")}
              />
              <label className="form-check-label" for="gender">
                Female
              </label>
            </div>
          </div>

          <div className="form-group mt-3">
            <label>Password *</label>
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
