import { useState } from "react";

interface MemberType {
  id: number;
  firstName: string;
  lastName: string;
  sex: string;
  date: string;
  phone: string;
  address: string;
  photo?: string;
}

function Member() {
  const [members, setMembers] = useState<MemberType[]>([
    { id: 1, firstName: "John", lastName: "Doe", sex: "Male", date: "2024-01-01", phone: "1234567890", address: "New York" },
    { id: 2, firstName: "Jane", lastName: "Smith", sex: "Female", date: "2024-02-01", phone: "9876543210", address: "London" },
  ]);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const membersPerPage = 15;

  const addMember = () => {
    setMembers([
      ...members,
      {
        id: Date.now(),
        firstName: "New",
        lastName: "Member",
        sex: "Male",
        date: "2024-03-01",
        phone: "0000000000",
        address: "Unknown",
      },
    ]);
  };

  const deleteMember = (id: number) => {
    setMembers(members.filter(member => member.id !== id));
  };

  // Filter
  const filteredMembers = members.filter(member =>
    `${member.firstName} ${member.lastName} ${member.phone} ${member.address}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);
  const startIndex = (currentPage - 1) * membersPerPage;
  const paginatedMembers = filteredMembers.slice(
    startIndex,
    startIndex + membersPerPage
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 15 }}>
        <h1 style={{ marginRight: 810 }}>Member Management</h1>

        <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
          <input
            type="text"
            placeholder="Search name / phone / address"
            value={search}
            onChange={e => handleSearch(e.target.value)}
            style={{
              padding: "8px 12px",
              border: "1px solid #cccccc3f",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          />
          <button>Search</button>
        </div>
      </div>

      {/* Add Member */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={addMember}>Add Member</button>
      </div>

      {/* Table */}
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
          {paginatedMembers.length === 0 ? (
            <tr>
              <td colSpan={9} align="center">
                No members found
              </td>
            </tr>
          ) : (
            paginatedMembers.map(member => (
              <tr key={member.id}>
                <td align="center">{member.id}</td>
                <td>{member.firstName}</td>
                <td>{member.lastName}</td>
                <td>{member.sex}</td>
                <td>{member.date}</td>
                <td>{member.phone}</td>
                <td>{member.address}</td>
                <td>-</td>
                <td align="center">
                  <button onClick={() => deleteMember(member.id)}>Delete</button>
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

export default Member;
