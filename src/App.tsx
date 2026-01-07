import { useState } from "react";
import "./App.css";
import User from "./user/user";
import Finance from "./finance/Finance";
import Reports from "./report/Report";
import Settings from "./settings/Settings";

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
          <li onClick={() => setActiveMenu("finance")}>Finance</li>
          <li onClick={() => setActiveMenu("reports")}>Reports</li>
          <li onClick={() => setActiveMenu("settings")}>Settings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="content">
        {activeMenu === "dashboard" && <h1>Dashboard Overview</h1>}
        {activeMenu === "users" && <User />}
        {activeMenu === "finance" && <Finance />}
        {activeMenu === "reports" && <Reports />}
        {activeMenu === "settings" && <Settings />}
      </main>
    </div>
  );
}

export default App;
