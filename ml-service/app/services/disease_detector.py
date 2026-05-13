"""Disease Detection Service using CNN/MobileNetV3"""

import io
import random
from typing import Dict, List, Optional

import httpx
import numpy as np
from PIL import Image

DISEASE_CLASSES = [
    "Rouille du blé",
    "Mildiou de la tomate",
    "Cercosporiose du maïs",
    "Anthracnose du haricot",
    "Mosaïque du manioc",
    "Flétrissement fusarien",
    "Oïdium du concombre",
    "Tache noire du pommier",
    "Rouille du café",
    "Pourriture noire du cacao",
    "Mildiou du raisin",
    "Bactériose du riz",
    "Tache brune de la pomme de terre",
    "Rouille de l'arachide",
    "Charbon du sorgho",
]

DISEASE_RECOMMENDATIONS = {
    "Rouille du blé": "Appliquer un fongicide à base de propiconazole. Éliminer les résidus de culture.",
    "Mildiou de la tomate": "Réduire l'arrosage foliaire. Utiliser du cuivre ou du mancozèbe.",
    "Cercosporiose du maïs": "Rotation des cultures. Fongicide azoxystrobine si sévère.",
    "Anthracnose du haricot": "Semences certifiées. Fongicide chlorothalonil.",
    "Mosaïque du manioc": "Utiliser des boutures saines. Éliminer les plants infectés.",
    "Flétrissement fusarien": "Rotation longue. Améliorer le drainage. Fongicide de sol.",
    "Oïdium du concombre": "Soufre mouillable ou fongicides systémiques.",
    "Tache noire du pommier": "Taille sanitaire. Fongicides cuivriques en hiver.",
    "Rouille du café": "Supprimer les feuilles infectées. Fongicide triazole.",
    "Pourriture noire du cacao": "Bonne aération. Fongicide cuprique.",
    "Mildiou du raisin": "Bouillie bordelaise. Supprimer les feuilles infectées.",
    "Bactériose du riz": "Semences traitées. Éviter les blessures aux plants.",
    "Tache brune de la pomme de terre": "Fongicide mancozèbe. Rotation 3-4 ans.",
    "Rouille de l'arachide": "Fongicide chlorothalonil. Rotation céréales.",
    "Charbon du sorgho": "Semences traitées. Rotation avec légumineuses.",
}


class DiseaseDetector:
    def __init__(self, model_path: Optional[str] = None):
        self.model = None
        self.img_size = (256, 256)
        # TODO: Load TensorFlow model when available
        # if model_path and os.path.exists(model_path):
        #     self.model = tf.keras.models.load_model(model_path)

    def _preprocess(self, image: Image.Image) -> np.ndarray:
        image = image.convert("RGB")
        image = image.resize(self.img_size)
        arr = np.array(image) / 255.0
        return np.expand_dims(arr, axis=0)

    def predict_from_url(self, image_url: str) -> Dict:
        response = httpx.get(image_url, timeout=30)
        response.raise_for_status()
        image = Image.open(io.BytesIO(response.content))
        return self._predict(image)

    def predict_from_bytes(self, image_bytes: bytes) -> Dict:
        image = Image.open(io.BytesIO(image_bytes))
        return self._predict(image)

    def _predict(self, image: Image.Image) -> Dict:
        # Mock prediction until real model is trained
        # In production, this would use the loaded CNN model
        primary_idx = random.randint(0, len(DISEASE_CLASSES) - 1)
        primary_disease = DISEASE_CLASSES[primary_idx]
        confidence = random.uniform(75, 98)

        # Generate top-5 predictions
        top_indices = random.sample(range(len(DISEASE_CLASSES)), 5)
        if primary_idx not in top_indices:
            top_indices[0] = primary_idx

        top_predictions = []
        for idx in top_indices:
            score = random.uniform(60, 95) if idx == primary_idx else random.uniform(5, 40)
            top_predictions.append({
                "disease": DISEASE_CLASSES[idx],
                "confidence": round(score, 2),
            })

        top_predictions.sort(key=lambda x: x["confidence"], reverse=True)

        return {
            "detected_disease": primary_disease,
            "confidence_percent": round(confidence, 2),
            "recommendations": DISEASE_RECOMMENDATIONS.get(
                primary_disease, "Consulter un agronome pour un diagnostic précis."
            ),
            "top_predictions": top_predictions,
        }
