import { fallbackPartners, mockUserLocations, calculateDistanceKm, getPartners } from "./src/services/api.js";

console.log("=================================================");
console.log("   SAARTHI CLIENT PARTNER LOCATOR LOGIC TESTS   ");
console.log("=================================================");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

// 1. Distance Calculation (Haversine)
const cpLat = 28.6315;
const cpLng = 77.2167;
const karolBaghLat = 28.6517;
const karolBaghLng = 77.1906;
const calculatedDist = calculateDistanceKm(cpLat, cpLng, karolBaghLat, karolBaghLng);
assert(calculatedDist > 2 && calculatedDist < 4, `Distance from CP to Karol Bagh is calculated as ~${calculatedDist} km (expected 2-4 km)`);

// 2. Mock User Locations
assert(mockUserLocations.length >= 6, `mockUserLocations has ${mockUserLocations.length} locations`);
const delhiLoc = mockUserLocations.find((l) => l.city === "New Delhi");
assert(delhiLoc && delhiLoc.lat && delhiLoc.lng, "Delhi location exists with lat/lng");

// 3. Fallback partners count and structure
assert(fallbackPartners.length >= 10, `fallbackPartners has ${fallbackPartners.length} centers`);

// 4. Test offline getPartners filtering
async function runGetPartnersTests() {
  // Filter by state
  const delhiPartners = await getPartners({ state: "Delhi" });
  assert(delhiPartners.every((p) => p.state === "Delhi"), `Filter state='Delhi' returned ${delhiPartners.length} partners all in Delhi`);

  // Filter by partner type
  const cscPartners = await getPartners({ category: "CSC" });
  assert(cscPartners.every((p) => p.type.includes("CSC") || p.category === "CSC"), `Filter category='CSC' returned ${cscPartners.length} centers`);

  // Filter by scheme
  const svanidhiPartners = await getPartners({ scheme: "pm-svanidhi" });
  assert(
    svanidhiPartners.length > 0 &&
      svanidhiPartners.every((p) =>
        p.supportedSchemes.includes("pm-svanidhi") ||
        (p.supportedSchemeNames || []).some((sn) => sn.toLowerCase().includes("svanidhi"))
      ),
    `Filter scheme='pm-svanidhi' returned ${svanidhiPartners.length} centers matching PM SVANidhi`
  );

  // Search by keyword
  const searchResults = await getPartners({ search: "Varanasi" });
  assert(searchResults.length > 0 && searchResults.some((p) => p.city === "Varanasi"), `Search 'Varanasi' returned ${searchResults.length} results`);

  console.log("=================================================");
  console.log(`Client Logic Tests Complete: ${passed} Passed, ${failed} Failed`);
  console.log("=================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runGetPartnersTests();
