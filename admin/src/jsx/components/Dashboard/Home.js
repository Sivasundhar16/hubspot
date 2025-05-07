import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import { ThemeContext } from "../../../context/ThemeContext";

const Hubspot = () => {
  // Just use the ThemeContext but don't force a theme change
  const { background } = useContext(ThemeContext);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortControl, setSortControl] = useState("Newest");
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the theme override to respect user's theme selection
    // changeBackground({ value: "light", label: "Light" });

    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/companies");
        const topCompanies = response.data.results || [];
        setCompanies(topCompanies);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []); // Remove the changeBackground dependency

  const handleCompanyClick = (id) => {
    navigate(`/dashboard/${id}`);
  };

  if (loading) {
    return (
      <div className="card">
        <div className="card-body">
          <div className="text-center text-primary">Loading companies...</div>
        </div>
      </div>
    );
  }
  console.log(companies);

  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header pb-0 border-0 flex-wrap">
              <h4 className="fs-20 mb-3">HubSpot Companies</h4>
              <div className="d-flex"></div>
            </div>
            <div className="card-body">
              {companies.length === 0 ? (
                <div className="text-center text-gray-500 fs-14">
                  No companies found
                </div>
              ) : (
                <div className="row">
                  {companies.map((company) => (
                    <div
                      key={company.id}
                      className="col-xl-4 col-lg-6 col-md-6"
                    >
                      <div
                        className="card mb-3 border-0 shadow-sm hover-shadow"
                        onClick={() => handleCompanyClick(company.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="card-body">
                          <div className="d-flex align-items-center mb-4">
                            <div
                              className="me-3 bg-light rounded-circle d-flex align-items-center justify-content-center"
                              style={{ width: "60px", height: "60px" }}
                            >
                              <i className="fas fa-building text-primary fs-24"></i>
                            </div>
                            <div>
                              <h5 className="fs-16 mb-1 text-primary">
                                {company.properties.name}
                              </h5>
                              <span className="text-secondary fs-14">
                                {company.properties.domain || "N/A"}
                              </span>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between">
                            <div className="text-secondary fs-12">
                              <i className="far fa-clock me-2"></i>
                              Created:{" "}
                              {new Date(company.createdAt).toLocaleDateString()}
                            </div>
                            <div className="text-secondary fs-12">
                              <i className="fas fa-sync-alt me-2"></i>
                              Updated:{" "}
                              {new Date(company.updatedAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hubspot;
