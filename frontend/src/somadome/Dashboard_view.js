import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";

const Hubspot = () => {
  const { background } = useContext(ThemeContext);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paging, setPaging] = useState(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const fetchCompanies = async (after = null) => {
    try {
      const url = after
        ? `http://localhost:5000/api/companies/next?after=${after}`
        : "http://localhost:5000/api/companies";

      const response = await axios.get(url);
      setCompanies(response.data.results || []);
      setPaging(response.data.paging);
    } catch (error) {
      console.error("Failed to fetch companies:", error);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleCompanyClick = (id) => {
    navigate(`/dashboard/${id}`);
  };

  const loadNextPage = async () => {
    if (!paging?.next) return;

    setIsLoadingMore(true);
    setCurrentPage((prev) => prev + 1);
    await fetchCompanies(paging.next.after);
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

  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header pb-0 border-0 flex-wrap">
              <h4 className="fs-20 mb-3">
                HubSpot Companies (Page {currentPage})
              </h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th className="text-center">Company</th>
                      <th className="text-center">Domain</th>
                      <th className="text-center">Created</th>
                      <th className="text-center">Updated</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center text-gray-500 fs-14"
                        >
                          No companies found
                        </td>
                      </tr>
                    ) : (
                      companies.map((company) => (
                        <tr
                          key={company.id}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleCompanyClick(company.id)}
                        >
                          <td className="text-center">
                            {" "}
                            {/* Centers content inside td */}
                            <div className="d-flex align-items-center justify-content-center">
                              {/* <i className="fas fa-building text-primary me-3"></i> */}
                              {company.properties.name}
                            </div>
                          </td>
                          <td className="text-center">
                            {company.properties.domain || "N/A"}
                          </td>
                          <td className="text-center">
                            {new Date(company.createdAt).toLocaleDateString()}
                          </td>
                          <td className="text-center">
                            {new Date(company.updatedAt).toLocaleDateString()}
                          </td>
                          <td className="text-center">
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log("button test");
                              }}
                            >
                              Send Mail
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-12 text-center">
          <button
            onClick={loadNextPage}
            disabled={!paging?.next || isLoadingMore}
            className={`btn ${isLoadingMore ? "disabled" : ""}`}
            style={{
              padding: "10px 20px",
              backgroundColor: !paging?.next ? "#ccc" : "#2A3547", // Default color
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: !paging?.next ? "not-allowed" : "pointer",
              transition: "background-color 0.3s ease",
              // Hover effect (using onMouseEnter/onMouseLeave)
            }}
            onMouseEnter={(e) => {
              if (paging?.next && !isLoadingMore) {
                e.target.style.backgroundColor = "#f58402";
              }
            }}
            onMouseLeave={(e) => {
              if (paging?.next && !isLoadingMore) {
                e.target.style.backgroundColor = "#2A3547";
              }
            }}
          >
            {isLoadingMore ? "Loading..." : "Next Page"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Hubspot;
