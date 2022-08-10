import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../header/Header";
import Table from "react-bootstrap/Table";

export default function Dashboard(props) {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [contact, setContact] = useState("");
  let [gender, setGender] = useState("");
  let [age, setAge] = useState("");
  let [errMessage, setErrMessage] = useState("");
  let [showForm, setShowform] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrMessage("");

    if (name == "") {
      setErrMessage("Name is required");
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
    if (contact == "" || contact.length != 10) {
      setErrMessage("Contact No is required and its length should be 10");
      return;
    }

    if (gender == "") {
      setErrMessage("Gender is required");
      return;
    }
    if (age == "") {
      setErrMessage("Age is required");
      return;
    }

    const enterData = {
      name: name,
      email: email,
      contact_number: contact,
      gender: gender,
      age: age,
    };
    setUserData([...userData, enterData]);
    console.log("Added user ", enterData);
    setName("");
    setContact("");
    setEmail("");
    setAge("");
    setGender("");
  };

  const deleteUser = (index) => {
    setUserData((userData) => {
      return userData.filter((value, i) => i !== index);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          "https://raw.githubusercontent.com/bhanushalimahesh3/mock-api/main/users.json"
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
          <>
            <div className="table-form">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>AGE</th>
                    <th>Gender</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.length > 0 ? (
                    userData.map((item, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.contact_number}</td>
                          <td>{item.age ? item.age : ""}</td>
                          <td>{item.gender}</td>
                          <td>
                            <i
                              class="bi bi-trash icon-size"
                              onClick={() => {
                                deleteUser(index);
                              }}
                            ></i>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td className="text-justify" colSpan="7">
                        No User Data
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <button
                className={
                  !showForm
                    ? "btn margin-btn btn-primary"
                    : "btn margin-btn btn-danger"
                }
                onClick={() => {
                  setShowform(showForm ? false : true);
                }}
              >
                {!showForm ? "Add User" : "Hide Form"}
              </button>
              {showForm ? (
                <form className="Auth-form width-100">
                  <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Add New User</h3>
                    <div className="form-group mt-3">
                      <label>Name *</label>
                      <input
                        type="text"
                        value={name}
                        className="form-control mt-1"
                        placeholder="Name"
                        pattern="[a-zA-Z0-9\s]+"
                        onChange={(event) =>
                          event.target.validity.valid
                            ? setName(event.target.value)
                            : ""
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
                      <label>Age *</label>
                      <input
                        type="text"
                        pattern="[0-9]+"
                        className="form-control mt-1"
                        value={age}
                        placeholder="Age"
                        onChange={(event) =>
                          event.target.validity.valid
                            ? setAge(event.target.value)
                            : ""
                        }
                      />
                    </div>
                    <div className="form-group mt-3">
                      <label>Gender *</label>
                      <select
                        className="form-select"
                        value={gender}
                        onChange={(event) => setGender(event.target.value)}
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
              ) : (
                ""
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
