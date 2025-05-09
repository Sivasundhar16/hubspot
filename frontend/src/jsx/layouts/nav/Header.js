import React, { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

const Header = () => {
  const { background, changeBackground } = useContext(ThemeContext);

  const handleThemeMode = () => {
    if (background.value === "dark") {
      changeBackground({ value: "light", label: "Light" });
    } else {
      changeBackground({ value: "dark", label: "Dark" });
    }
  };

  return (
    <div className="header">
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav">
              <li className="nav-item dropdown notification_dropdown">
                <button
                  className={`nav-link bell dz-theme-mode p-0 ${
                    background.value === "dark" ? "active" : ""
                  }`}
                  onClick={handleThemeMode}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1.5rem",
                  }}
                >
                  <i
                    id="icon-light"
                    className="fas fa-sun fa-lg"
                    style={{
                      marginRight: "10px",
                      color: background.value === "dark" ? "#fff" : "inherit",
                    }}
                  ></i>
                  <i
                    id="icon-dark"
                    className="fas fa-moon fa-lg"
                    style={{
                      color: background.value === "dark" ? "#fff" : "inherit",
                    }}
                  ></i>
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
