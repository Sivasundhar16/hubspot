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

  const loadPreviousPage = async () => {
    if (currentPage <= 1) return;

    setIsLoadingMore(true);
    setCurrentPage((prev) => prev - 1);
    // Note: You'll need to implement a way to get the previous page cursor
    // This is a simplified version - you might need to track page history
    // or modify your backend to support previous pages
    alert(
      "Previous page implementation would require additional backend support"
    );
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

      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button
          onClick={loadNextPage}
          disabled={!paging?.next || isLoadingMore}
          style={{
            padding: "10px 20px",
            backgroundColor: !paging?.next ? "#ccc" : "dodgerblue",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: !paging?.next ? "not-allowed" : "pointer",
          }}
        >
          {isLoadingMore ? "Loading..." : "Next Page"}
        </button>
      </div>
    </>
  );
};

export default Hubspot;
//nav la irukura header la heading part iruku.
