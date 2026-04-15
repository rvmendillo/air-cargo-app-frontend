from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import time

app = FastAPI(title="Air Cargo Dashboard API")

# Setup CORS for the Angular frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Air Cargo API is running"}

@app.get("/api/dashboard/stats")
def get_dashboard_stats():
    return {
        "activeDgrShipments": 42,
        "flaggedDgrShipments": 3,
        "uldUtilization": 91.4,
        "uldActive": 1204,
        "uldInTransit": 82,
        "cargoIqMilestoneCompletion": 98,
        "weather": {
            "hub": "FRA HUB (FRANKFURT)",
            "condition": "Clear Sky",
            "visibility": "10,000+ m",
            "windSpeed": "12 kts NE",
            "activeRunways": "07R, 25C"
        }
    }

@app.get("/api/awb/{awb_number}/compliance")
def get_awb_compliance(awb_number: str):
    return {
        "awb_number": awb_number,
        "consignment": "High-Density Energy Solutions (Lithium-Ion Component)",
        "alerts": [
            {
                "type": "CRITICAL",
                "title": "UN3480 Requirement",
                "message": "Packaging exceeds the 30% State of Charge (SoC) limit for passenger aircraft. Must be re-routed via Cargo-Only flight (CAO)."
            },
            {
                "type": "INFO",
                "title": "Packing Instruction 965",
                "message": "Section IA compliance detected. Overpack markings required in accordance with IATA DGR Figure 7.1.A."
            }
        ],
        "checks": [
            {
                "description": "Lithium ion batteries (UN 3480, PI 965)",
                "classDiv": "Class 9",
                "packaging": "Fibreboard Box",
                "status": "FAIL"
            },
            {
                "description": "Hazard Labeling (Class 9 & CAO)",
                "classDiv": "-",
                "packaging": "Standard",
                "status": "PASS"
            },
            {
                "description": "Shipper's Declaration (Digital DGD Form)",
                "classDiv": "-",
                "packaging": "NOTOC Required",
                "status": "PASS"
            }
        ],
        "ai_analysis": "Hello Loadmaster Thorne. I've analyzed AWB " + awb_number + ". I found a **Critical Conflict** with IATA Section 5, Sub-section 5.0.2.7."
    }

@app.get("/api/uld/status")
def get_uld_status():
    return [
        {
            "id": "AKE 82910 LH",
            "status": "STAGED",
            "gate": "Gate B14",
            "health": 98,
            "temp": "+4.2°C",
            "milestones": ["RCL", "MAN", "DEP"]
        },
        {
            "id": "PMC 44021 AF",
            "status": "LOADED",
            "gate": "Flight AF006",
            "health": 72,
            "warning": "High G-Force Warning",
            "milestones": ["RCL", "MAN", "DEP"]
        }
    ]
