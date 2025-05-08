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
    const companyDetails = req.body;

    if (!companyDetails) {
      return res.status(400).json({ message: "Required all the details" });
    }

    const response = axios.post(
      "https://api.hubapi.com/crm/v3/objects/companies",
      companyDetails,
      {
        headers: {
          Authorization: `Bearer ${process.env.token}`,
        },
      }
    );
    console.log(companyDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
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
