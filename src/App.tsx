import { useState } from "react";
import "./App.css";

function App() {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Management</h2>
        <ul>
          <li onClick={() => setActiveMenu("dashboard")}>Dashboard</li>
          <li onClick={() => setActiveMenu("users")}>Users</li>
          <li onClick={() => setActiveMenu("finance")}>finance</li>
          <li onClick={() => setActiveMenu("reports")}>Reports</li>
          <li onClick={() => setActiveMenu("settings")}>Settings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="content">
        {activeMenu === "dashboard" && <h1>Dashboard Overview</h1>}
        {activeMenu === "users" && <h1>User Management</h1>}
        {activeMenu === "reports" && <h1>Reports</h1>}
        {activeMenu === "finance" && <h1>finance Management</h1>}
        {activeMenu === "settings" && <h1>Settings</h1>}
      </main>
    </div>
  );
}

export default App;
