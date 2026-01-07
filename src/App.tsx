import { useState } from "react";
import "./App.css";
import User from "./user/user";
import Member from "./member/member";
import Absence from "./absence/Absence";
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
          <li
            className={activeMenu === "dashboard" ? "active" : ""}
            onClick={() => setActiveMenu("dashboard")}
          >
            Dashboard
          </li>
          <li
            className={activeMenu === "users" ? "active" : ""}
            onClick={() => setActiveMenu("users")}
          >
            Users
          </li>
          <li
            className={activeMenu === "member" ? "active" : ""}
            onClick={() => setActiveMenu("member")}
          >
            Member
          </li>
          <li
            className={activeMenu === "absence" ? "active" : ""}
            onClick={() => setActiveMenu("absence")}
          >
            Absence
          </li>
          <li
            className={activeMenu === "finance" ? "active" : ""}
            onClick={() => setActiveMenu("finance")}
          >
            Finance
          </li>
          <li
            className={activeMenu === "reports" ? "active" : ""}
            onClick={() => setActiveMenu("reports")}
          >
            Reports
          </li>
          <li
            className={activeMenu === "settings" ? "active" : ""}
            onClick={() => setActiveMenu("settings")}
          >
            Settings
          </li>
        </ul>

        <button className="logout-btn" onClick={() => alert("Logged out!")}>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="content">
        {activeMenu === "dashboard" && <h1>Dashboard Overview</h1>}
        {activeMenu === "users" && <User />}
        {activeMenu === "member" && <Member />}
        {activeMenu === "absence" && <Absence />}
        {activeMenu === "finance" && <Finance />}
        {activeMenu === "reports" && <Reports />}
        {activeMenu === "settings" && <Settings />}
      </main>
    </div>
  );
}

export default App;
