import axios from "axios";

export const getallCompany = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.hubapi.com/crm/v3/objects/companies?limit=12",
      {
        headers: {
          Authorization: `Bearer ${process.env.token}`,
        },
      }
    );
    console.log(process.env.token);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch from HubSpot" });
  }
};

export const getCompanybyId = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    if (!id) {
      return res.status(400).json({ message: "Company ID is required" });
    }

    if (!process.env.token) {
      return res
        .status(500)
        .json({ message: "HubSpot API token is not configured" });
    }

    const properties = [
      "name",
      "domain",
      "description",
      "city",
      "country",
      "industry",
      "phone",
      "website",
    ].join(",");
    const api = `https://api.hubapi.com/crm/v3/objects/companies/${id}?properties=${properties}`;
    console.log(api);

    const response = await axios.get(api, {
      headers: {
        Authorization: `Bearer ${process.env.token}`,
      },
    });

    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching company:", error);

    if (error.response) {
      return res.status(error.response.status).json({
        message: error.response.data.message || "Error fetching company data",
      });
    } else if (error.request) {
      return res.status(503).json({ message: "No response from HubSpot API" });
    } else {
      return res.status(500).json({ message: "Error setting up API request" });
    }
  }
};

export const addCompany = async (req, res) => {
  try {
    const {
      // Basic Information
      ATTN,
      transferedFrom,
      transferedTo,
      type,
      companyName,
      parentCompany, // We'll keep this in the request but not send to HubSpot
      companyDisplayName,

      // Billing Information
      billingCompanyName,
      billingContact,
      billingPhone,
      billingAddress,
      billingAddress2,
      billingCity,
      billingState,
      billingZipCode,

      // Ownership and Market
      ownership,
      market,
      industry,

      // Shipping Information
      shippingAddress,
      shippingAddress2,
      shippingCity,
      shippingState,
      shippingZipCode,
      shippingCountry,
      countryRegionCode,
      latitude,
      longitude,

      // Primary Contact
      primaryFirstName,
      primaryLastName,
      primaryTitle,
      primaryEmail,
      primaryPhone,

      // Secondary Contact
      secondaryFirstName,
      secondaryLastName,
      secondaryTitle,
      secondaryEmail,
      secondaryPhone,

      // Other Contacts
      otherPOC,
      broker,

      // DOM Specific
      domeID,
      audio,
      hardwareScreen,
      board,
      extras,
      installDate,

      // Training and Notes
      onboardingTraining,
      accountOverview,
      strategyAndAccount,
      technicalServicingNotes,

      // Online Presence
      website,
      instagram,
      instaFollowing,
      tikTok,
      facebookPage,
      otherSocial,
      check,
    } = req.body;
    // console.log(parentCompany, companyDisplayName);
    console.log("This is Parent company name", parentCompany);

    if (!companyName) {
      return res.status(400).json({ message: "Company name is required" });
    }

    // Extract domain from website or create one from company name
    let domain;
    if (website) {
      try {
        // Try to extract domain from website URL
        const url = new URL(
          website.startsWith("http") ? website : `https://${website}`
        );
        domain = url.hostname;
      } catch (error) {
        // If URL parsing fails, create domain from company name
        domain = `${companyName.toLowerCase().replace(/\s+/g, "")}.com`;
      }
    } else {
      domain = `${companyName.toLowerCase().replace(/\s+/g, "")}.com`;
    }

    // Fix case sensitivity for ownership value
    let formattedOwnership = ownership;
    if (ownership && ownership.toLowerCase() === "rev-share") {
      formattedOwnership = "Rev-Share"; // Ensure correct capitalization
    }

    const hubspotData = {
      properties: {
        // Basic Information
        name: companyName,
        company_name: companyName,
        attn_: ATTN,
        transferred_from: transferedFrom,
        transferred__to: transferedTo,
        type: type === "Dome Home" ? "PARTNER" : type,
        dome_home: type === "Dome Home" ? "true" : "false",
        // Removed hs_parent_company_id as it's read-only

        // Billing Information
        billing_company_name: billingCompanyName,
        billing_contact_individual_name: billingContact,
        billing_phone: billingPhone,
        billing_address_1: billingAddress,
        billing_address_line_2: billingAddress2,
        billing_city: billingCity,
        billing_state: billingState,
        billing_zip_code: billingZipCode,

        // Ownership and Market
        ownership: formattedOwnership, // Using the corrected case-sensitive value
        market_class: market?.charAt(0).toUpperCase() + market?.slice(1),
        industry: industry,

        // Shipping Information
        address: shippingAddress,
        address2: shippingAddress2,
        city: shippingCity,
        state: shippingState,
        zip: shippingZipCode,
        country: shippingCountry,
        hs_country_code: countryRegionCode,
        location__latitude_: latitude,
        location__longitude_: longitude,

        // Primary Contact
        first_name: primaryFirstName,
        last_name: primaryLastName,
        title: primaryTitle,
        email: primaryEmail,
        primary_phone: primaryPhone,

        // Secondary Contact
        secondary_first_neme: secondaryFirstName,
        secondary_last_name: secondaryLastName,
        secondary_title: secondaryTitle,
        secondary_email: secondaryEmail,
        secondary_phone: secondaryPhone,

        // Other Contacts
        other_poc: otherPOC,
        broker: broker,

        // DOM Specific
        dome_id: domeID,
        audio_booster: typeof audio === "boolean" ? audio.toString() : audio,
        interface_screen: hardwareScreen,
        control_board: board,
        extras: extras,
        install_date: installDate,

        // Training and Notes
        onboarding:
          typeof onboardingTraining === "boolean"
            ? onboardingTraining.toString()
            : onboardingTraining,
        account_overview: accountOverview,
        stratergy_and_account: strategyAndAccount,
        technical_servicing_notes: technicalServicingNotes,

        // Online Presence
        website: website,
        instagram_page: instagram,
        insta_following: instaFollowing,
        tik_tok: tikTok,
        facebook_company_page: facebookPage,
        other_social: otherSocial,
        check_in: check ? "true" : "false",

        // Required
        domain: domain,
      },
    };

    console.log(
      "Sending data to HubSpot:",
      JSON.stringify(hubspotData, null, 2)
    );

    const response = await axios.post(
      "https://api.hubapi.com/crm/v3/objects/companies",
      hubspotData,
      {
        headers: {
          Authorization: `Bearer ${process.env.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);

    console.log("Company created successfully:", response.data);

    // If parent company was provided, log it for reference but don't try to set it directly
    if (parentCompany) {
      console.log(
        `Note: Parent company "${parentCompany}" was provided but not set as it's a read-only property in HubSpot`
      );
    }

    return res.status(201).json({
      message: "Company created successfully",
      data: response.data,
      redirectUrl: "/admin",
    });
  } catch (error) {
    console.error(
      "Error creating company:",
      error.response?.data || error.message
    );
    return res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || "Internal server error",
      error: error.response?.data || error.message,
    });
  }
};

export const nextPage = async (req, res) => {
  try {
    const { after, limit = 12 } = req.query;
    console.log("🚀 ~ nextPage ~ limit:", limit);

    if (!after) {
      return res
        .status(400)
        .json({ message: "Pagination cursor ('after' parameter) is required" });
    }

    const apiUrl = `https://api.hubapi.com/crm/v3/objects/companies?limit=${limit}&after=${after}`;

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.token}`,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching next page:", error);
    res.status(500).status({ message: "Internal server Error" });
  }
};
