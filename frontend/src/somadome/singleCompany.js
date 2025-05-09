import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";

const CompanyDetails = () => {
  const { background } = useContext(ThemeContext);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const isDark = background === "dark";

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `http://localhost:5000/api/companies/${id}`
        );

        // Handle the API response structure
        setCompany(response.data);
        console.log("Company data fetched:", response.data);
      } catch (err) {
        console.error("Error fetching company:", err);
        if (err.response) {
          setError(
            `Server error: ${err.response.status} - ${
              err.response.data.message || "Unknown error"
            }`
          );
        } else if (err.request) {
          setError("No response from server. Please check your connection.");
        } else {
          setError(`Error: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCompany();
    else {
      setError("No company ID provided");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <div className="text-center text-primary">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading company details...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <div className="text-center">
                <h4 className="fs-20 text-danger mb-3">
                  Error Loading Company
                </h4>
                <p className="mb-3">{error}</p>
                <button
                  onClick={() => navigate(-1)}
                  className="btn btn-primary px-4"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <div className="text-center">
                <h4 className="fs-20 mb-3">No company data found</h4>
                <button
                  onClick={() => navigate(-1)}
                  className="btn btn-primary px-4"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Extract data from the API response structure
  const {
    properties = {},
    id: companyId,
    createdAt,
    updatedAt,
    archived,
  } = company;

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="container-fluid">
        {/* Header with company title and back button */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2 className="mb-0">Company Details</h2>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline-danger"
          >
            <i className="fas fa-arrow-left me-2"></i>Back
          </button>
        </div>

        {/* Main company info card */}
        <div className={`card ${isDark ? "bg-dark" : ""} mb-4`}>
          <div className="card-body position-relative p-4">
            <div className="d-flex flex-wrap">
              {/* Company Icon */}
              <div className="me-4 mb-3">
                <div
                  className="bg-danger rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "100px", height: "100px" }}
                >
                  <i className="fas fa-building  fs-1"></i>
                </div>
              </div>

              {/* Company details */}
              <div className="flex-grow-1">
                <h2 className=" fs-24 font-w600 mb-1">
                  {properties.name || "Company Name"}
                </h2>
                <p className="text-gray mb-2">{properties.domain || "N/A"}</p>

                {properties.website && (
                  <a
                    href={properties.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-danger"
                  >
                    <i className="fas fa-external-link-alt me-2"></i>
                    Visit Website
                  </a>
                )}
              </div>

              {/* Company ID */}
              <div
                className="position-absolute"
                style={{ top: "20px", right: "20px" }}
              >
                <span className="badge bg-danger px-3 py-2">
                  ID: {companyId || properties.hs_object_id || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Company Details Content */}
        <div className="row">
          {/* Basic Information */}
          <div className="col-xl-6 col-lg-6 mb-4">
            <div className={`card h-100 ${isDark ? "bg-dark" : ""}`}>
              <div className="card-header border-0">
                <h4 className="card-title ">Basic Information</h4>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-sm-6">
                    <div className="d-flex flex-column">
                      <span className="text-gray-light fs-14 mb-1">
                        Industry
                      </span>
                      <span className="">
                        {properties.industry || "Not specified"}
                      </span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex flex-column">
                      <span className="text-gray-light fs-14 mb-1">Type</span>
                      <span className="">
                        {properties.type || "Not specified"}
                      </span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex flex-column">
                      <span className="text-gray-light fs-14 mb-1">City</span>
                      <span className="">
                        {properties.city || "Not specified"}
                      </span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex flex-column">
                      <span className="text-gray-light fs-14 mb-1">
                        Country
                      </span>
                      <span className="">
                        {properties.country || "Not specified"}
                      </span>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex flex-column">
                      <span className="text-gray-light fs-14 mb-1">
                        Description
                      </span>
                      <span className="">
                        {properties.description || "No description available"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="col-xl-6 col-lg-6 mb-4">
            <div className={`card h-100 ${isDark ? "bg-dark" : ""}`}>
              <div className="card-header border-0">
                <h4 className="card-title ">Timeline</h4>
              </div>
              <div className="card-body">
                <div className="d-flex align-items-center mb-4 pb-2 border-bottom border-gray-800">
                  <div className="bg-danger rounded p-3 me-3">
                    <i className="fas fa-calendar-plus "></i>
                  </div>
                  <div>
                    <h6 className="text-gray-light fs-14 mb-1">Created</h6>
                    <p className=" mb-0">
                      {createdAt
                        ? new Date(createdAt).toLocaleString("en-US")
                        : properties.createdate
                        ? new Date(properties.createdate).toLocaleString(
                            "en-US"
                          )
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-4 pb-2 border-bottom border-gray-800">
                  <div className="bg-danger rounded p-3 me-3">
                    <i className="fas fa-sync-alt "></i>
                  </div>
                  <div>
                    <h6 className="text-gray-light fs-14 mb-1">
                      Last Modified
                    </h6>
                    <p className=" mb-0">
                      {updatedAt
                        ? new Date(updatedAt).toLocaleString("en-US")
                        : properties.hs_lastmodifieddate
                        ? new Date(
                            properties.hs_lastmodifieddate
                          ).toLocaleString("en-US")
                        : "N/A"}
                    </p>
                  </div>
                </div>

                {archived !== undefined && (
                  <div className="d-flex align-items-center">
                    <div className="bg-danger rounded p-3 me-3">
                      <i className="fas fa-archive "></i>
                    </div>
                    <div>
                      <h6 className="text-gray-light fs-14 mb-1">Status</h6>
                      <p
                        className={`mb-0 ${
                          archived ? "text-danger" : "text-success"
                        }`}
                      >
                        {archived ? "Archived" : "Active"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="col-xl-6 col-lg-6 mb-4">
            <div className={`card h-100 ${isDark ? "bg-dark" : ""}`}>
              <div className="card-header border-0">
                <h4 className="card-title ">Contact Information</h4>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-sm-6">
                    <div className="d-flex flex-column">
                      <span className="text-gray-light fs-14 mb-1">Phone</span>
                      <span className="">
                        {properties.phone || "Not specified"}
                      </span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex flex-column">
                      <span className="text-gray-light fs-14 mb-1">Email</span>
                      <span className="">
                        {properties.email || "Not specified"}
                      </span>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="d-flex flex-column">
                      <span className="text-gray-light fs-14 mb-1">
                        Website
                      </span>
                      <span className="">
                        {properties.website || "Not specified"}
                      </span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex flex-column">
                      <span className="text-gray-light fs-14 mb-1">
                        Address
                      </span>
                      <span className="">
                        {[
                          properties.address || "",
                          properties.city || "",
                          properties.state || "",
                          properties.zip || "",
                          properties.country || "",
                        ]
                          .filter(Boolean)
                          .join(", ") || "Not specified"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Properties */}
          <div className="col-xl-6 col-lg-6 mb-4">
            <div className={`card h-100 ${isDark ? "bg-dark" : ""}`}>
              <div className="card-header border-0">
                <h4 className="card-title ">Additional Properties</h4>
              </div>
              <div
                className="card-body"
                style={{ maxHeight: "300px", overflowY: "auto" }}
              >
                <table className="table table-responsive table-borderless">
                  <thead>
                    <tr>
                      <th className="text-gray-light">Property</th>
                      <th className="text-gray-light">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(properties)
                      .filter(
                        ([key]) =>
                          ![
                            "name",
                            "domain",
                            "website",
                            "industry",
                            "type",
                            "city",
                            "country",
                            "description",
                            "createdate",
                            "hs_lastmodifieddate",
                            "phone",
                            "email",
                            "address",
                            "state",
                            "zip",
                            "hs_object_id",
                          ].includes(key)
                      )
                      .map(([key, value]) => {
                        // Format the value appropriately
                        let displayValue = value;

                        // Handle date properties
                        if (key.includes("date") && value) {
                          try {
                            displayValue = new Date(value).toLocaleString(
                              "en-US"
                            );
                          } catch (e) {
                            console.error(
                              `Error formatting date for ${key}:`,
                              e
                            );
                          }
                        }

                        // Handle boolean values
                        if (typeof value === "boolean") {
                          displayValue = value ? "Yes" : "No";
                        }

                        return (
                          <tr key={key}>
                            <td className="">
                              {key
                                .replace(/_/g, " ")
                                .replace(/^\w/, (c) => c.toUpperCase())}
                            </td>
                            <td className="">
                              {displayValue !== null &&
                              displayValue !== undefined
                                ? displayValue
                                : "N/A"}
                            </td>
                          </tr>
                        );
                      })}
                    {Object.entries(properties).filter(
                      ([key]) =>
                        ![
                          "name",
                          "domain",
                          "website",
                          "industry",
                          "type",
                          "city",
                          "country",
                          "description",
                          "createdate",
                          "hs_lastmodifieddate",
                          "phone",
                          "email",
                          "address",
                          "state",
                          "zip",
                          "hs_object_id",
                        ].includes(key)
                    ).length === 0 && (
                      <tr>
                        <td colSpan="2" className="text-center text-gray-light">
                          No additional properties found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
