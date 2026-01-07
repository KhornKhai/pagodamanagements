import { useState } from "react";

interface AbsenceType {
  id: number;
  name: string;
  number: string;
  penalty: string;
}

function Absence() {
  const [absences, setAbsences] = useState<AbsenceType[]>([
    { id: 1, name: "John Doe", number: "1", penalty: "Late" },
    { id: 2, name: "Jane Smith", number: "2", penalty: "Absent" },
  ]);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const absencesPerPage = 15;

  // Add absence
  const addAbsence = () => {
    setAbsences([
      ...absences,
      {
        id: Date.now(),
        name: "New Person",
        number: "0",
        penalty: "None",
      },
    ]);
  };

  // Delete absence
  const deleteAbsence = (id: number) => {
    setAbsences(absences.filter(absence => absence.id !== id));
  };

  // Filter absences
  const filteredAbsences = absences.filter(absence =>
    `${absence.name} ${absence.number} ${absence.penalty}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredAbsences.length / absencesPerPage);
  const startIndex = (currentPage - 1) * absencesPerPage;
  const paginatedAbsences = filteredAbsences.slice(
    startIndex,
    startIndex + absencesPerPage
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
        <h1 style={{ marginRight: 790 }}>Absence Management</h1>

        <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
          <input
            type="text"
            placeholder="Search name / number / penalty"
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

      {/* Add Absence */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={addAbsence}>Add Absence</button>
      </div>

      {/* Table */}
      <table width="100%" border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Penalty</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {paginatedAbsences.length === 0 ? (
            <tr>
              <td colSpan={4} align="center">
                No absences found
              </td>
            </tr>
          ) : (
            paginatedAbsences.map(absence => (
              <tr key={absence.id}>
                <td>{absence.name}</td>
                <td>{absence.number}</td>
                <td>{absence.penalty}</td>
                <td align="center">
                  <button onClick={() => deleteAbsence(absence.id)}>Delete</button>
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

export default Absence;
