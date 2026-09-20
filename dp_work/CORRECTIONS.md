# Saarthi SIH 2026 prototype corrections

This version keeps the existing Home page and UI flow intact and fixes the scheme-matching integration.

## Changes

- Unified the profile field used by matching around `socialCategory` (while accepting legacy `category`).
- Replaced the server's old base-score matcher with the same transparent 100-point model used by the client.
- Added normalized server-side matching metadata for every scheme in the catalog.
- Added the missing Coir and NSSH records to the client catalog and the NSFDC prototype record to the server catalog so both sides use the same 9 scheme IDs.
- Standardized client loan envelopes with the server catalog where the two prototype records disagreed.
- Added `documentsRequired` compatibility so both `documentsRequired` and legacy `requiredDocuments` records work in the eligibility modal.
- Made the matching results returned by the API actually drive `SchemesPage` instead of being silently recomputed from a separate catalog.
- Added deterministic tie-breaking by scheme ID so client and server produce the same order for equal scores.
- Added required beneficiary-combination handling for the Mahila Samridhi prototype record (Women + SC).
- Removed the duplicate benefit entry in the NSFDC prototype record.
- Renamed the reset action to `Reset to Demo Profile` because the existing reset behavior restores the built-in demo persona rather than a blank form.
- Updated the finder description so it no longer claims annual turnover is directly scored by the 100-point engine.

## Validation

- Client `.js`/`.jsx` source was syntax-checked with the TypeScript parser: no syntax errors.
- Server modules were syntax-checked with Node: no syntax errors.
- The server matching endpoint was exercised locally with the built-in demo profile.
- Client and server matching were compared for the same demo profile and now produce the same scheme IDs, scores, statuses, and ordering.

## Build note

The included development dependencies in the original archive have a platform-specific Rollup optional-dependency problem in this Linux validation environment, so a Vite production build could not be completed here. Run `npm install` (or the project's `npm run install-all`) on the development machine before `npm run build`.

The scheme records are prototype/demo data already present in the project. Final eligibility, limits, and application requirements should be verified against the relevant government authority before production use.
