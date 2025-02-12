import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState({
    name: "",
    email: "",
    age: "",
  });
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/v1/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getAllUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("age", input.age);
    formData.append("profile", profile);

    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/users",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("User uploaded:", response.data);

      // Refresh user list after upload
      setUsers([...users, response.data]);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center p-4" style={{ backgroundColor: "blue" }}>
          <h1 className="text-white">MERN FILE UPLOAD</h1>
        </div>

        {/* Form Section */}
        <div className="col-md-6">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                className="form-control"
                id="name"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                className="form-control"
                id="email"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="age" className="form-label">Age</label>
              <input
                type="number"
                name="age"
                value={input.age}
                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                className="form-control"
                id="age"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="profile" className="form-label">Profile Picture</label>
              <input
                type="file"
                name="profile"
                onChange={(e) => setProfile(e.target.files[0])}
                className="form-control"
                id="profile"
                accept="image/*"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>

        {/* Table Section */}
        <div className="col-md-6">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Profile</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    {user.profile && (
                      <img
                        className="img-fluid"
                        src={`http://localhost:9000/${user.profile}`}
                        alt="User Profile"
                        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default App;
