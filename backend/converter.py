import xmltodict
from typing import Dict, Any

def convert_xml_to_onerecord_jsonld(xml_string: str) -> Dict[str, Any]:
    """
    Parses a MasterAirWaybill (or similar) XML and converts it into a structural IATA ONE Record JSON-LD format.
    """
    try:
        # 1. Parse XML into a Python Dictionary
        parsed_dict = xmltodict.parse(xml_string)
        
        if not parsed_dict:
            raise ValueError("Empty XML Document")
            
        # Get the root element (e.g., MasterAirWaybill, HouseWaybill, etc.)
        root_key = list(parsed_dict.keys())[0]
        data = parsed_dict.get(root_key, {})
        
        # 2. Setup the ONE Record JSON-LD Context and Base Types
        json_ld = {
            "@context": {
                "onr": "https://onerecord.iata.org/ns/cargo#",
                "onr-dg": "https://onerecord.iata.org/ns/dg-extension#"
            },
            "@type": "onr:Waybill",
        }
        
        # 3. Perform Field Mapping via Heuristics
        if "MessageHeader" in data:
            header = data["MessageHeader"]
            if "ID" in header:
                json_ld["onr:waybillNumber"] = header["ID"]
            if "IssuedDate" in header:
                json_ld["onr:issuedDate"] = header["IssuedDate"]
                
        if "Shipment" in data:
            shipment = data["Shipment"]
            shipment_block = {
                "@type": "onr:Shipment"
            }
            
            if "TotalGrossWeight" in shipment:
                # Basic casting assuming standard weights
                shipment_block["onr:totalGrossWeight"] = {
                    "onr:value": float(shipment["TotalGrossWeight"]),
                    "onr:unit": "KGM" 
                }
                
            if "TotalPcs" in shipment:
                shipment_block["onr:totalPieceCount"] = int(shipment["TotalPcs"])
                
            if "Origin" in shipment:
                shipment_block["onr:origin"] = shipment["Origin"]
                
            if "Destination" in shipment:
                shipment_block["onr:destination"] = shipment["Destination"]
                
            # Dangerous Goods Extension Mapping
            if "DangerousGoods" in shipment:
                dg = shipment["DangerousGoods"]
                dg_block = {
                    "@type": "onr-dg:DangerousGoodsDeclaration"
                }
                
                if "UNNumber" in dg:
                    dg_block["onr-dg:unNumber"] = dg["UNNumber"]
                    
                if "DGRCategory" in dg:
                    dg_block["onr-dg:dangerClass"] = dg["DGRCategory"]
                    
                shipment_block["onr:dangerousGoods"] = dg_block
                
            json_ld["onr:shipment"] = shipment_block
            
        return json_ld
        
    except Exception as e:
        # Provide fallback debug info if XML is malformed or unmappable
        return {
            "error": "Failed to parse XML",
            "details": str(e),
            "raw_input_preview": xml_string[:100] + "..." if len(xml_string) > 100 else xml_string
        }
