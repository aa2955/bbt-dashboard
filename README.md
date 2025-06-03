# 📋 BBT Dashboard – Community Book Distribution Tracker

An interactive, full-stack web dashboard to visualize community-level book distribution stats across global regions and campaigns. Built for BBT MCI to help set and track collective goals like **Bhadra 2024: Surge to 100k!**

---

## 🌐 Live Features

* 🔍 Region → Country → Community cascading dropdown
* 📊 Dynamic stats table (campaign-wise data per year)
* 📈 Aggregated bar chart (pledge vs. actual per year)
* 🪊 Stylish, modern UI (glassmorphic design)
* ⚡ Serverless backend (AWS Lambda + PostgreSQL RDS)
* 🔐 Live API connected to production data

---

## 💠 Technologies Used

### 💻 Frontend

* **React.js**
* **Recharts** (bar chart rendering)
* **CSS3** (modern design + responsive)

### ☁️ Backend

* **AWS Lambda** (Node.js runtime)
* **Amazon API Gateway** (HTTP API)
* **PostgreSQL** on **Amazon RDS**
* **Serverless Framework** (infra-as-code + deployment)

### 📆 Dependencies

* `recharts`
* `pg` (PostgreSQL client)
* `serverless`
* `serverless-dotenv-plugin`

---

## 📁 Project Structure

```
bbt-dashboard/
├── backend/                  # Serverless backend functions
│   ├── handler.js            # Lambda function logic
│   ├── serverless.yml        # Serverless config (routes, env, VPC)
│   └── .env                  # Secrets (PGHOST, PGUSER, etc.)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MainContent.js
│   │   │   ├── Dropdown.js
│   │   │   ├── Header.js / Footer.js
│   │   ├── App.js
│   │   └── App.css
│   └── public/
│       └── background.webp / simah.svg
│
├── data/
│   ├── Region.csv
│   ├── Country.csv
│   ├── Community.csv
│   ├── Campaign.csv
│   ├── Participation.csv
│   └── BBTDash.sql           # SQL schema script
```

---

## ⚙️ Setup & Development

### 1. 🧬 Prerequisites

* Node.js + npm
* AWS CLI + credentials
* Serverless CLI (`npm install -g serverless`)
* PostgreSQL or Amazon RDS instance

### 2. ⚡ Backend Setup

```bash
cd backend/
npm install

# Update .env with DB connection info
PGHOST=your-db-host
PGUSER=postgres
PGPASSWORD=your-password
PGDATABASE=BBTDash
PGPORT=5432

# Deploy Lambdas
serverless deploy --force
```

### 3. 💻 Frontend Setup

```bash
cd frontend/
npm install
npm start
```

In `MainContent.js`, set your backend base URL:

```js
const baseURL = 'https://xyz.execute-api.us-east-1.amazonaws.com';
```

---

## 🔢 API Endpoints

| Route                     | Description                  |
| ------------------------- | ---------------------------- |
| `/regions`                | List of global regions       |
| `/countries/:regionId`    | Countries in a region        |
| `/communities/:countryId` | Communities in a country     |
| `/stats/:communityId`     | Yearly pledge vs actual data |

---

## 🎨 UI & Styling

* Glassmorphism style panels
* Fixed transparent mascot (Simah) in background
* Mobile-first layout with custom dropdowns
* Chart + table layout with fade-in animations

---

## 📊 Chart: Pledge vs Distribution

* Aggregated per year (combined campaigns)
* Dual bar chart: pledged vs actual
* Responsive + tooltip + interactive

---

## 🔒 Security & Best Practices

* DB password/host not committed – stored in `.env`
* RDS access is VPC-restricted
* API Gateway CORS enabled for specific frontend origins
* Serverless plugin loads env securely

---

## 🌍 Future Improvements

* Admin login with JWT
* Community editing + CSV import
* Export to PDF/CSV
* Chart overlays for growth
* Multi-year goals with projections

---

## 👨‍💼 Maintainer

Project by **BBT MCI Team**
Developed by: Anurag Agarwal
Contact: [info@bbtbooks.org](mailto:info@bbtbooks.org)


