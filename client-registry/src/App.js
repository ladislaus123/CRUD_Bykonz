import React, { useState, useEffect } from "react";

function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    tel: "",
    address: "",
    companyName: "",
    shipIMO: "",
    shipName: "",
    shipPhoto: null,
  });

  const [users, setUsers] = useState([]);

  // Fetch users from database
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "shipPhoto") {
      setFormData({ ...formData, shipPhoto: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch("http://localhost:5000/", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        alert("Registration successful!");
        setFormData({
          fullName: "",
          email: "",
          tel: "",
          address: "",
          companyName: "",
          shipIMO: "",
          shipName: "",
          shipPhoto: null,
        });
        fetchUsers(); // Refresh the list
      } else {
        alert("Failed to register.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting form.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("User deleted!");
        setUsers(users.filter((user) => user._id !== id));
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2>User & Ship Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="tel"
          name="tel"
          placeholder="Phone Number"
          value={formData.tel}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="shipIMO"
          placeholder="Ship IMO"
          value={formData.shipIMO}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="shipName"
          placeholder="Ship Name"
          value={formData.shipName}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="file"
          name="shipPhoto"
          accept="image/*"
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Register</button>
      </form>

      <h2 style={{ marginTop: "40px" }}>Registered Users</h2>
      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Company</th>
            <th>Ship IMO</th>
            <th>Ship Photo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.fullName}</td>
              <td>{user.companyName}</td>
              <td>{user.shipIMO}</td>
              <td>
                {user.shipPhoto && (
                  <img
                    src={`http://localhost:5000/${user.shipPhoto}`}
                    alt={user.shipName}
                    width="100"
                  />
                )}
              </td>
              <td>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
