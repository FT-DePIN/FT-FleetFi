# FleetFi Solution Architecture — How It Works

FleetFi connects electric vehicle (EV) investors, fleet operators, and riders through a tokenized co-ownership platform.  
It democratizes EV ownership by allowing multiple investors to co-own each vehicle, while riders earn daily income driving FT-managed EVs.

---

## Core System Flow

### 1. Investor Interface (FleetFi Dashboard)
- Investors log into FleetFi’s dashboard.
- They view available EVs and buy fractional shares representing ownership tokens.
- Each token corresponds to a % stake in the EV and its revenue rights.

### 2. Vehicle and Operations Layer
- Each EV is registered in FleetFi’s database with telemetry fields (battery %, distance, swap count).
- Fleet operations, swap events, and revenue generation are logged in real time.

### 3. Revenue and Tokenization Logic
- Every completed ride generates revenue.
- The system simulates auto-allocation of earnings:
  - **Investor ROI**
  - **Rider wages**
  - **FT management + maintenance reserve**

### 4. Blockchain & Custody Integration (Trovotech)
- In full rollout, FleetFi will connect to **Trovotech’s SEC-aligned tokenization API**.
- Trovotech issues **asset-backed tokens** under Trustee custody.
- Future integration uses the **Bantu blockchain** for verifiable asset registry and transparent ROI disbursement.

---

## Architecture Diagram

![FleetFi × Trovotech Integration — Custody and Tokenization Flow](./FT_Trovotech_Architecture.png)

---

## Tech Stack

| Layer | Tool/Platform | Description |
|-------|----------------|-------------|
| Frontend | Google AI Studio / Bubble MVP | User dashboard and investor portal |
| Backend | Firebase (mock) | Stores fleet and booking data |
| Data Simulation | CSV + Admin workflows | Generates test telemetry for demo |
| Blockchain (Future) | Trovotech API + Bantu | SEC-aligned token issuance |
| IoT Data | Qoray API (planned) | EV telemetry and tracking |
