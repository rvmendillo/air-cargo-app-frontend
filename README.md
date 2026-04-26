# Skyler Frontend

An **Angular 14** single-page application for air cargo dangerous goods (DG) compliance management. Provides an interactive dashboard for DGR checks, shipment tracking, data conversion, and an AI-powered compliance chatbot — all backed by the [Skyler Backend](../skyler-backend/) API.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Pages & Components](#pages--components)
- [Services](#services)
- [Proxy Configuration](#proxy-configuration)
- [Build](#build)
- [Testing](#testing)

---

## Features

- **DG Shipment Dashboard** — View and manage dangerous goods shipment data fetched from IATA ONE Record.
- **DGR Compliance Check** — Real-time AWB compliance validation against IATA Dangerous Goods Regulations.
- **DG Converter** — Upload and convert Shipper's Declaration XML documents to structured JSON.
- **JSON ↔ JSON-LD Converter** — Transform JSON payloads into ONE Record-compliant JSON-LD format.
- **AI Chatbot** — Interactive assistant powered by Gemini AI for DGR-related questions and compliance analysis.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Angular 14](https://angular.io/) |
| Language | [TypeScript 4.7](https://www.typescriptlang.org/) |
| HTTP | `@angular/common/http` (HttpClient) |
| Routing | `@angular/router` |
| Forms | `@angular/forms` (Template-driven) |
| RxJS | 7.5 |
| Package Manager | npm / Yarn |

---

## Project Structure

```
skyler-frontend/
├── angular.json                     # Angular CLI workspace configuration
├── package.json                     # Dependencies & npm scripts
├── proxy.conf.json                  # Dev-server proxy rules (ONE Record auth)
├── tsconfig.json                    # TypeScript configuration
│
└── src/
    ├── index.html                   # Application shell
    ├── main.ts                      # Bootstrap entry point
    ├── styles.css                   # Global styles
    ├── favicon.svg                  # App favicon
    │
    ├── app/
    │   ├── app.module.ts            # Root NgModule
    │   ├── app.component.ts         # Root component (shell & navigation)
    │   ├── app-routing.module.ts    # Route definitions
    │   │
    │   ├── components/
    │   │   ├── dgr-compliance/      # DGR compliance check page
    │   │   ├── dg-shipment/         # DG shipment dashboard (ONE Record)
    │   │   ├── dg-converter/        # XML → JSON DGD converter
    │   │   ├── json-converter/      # JSON → JSON-LD converter
    │   │   └── chatbot/             # AI chatbot widget
    │   │
    │   └── services/
    │       ├── api.service.ts       # Backend API client (REST calls)
    │       └── chatbot.service.ts   # Chatbot-specific API service
    │
    ├── assets/                      # Static assets (images, icons, etc.)
    └── environments/                # Environment-specific configs
```

---

## Prerequisites

- **Node.js 14+** (v14.17+ recommended)
- **npm 8+** or **Yarn**
- **Skyler Backend** running on `http://localhost:8000` (see [Backend README](../skyler-backend/README.md))

---

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd skyler-frontend

# Install dependencies
npm install
# or
yarn install
```

---

## Running the App

```bash
# Start the development server with backend proxy
npm start
```

This runs `ng serve --proxy-config proxy.conf.json` and opens the app at **http://localhost:4200**.

The app will automatically reload when source files change.

> **Note:** Ensure the [Skyler Backend](../skyler-backend/) is running on port 8000 before starting the frontend.

---

## Pages & Components

### Routes

| Path | Component | Description |
|---|---|---|
| `/` | — | Redirects to `/dg-shipment` |
| `/dg-shipment` | `DgrComplianceComponent` | Main DGR compliance dashboard |
| `/dgd-check` | `DgShipmentComponent` | DG shipment details & ONE Record data viewer |
| `/dg-converter` | `DgConverterComponent` | XML DGD document → JSON converter tool |
| `/json-converter` | `JsonConverterComponent` | JSON → JSON-LD (ONE Record format) converter |

### Components

| Component | Description |
|---|---|
| `DgrComplianceComponent` | AWB lookup with compliance alerts, DG checks, and AI analysis |
| `DgShipmentComponent` | Shipment dashboard with ONE Record integration — displays master/house waybills, pieces, DG details, and compliance check results |
| `DgConverterComponent` | Accepts raw XML input (Shipper's Declaration) and displays the converted JSON output |
| `JsonConverterComponent` | Accepts JSON input and converts it to ONE Record JSON-LD format |
| `ChatbotComponent` | Floating AI chatbot for DGR questions, powered by Gemini |

---

## Services

### `ApiService`

Central HTTP client for all backend communication:

| Method | Endpoint | Description |
|---|---|---|
| `getDashboardStats()` | `GET /api/dashboard/stats` | Fetch dashboard KPIs |
| `getAwbCompliance(awb)` | `GET /api/awb/{awb}/compliance` | DGR compliance check |
| `getUldStatus()` | `GET /api/uld/status` | ULD container statuses |
| `getOneRecordAwb(awbId)` | `GET /api/onerecord/awb/{awbId}` | Parsed ONE Record AWB data |
| `getOneRecordRaw(awbId)` | `GET /api/onerecord/raw/{awbId}` | Raw ONE Record JSON-LD response |

### `ChatbotService`

Handles communication with the `/ai` backend endpoint for the chatbot widget.

---

## Proxy Configuration

The dev server proxies certain requests to external services via `proxy.conf.json`:

| Local Path | Target |
|---|---|
| `/token` | ONE Record OAuth token endpoint |
| `/awb-record` | ONE Record API |

> In production, these proxies should be replaced by the backend's server-side proxy (`/api/onerecord/awb/{id}`), which handles authentication securely.

---

## Build

```bash
# Production build
ng build

# Development watch build
ng build --watch --configuration development
```

Build artifacts are output to the `dist/` directory.

---

## Testing

```bash
# Run unit tests (Karma + Jasmine)
ng test

# Run with code coverage
ng test --code-coverage
```
