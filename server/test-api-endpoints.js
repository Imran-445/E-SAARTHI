import express from "express";
import schemesRouter from "./src/routes/schemesRoute.js";

const app = express();
app.use(express.json());
app.use("/api/schemes", schemesRouter);

const server = app.listen(0, async () => {
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}/api/schemes`;

  console.log(`[API Test] Server listening for test queries on port ${port}`);

  try {
    // 1. All schemes
    let res = await fetch(`${baseUrl}`);
    let data = await res.json();
    console.log(`✓ GET /api/schemes -> total: ${data.total} schemes`);
    if (data.total < 12) throw new Error("Expected at least 12 schemes");

    // 2. Category query
    res = await fetch(`${baseUrl}?category=${encodeURIComponent("Street Vendors & Urban Micro-sellers")}`);
    data = await res.json();
    console.log(`✓ GET /api/schemes?category=Street Vendors... -> total: ${data.total}`);
    if (data.total !== 1) throw new Error("Expected 1 Street Vendor scheme");

    // 3. Purpose query
    res = await fetch(`${baseUrl}?purpose=${encodeURIComponent("Working Capital")}`);
    data = await res.json();
    console.log(`✓ GET /api/schemes?purpose=Working Capital -> total: ${data.total}`);
    if (data.total === 0) throw new Error("Expected schemes for Working Capital");

    // 4. Funding range query
    res = await fetch(`${baseUrl}?fundingRange=under_1lakh`);
    data = await res.json();
    console.log(`✓ GET /api/schemes?fundingRange=under_1lakh -> total: ${data.total}`);

    // 5. Search query
    res = await fetch(`${baseUrl}?search=vishwakarma`);
    data = await res.json();
    console.log(`✓ GET /api/schemes?search=vishwakarma -> total: ${data.total}, scheme: ${data.schemes[0]?.name}`);
    if (!data.schemes[0]?.name.includes("Vishwakarma")) throw new Error("Expected Vishwakarma scheme in search result");

    // 6. Single scheme details
    res = await fetch(`${baseUrl}/pm-svanidhi`);
    data = await res.json();
    console.log(`✓ GET /api/schemes/pm-svanidhi -> name: "${data.scheme?.name}", keyBenefit: "${data.scheme?.keyBenefit}"`);
    if (data.scheme?.id !== "pm-svanidhi") throw new Error("Failed to load PM SVANidhi by ID");

    // 7. Single scheme 404 test
    res = await fetch(`${baseUrl}/non-existent-id`);
    if (res.status === 404) {
      console.log("✓ GET /api/schemes/non-existent-id -> 404 Not Found as expected");
    } else {
      throw new Error("Expected 404 for non-existent scheme ID");
    }

    console.log("=== ALL API ROUTE TESTS PASSED SUCCESSFULLY! ===");
    server.close();
    process.exit(0);
  } catch (err) {
    console.error("API Test Failed:", err);
    server.close();
    process.exit(1);
  }
});
