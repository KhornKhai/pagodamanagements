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

  const addMember = () => {
    setMembers([
      ...members,
      { id: Date.now(), firstName: "New", lastName: "Member", sex: "Male", date: "2024-03-01", phone: "0000000000", address: "Unknown" },
    ]);
  };

  const deleteMember = (id: number) => {
    setMembers(members.filter(member => member.id !== id));
  };

  const filteredMembers = members.filter(member =>
    `${member.firstName} ${member.lastName} ${member.phone} ${member.address}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Member Management</h1>

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

      {/* Add Member */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={addMember}>Add Member</button>
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
            {filteredMembers.length === 0 ? (
              <tr>
                <td colSpan={9} align="center">
                  No members found
                </td>
              </tr>
            ) : (
              filteredMembers.map(member => (
                <tr key={member.id}>
                  <td>{member.id}</td>
                  <td>{member.firstName}</td>
                  <td>{member.lastName}</td>
                  <td>{member.sex}</td>
                  <td>{member.date}</td>
                  <td>{member.phone}</td>
                  <td>{member.address}</td>
                  <td>-</td>
                  <td>
                    <button onClick={() => deleteMember(member.id)}>Delete</button>
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

export default Member;
