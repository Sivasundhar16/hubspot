import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JobLists = () => {
  const navigate = useNavigate();
  const [userdata, setUserData] = useState({
    // Basic Information
    ATTN: "",
    transferedFrom: "",
    transferedTo: "",
    type: "",
    parentCompany: "",
    companyDisplayName: "",
    companyName: "",

    // Billing Information
    billingCompanyName: "",
    billingContact: "",
    billingPhone: "",
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingZipCode: "",

    // Ownership and Market
    ownership: "Own",
    market: "Market Facing",
    industry: "COMPUTER_SOFTWARE",

    // Shipping Information
    shippingAddress: "",
    shippingAddress2: "",
    shippingCity: "",
    shippingState: "",
    shippingZipCode: "",
    shippingCountry: "",
    longitude: "",

    // Primary Contact
    primaryFirstName: "",
    primaryLastName: "",
    primaryTitle: "",
    primaryEmail: "",
    primaryPhone: "",

    // Secondary Contact
    secondaryFirstName: "",
    secondaryLastName: "",
    secondaryTitle: "",
    secondaryEmail: "",
    secondaryPhone: "",

    // Other Contacts
    otherPOC: "",
    broker: "",

    // DOM Specific
    domeID: "",
    audio: "true",
    hardwareScreen: "V3 - Android (Tian)",
    board: "V2 - Tian (Mikroe and Android Firmware)",
    extras: "",
    installDate: "",

    // Training and Notes
    onboardingTraining: "true",
    accountOverview: "",
    strategyAndAccount: "",
    technicalServicingNotes: "",

    // Online Presence
    website: "",
    instagram: "",
    instaFollowing: "Following",
    tikTok: "",
    otherSocial: "",
    check: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/company/add",
        userdata
      );

      if (response.status === 201) {
        localStorage.setItem("available", "true");
        setUserData({
          ATTN: "",
          transferedFrom: "",
          transferedTo: "",
          type: "",
          parentCompany: "",
          companyDisplayName: "",
          companyName: "",
          billingCompanyName: "",
          billingContact: "",
          billingPhone: "",
          billingAddress: "",
          billingCity: "",
          billingState: "",
          billingZipCode: "",
          ownership: "Own",
          market: "Market Facing",
          industry: "COMPUTER_SOFTWARE",
          shippingAddress: "",
          shippingAddress2: "",
          shippingCity: "",
          shippingState: "",
          shippingZipCode: "",
          shippingCountry: "",
          longitude: "",
          primaryFirstName: "",
          primaryLastName: "",
          primaryTitle: "",
          primaryEmail: "",
          primaryPhone: "",
          secondaryFirstName: "",
          secondaryLastName: "",
          secondaryTitle: "",
          secondaryEmail: "",
          secondaryPhone: "",
          otherPOC: "",
          broker: "",
          domeID: "",
          audio: "true",
          hardwareScreen: "V3 - Android (Tian)",
          board: "V2 - Tian (Mikroe and Android Firmware)",
          extras: "",
          installDate: "",
          onboardingTraining: "true",
          accountOverview: "",
          strategyAndAccount: "",
          technicalServicingNotes: "",
          website: "",
          instagram: "",
          instaFollowing: "Following",
          tikTok: "",
          otherSocial: "",
          check: false,
        });
        navigate("/domhost");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header pb-0 border-0 flex-wrap">
            <h4 className="fs-20 mb-3">Create DOM Users</h4>
          </div>
          <div className="card-body">
            {error && <div className="alert alert-danger mb-4">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* Basic Information */}
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="card mb-3 border-0 shadow-sm">
                    <div className="card-header">
                      <h5 className="fs-16 mb-0">Basic Information</h5>
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <label>ATTN</label>
                        <input
                          type="text"
                          name="ATTN"
                          value={userdata.ATTN}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Transferred From</label>
                        <input
                          type="text"
                          name="transferedFrom"
                          value={userdata.transferedFrom}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Transferred To</label>
                        <input
                          type="text"
                          name="transferedTo"
                          value={userdata.transferedTo}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Type</label>
                        <select
                          name="type"
                          value={userdata.type}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="">Select Type</option>
                          <option value="Coming Soon">Coming Soon</option>
                          <option value="Dome Home">Dome Home</option>
                          <option value="Archive">Archive</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Parent Company</label>
                        <input
                          type="text"
                          name="parentCompany"
                          value={userdata.parentCompany}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Company Display Name</label>
                        <input
                          type="text"
                          name="companyDisplayName"
                          value={userdata.companyDisplayName}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Company Name *</label>
                        <input
                          type="text"
                          name="companyName"
                          value={userdata.companyName}
                          onChange={handleChange}
                          required
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Billing Information */}
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="card mb-3 border-0 shadow-sm">
                    <div className="card-header">
                      <h5 className="fs-16 mb-0">Billing Information</h5>
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <label>Billing Company Name</label>
                        <input
                          type="text"
                          name="billingCompanyName"
                          value={userdata.billingCompanyName}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Billing Contact</label>
                        <input
                          type="text"
                          name="billingContact"
                          value={userdata.billingContact}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Billing Phone</label>
                        <input
                          type="text"
                          name="billingPhone"
                          value={userdata.billingPhone}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Billing Address</label>
                        <input
                          type="text"
                          name="billingAddress"
                          value={userdata.billingAddress}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Billing City</label>
                        <input
                          type="text"
                          name="billingCity"
                          value={userdata.billingCity}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Billing State</label>
                        <input
                          type="text"
                          name="billingState"
                          value={userdata.billingState}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Billing Zip Code</label>
                        <input
                          type="text"
                          name="billingZipCode"
                          value={userdata.billingZipCode}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ownership and Market */}
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="card mb-3 border-0 shadow-sm">
                    <div className="card-header">
                      <h5 className="fs-16 mb-0">Ownership and Market</h5>
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <label>Ownership</label>
                        <select
                          name="ownership"
                          value={userdata.ownership}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="Own">Own</option>
                          <option value="Rent">Rent</option>
                          <option value="Rev-Share">Rev-Share</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Market</label>
                        <select
                          name="market"
                          value={userdata.market}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="Market Facing">Market Facing</option>
                          <option value="Member">Member</option>
                          <option value="Private">Private</option>
                          <option value="Corporate">Corporate</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Industry</label>
                        <select
                          name="industry"
                          value={userdata.industry}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="COMPUTER_SOFTWARE">
                            Computer Software
                          </option>
                          <option value="INFORMATION_TECHNOLOGY_AND_SERVICES">
                            IT and Services
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Information */}
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="card mb-3 border-0 shadow-sm">
                    <div className="card-header">
                      <h5 className="fs-16 mb-0">Shipping Information</h5>
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <label>Shipping Address</label>
                        <input
                          type="text"
                          name="shippingAddress"
                          value={userdata.shippingAddress}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Shipping Address 2</label>
                        <input
                          type="text"
                          name="shippingAddress2"
                          value={userdata.shippingAddress2}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Shipping City</label>
                        <input
                          type="text"
                          name="shippingCity"
                          value={userdata.shippingCity}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Shipping State</label>
                        <input
                          type="text"
                          name="shippingState"
                          value={userdata.shippingState}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Shipping Zip Code</label>
                        <input
                          type="text"
                          name="shippingZipCode"
                          value={userdata.shippingZipCode}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Shipping Country</label>
                        <input
                          type="text"
                          name="shippingCountry"
                          value={userdata.shippingCountry}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Longitude</label>
                        <input
                          type="text"
                          name="longitude"
                          value={userdata.longitude}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contacts */}
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="card mb-3 border-0 shadow-sm">
                    <div className="card-header">
                      <h5 className="fs-16 mb-0">Primary Contact</h5>
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <label>First Name</label>
                        <input
                          type="text"
                          name="primaryFirstName"
                          value={userdata.primaryFirstName}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Last Name</label>
                        <input
                          type="text"
                          name="primaryLastName"
                          value={userdata.primaryLastName}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Title</label>
                        <input
                          type="text"
                          name="primaryTitle"
                          value={userdata.primaryTitle}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          name="primaryEmail"
                          value={userdata.primaryEmail}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone</label>
                        <input
                          type="text"
                          name="primaryPhone"
                          value={userdata.primaryPhone}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="card mb-3 border-0 shadow-sm">
                    <div className="card-header">
                      <h5 className="fs-16 mb-0">Secondary Contact</h5>
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <label>First Name</label>
                        <input
                          type="text"
                          name="secondaryFirstName"
                          value={userdata.secondaryFirstName}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Last Name</label>
                        <input
                          type="text"
                          name="secondaryLastName"
                          value={userdata.secondaryLastName}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Title</label>
                        <input
                          type="text"
                          name="secondaryTitle"
                          value={userdata.secondaryTitle}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          name="secondaryEmail"
                          value={userdata.secondaryEmail}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone</label>
                        <input
                          type="text"
                          name="secondaryPhone"
                          value={userdata.secondaryPhone}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Other Contacts */}
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="card mb-3 border-0 shadow-sm">
                    <div className="card-header">
                      <h5 className="fs-16 mb-0">Other Contacts</h5>
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <label>Other Point of Contact</label>
                        <input
                          type="text"
                          name="otherPOC"
                          value={userdata.otherPOC}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Broker</label>
                        <input
                          type="text"
                          name="broker"
                          value={userdata.broker}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* DOM Specific */}
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="card mb-3 border-0 shadow-sm">
                    <div className="card-header">
                      <h5 className="fs-16 mb-0">DOM Specific</h5>
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <label>Dome ID</label>
                        <input
                          type="text"
                          name="domeID"
                          value={userdata.domeID}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Audio</label>
                        <select
                          name="audio"
                          value={userdata.audio}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Hardware - Screen</label>
                        <select
                          name="hardwareScreen"
                          value={userdata.hardwareScreen}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="V0 - Legacy">V0 - Legacy</option>
                          <option value="V1 - Mikroe (Tian or Cooper Board)">
                            V1 - Mikroe
                          </option>
                          <option value="V2 - Old Android (Cooper)">
                            V2 - Old Android
                          </option>
                          <option value="V3 - Android (Tian)">
                            V3 - Android
                          </option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Board</label>
                        <select
                          name="board"
                          value={userdata.board}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="V0 - Legacy (Prior to Cooper)">
                            V0 - Legacy
                          </option>
                          <option value="V1 - Cooper (Mikroe and Old Android Firmware)">
                            V1 - Cooper
                          </option>
                          <option value="V2 - Tian (Mikroe and Android Firmware)">
                            V2 - Tian
                          </option>
                          <option value="V3 - Matthew (Android Firmware)">
                            V3 - Matthew
                          </option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Extras</label>
                        <input
                          type="text"
                          name="extras"
                          value={userdata.extras}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Install Date</label>
                        <input
                          type="date"
                          name="installDate"
                          value={userdata.installDate}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Training and Notes */}
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="card mb-3 border-0 shadow-sm">
                    <div className="card-header">
                      <h5 className="fs-16 mb-0">Training and Notes</h5>
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <label>Onboarding Training</label>
                        <select
                          name="onboardingTraining"
                          value={userdata.onboardingTraining}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Account Overview</label>
                        <textarea
                          name="accountOverview"
                          value={userdata.accountOverview}
                          onChange={handleChange}
                          className="form-control"
                          rows="3"
                        />
                      </div>
                      <div className="form-group">
                        <label>Strategy and Account</label>
                        <textarea
                          name="strategyAndAccount"
                          value={userdata.strategyAndAccount}
                          onChange={handleChange}
                          className="form-control"
                          rows="3"
                        />
                      </div>
                      <div className="form-group">
                        <label>Technical Servicing Notes</label>
                        <textarea
                          name="technicalServicingNotes"
                          value={userdata.technicalServicingNotes}
                          onChange={handleChange}
                          className="form-control"
                          rows="3"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Online Presence */}
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="card mb-3 border-0 shadow-sm">
                    <div className="card-header">
                      <h5 className="fs-16 mb-0">Online Presence</h5>
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <label>Website</label>
                        <input
                          type="text"
                          name="website"
                          value={userdata.website}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Instagram</label>
                        <input
                          type="text"
                          name="instagram"
                          value={userdata.instagram}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Instagram Following</label>
                        <select
                          name="instaFollowing"
                          value={userdata.instaFollowing}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="Yes">Yes</option>
                          <option value="N/A">N/A</option>
                          <option value="Request Sent">Request Sent</option>
                          <option value="Following">Following</option>
                          <option value="Both Follow">Both Follow</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>TikTok</label>
                        <input
                          type="text"
                          name="tikTok"
                          value={userdata.tikTok}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Other Social</label>
                        <input
                          type="text"
                          name="otherSocial"
                          value={userdata.otherSocial}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          name="check"
                          checked={userdata.check}
                          onChange={handleChange}
                          className="form-check-input"
                        />
                        <label className="form-check-label">Check</label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="col-xl-12">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary btn-block"
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Registering...
                      </>
                    ) : (
                      "Register"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobLists;
