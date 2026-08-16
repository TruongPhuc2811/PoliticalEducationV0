# E2E

Current suite contains **shell smoke tests**, not final business E2E.

## Run

Start frontend:

```powershell
cd frontend
npm install
npm run dev
```

Then:

```powershell
cd e2e
npm install
npx playwright install chromium
npm test
```

Later, business E2E will integrate with backend + dedicated MySQL test DB.
