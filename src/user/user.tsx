import { useState } from "react";

interface UserType {
  id: number;
  firstName: string;
  lastName: string;
  sex: string;
  date: string;
  phone: string;
  address: string;
  photo?: string;
}

function User() {
  const [users, setUsers] = useState<UserType[]>([
    { id: 1, firstName: "John", lastName: "Doe", sex: "Male", date: "2024-01-01", phone: "1234567890", address: "New York" },
    { id: 2, firstName: "Jane", lastName: "Smith", sex: "Female", date: "2024-02-01", phone: "9876543210", address: "London" },
  ]);

  const [search, setSearch] = useState("");

  const addUser = () => {
    setUsers([
      ...users,
      { id: Date.now(), firstName: "New", lastName: "User", sex: "Male", date: "2024-03-01", phone: "0000000000", address: "Unknown" },
    ]);
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const filteredUsers = users.filter(user =>
    `${user.firstName} ${user.lastName} ${user.phone} ${user.address}`
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
          placeholder="Search name / phone / address"
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
              <th>Sex</th>
              <th>Date</th>
              <th>PNumber</th>
              <th>Address</th>
              <th>Photo</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={9} align="center">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.sex}</td>
                  <td>{user.date}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <td>-</td>
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
