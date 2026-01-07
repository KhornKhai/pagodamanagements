import { useState } from "react";

interface UserType {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string; // Added password field
}

function User() {
  const [users, setUsers] = useState<UserType[]>([
    { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", password: "123456" },
    { id: 2, firstName: "Jane", lastName: "Smith", email: "jane@example.com", password: "abcdef" },
  ]);

  const [search, setSearch] = useState("");

  const addUser = () => {
    setUsers([
      ...users,
      { id: Date.now(), firstName: "New", lastName: "User", email: "newuser@example.com", password: "password" },
    ]);
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const filteredUsers = users.filter(user =>
    `${user.firstName} ${user.lastName} ${user.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>User Management</h1>

      {/* Search */}
      <div style={{ marginBottom: 15 }}>
        <input
          type="text"
          placeholder="Search name / email"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button style={{ marginLeft: 10 }}>Search</button>
      </div>

      {/* Add User */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={addUser}>Add User</button>
      </div>

      {/* Scrollable Table */}
      <div style={{ maxHeight: "700px", overflowY: "auto" }}>
        <table width="100%" border={1} cellPadding={10}>
          <thead>
            <tr>
              <th>ID</th>
              <th>FName</th>
              <th>LName</th>
              <th>Email</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={6} align="center">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>*****</td> {/* Masked password */}
                  <td>
                    <button onClick={() => deleteUser(user.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default User;
