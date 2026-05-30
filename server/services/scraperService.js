const axios = require("axios");

const ANAKIN_API_KEY = process.env.ANAKIN_API_KEY;
const BASE_URL = "https://anakin.io";
const WIRE_TASK_URL = `${BASE_URL}/v1/wire/task`;

const headers = () => ({
  "X-API-Key": ANAKIN_API_KEY,
  "Content-Type": "application/json",
});

async function scrapeAmazon(query) {
  const payload = {
    action_id: "am_search_products",
    params: {
      query,
      page: 1,
      limit: 24,
      sort: "featured",
    },
  };

  try {
    // STEP 1: Submit job
    const submitRes = await axios.post(WIRE_TASK_URL, payload, {
      headers: headers(),
      timeout: 30000,
    });

    console.log("WIRE SUBMIT STATUS:", submitRes.status);

    const { job_id, poll_url } = submitRes.data;

    if (!job_id || !poll_url) {
      console.error("WIRE: No job_id/poll_url:", submitRes.data);
      return null;
    }

    console.log("WIRE JOB SUBMITTED:", job_id);

    // STEP 2: Poll until completed
    const fullPollUrl = `${BASE_URL}${poll_url}`;
    const maxAttempts = 15;
    const waitMs = 3000;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      await sleep(waitMs);

      const pollRes = await axios.get(fullPollUrl, {
        headers: headers(),
        timeout: 30000,
      });

      const status = pollRes.data?.status;
      console.log(`WIRE POLL [${attempt}]: status=${status}`);

      if (status === "completed") {
        console.log("WIRE SUCCESS: got results");
        return pollRes.data;
      }

      if (status === "failed") {
        console.error("WIRE JOB FAILED:", pollRes.data);
        return null;
      }
    }

    console.error("WIRE: Timed out waiting for completion");
    return null;
  } catch (err) {
    console.error("[WIRE ERROR]", err.message);
    return null;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = { scrapeAmazon };
