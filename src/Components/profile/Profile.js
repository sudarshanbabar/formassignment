import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../header/Header";
import Table from "react-bootstrap/Table";

export default function Profile(props) {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  let [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          "https://raw.githubusercontent.com/bhanushalimahesh3/mock-api/main/user-profile.json"
        );
        console.log(response);
        setUserData(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);
  return (
    <>
      <Header />
      <div className="Auth-form-container">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">User Profile</h3>
              <div className="form-group mt-3">
                <label>Name</label>
                <input
                  type="text"
                  value={userData.name}
                  className="form-control mt-1"
                  placeholder="Name"
                  pattern="[a-zA-Z0-9\s]+"
                  disabled
                />
              </div>
              <div className="form-group mt-3">
                <label>Email </label>
                <input
                  type="email"
                  value={userData.email}
                  className="form-control mt-1"
                  placeholder="Email Address"
                  disabled
                />
              </div>
              <div className="form-group mt-3">
                <label>Contact No</label>
                <input
                  type="text"
                  pattern="[0-9]+"
                  maxlength="10"
                  className="form-control mt-1"
                  value={userData.contact_number}
                  placeholder="Contact No"
                  disabled
                />
              </div>
              {/* <div className="form-group mt-3">
                <label>Age</label>
                <input
                  type="text"
                  pattern="[0-9]+"
                  className="form-control mt-1"
                  value={userData.age}
                  placeholder="Age"
                />
              </div> */}
              <div className="form-group mt-3">
                <label>Gender </label>
                <select
                  className="form-select"
                  value={userData.gender}
                  disabled
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {errMessage != "" ? (
                <div className="form-group mt-3 error-message">
                  {errMessage}
                </div>
              ) : (
                ""
              )}
            </div>
          </form>
        )}
      </div>
    </>
  );
}
