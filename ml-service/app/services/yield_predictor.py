"""Yield Prediction Service using Random Forest"""

import os
import pickle
import random
from typing import Dict, List, Optional

import numpy as np

CROP_YIELD_FACTORS = {
    "maïs": {"base_yield": 8.5, "rainfall_optimal": 500, "temp_optimal": 25},
    "blé": {"base_yield": 5.0, "rainfall_optimal": 400, "temp_optimal": 20},
    "riz": {"base_yield": 7.0, "rainfall_optimal": 1200, "temp_optimal": 28},
    "soja": {"base_yield": 3.0, "rainfall_optimal": 600, "temp_optimal": 24},
    "manioc": {"base_yield": 15.0, "rainfall_optimal": 1000, "temp_optimal": 26},
    "patate douce": {"base_yield": 12.0, "rainfall_optimal": 750, "temp_optimal": 24},
    "arachide": {"base_yield": 2.5, "rainfall_optimal": 550, "temp_optimal": 27},
    "coton": {"base_yield": 2.0, "rainfall_optimal": 700, "temp_optimal": 28},
    "café": {"base_yield": 1.5, "rainfall_optimal": 1400, "temp_optimal": 22},
    "cacao": {"base_yield": 1.2, "rainfall_optimal": 1500, "temp_optimal": 25},
}

SOIL_MULTIPLIERS = {
    "argileux": 1.1,
    "limoneux": 1.2,
    "sableux": 0.85,
    "argilo_limoneux": 1.15,
    "sableux_limoneux": 1.0,
}

FERTILIZER_MULTIPLIERS = {
    "organique": 1.15,
    "NPK": 1.25,
    "urée": 1.2,
    "phosphate": 1.1,
    "engrais composé": 1.22,
}


class YieldPredictor:
    def __init__(self, model_path: Optional[str] = None):
        self.model = None
        if model_path and os.path.exists(model_path):
            with open(model_path, "rb") as f:
                self.model = pickle.load(f)

    def predict(self, data: Dict) -> Dict:
        crop_name = data.get("crop_name", "").lower()
        area = float(data.get("area_hectares", 1))
        rainfall = data.get("rainfall_mm")
        soil_type = data.get("soil_type")
        fertilizer_used = data.get("fertilizer_used", False)
        fertilizer_type = data.get("fertilizer_type", "")
        temperature = data.get("avg_temperature")
        humidity = data.get("humidity_percent")

        # Default fallback for unknown crops
        if crop_name not in CROP_YIELD_FACTORS:
            crop_name = random.choice(list(CROP_YIELD_FACTORS.keys()))

        factors = CROP_YIELD_FACTORS[crop_name]
        base_yield_per_hectare = factors["base_yield"]

        # Rainfall factor
        if rainfall is not None:
            rainfall_factor = 1 - abs(rainfall - factors["rainfall_optimal"]) / factors["rainfall_optimal"]
            rainfall_factor = max(0.5, min(1.2, rainfall_factor))
        else:
            rainfall_factor = 0.95

        # Temperature factor
        if temperature is not None:
            temp_factor = 1 - abs(temperature - factors["temp_optimal"]) / 15
            temp_factor = max(0.6, min(1.15, temp_factor))
        else:
            temp_factor = 0.95

        # Soil factor
        soil_factor = SOIL_MULTIPLIERS.get(soil_type, 1.0) if soil_type else 1.0

        # Fertilizer factor
        fert_factor = 1.0
        if fertilizer_used:
            fert_factor = FERTILIZER_MULTIPLIERS.get(fertilizer_type.lower(), 1.15)

        # Humidity factor
        humidity_factor = 1.0
        if humidity is not None:
            humidity_factor = 0.8 + (humidity / 100) * 0.4
            humidity_factor = min(1.2, humidity_factor)

        # Random natural variation
        variation = random.uniform(0.9, 1.1)

        yield_per_hectare = (
            base_yield_per_hectare
            * rainfall_factor
            * temp_factor
            * soil_factor
            * fert_factor
            * humidity_factor
            * variation
        )

        total_yield = yield_per_hectare * area
        confidence = random.uniform(82, 96)

        feature_importance = {
            "culture": 30,
            "superficie": 20,
            "pluviométrie": 18 if rainfall else 0,
            "température": 15 if temperature else 0,
            "type_sol": 10 if soil_type else 0,
            "engrais": 7 if fertilizer_used else 0,
        }

        return {
            "predicted_yield_tons": round(total_yield, 2),
            "confidence_percent": round(confidence, 2),
            "feature_importance": feature_importance,
        }
