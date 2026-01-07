import { useState } from "react";

interface UserType {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

function User() {
  const [users, setUsers] = useState<UserType[]>([
    { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", password: "123456" },
    { id: 2, firstName: "Jane", lastName: "Smith", email: "jane@example.com", password: "abcdef" },
  ]);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 15;

  // Add user
  const addUser = () => {
    setUsers([
      ...users,
      {
        id: Date.now(),
        firstName: "New",
        lastName: "User",
        email: "newuser@example.com",
        password: "password",
      },
    ]);
  };

  // Delete user
  const deleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  // Filter users
  const filteredUsers = users.filter(user =>
    `${user.firstName} ${user.lastName} ${user.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  // Reset page when searching
  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 15 }}>
        <h1 style={{ marginRight: 860 }}>Users Management</h1>

        <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>g
          <input
            type="text"
            placeholder="Search name / email"
            value={search}
            onChange={e => handleSearch(e.target.value)}
            style={{
              padding: "8px 12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          />
          <button>Search</button>
        </div>
      </div>

      {/* Add User */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={addUser}>Add User</button>
      </div>

      {/* Table */}
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
          {paginatedUsers.length === 0 ? (
            <tr>
              <td colSpan={6} align="center">
                No users found
              </td>
            </tr>
          ) : (
            paginatedUsers.map(user => (
              <tr key={user.id}>
                <td align="center">{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>*****</td>
                <td align="center">
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Prev
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default User;
