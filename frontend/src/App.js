import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "./style.css";
function App() {
  const [users, setUsers] = useState([]);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/users/${id}`);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (id) => {
    const name = prompt("Enter new name:");
    const email = prompt("Enter new email:");
    try {
      const response = await axios.put(`http://localhost:5000/users/${id}`, {
        name,
        email,
      });
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addUser = async () => {
    const name = prompt("Enter name:");
    const email = prompt("Enter email:");
    try {
      const response = await axios.post("http://localhost:5000/users", {
        name,
        email,
      });
      setUsers(response.data);
      setIsNew(true);
    } catch (error) {
      console.log(error);
    }
  };

  function sortUsers(users) {
    return users.sort((a, b) => {
      if (a.id < b.id) {
        return 1;
      } else if (a.id > b.id) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React User List</h1>
        <button onClick={addUser}>Add User</button>
      </header>
      <div className="user-list">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className={isNew && user.id === users[0].id ? "flash-blink" : ""}
              >
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                  <button onClick={() => updateUser(user.id)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
