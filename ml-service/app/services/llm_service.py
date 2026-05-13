"""LLM Service for agricultural chatbot"""

import os
from typing import Dict, List, Optional

import httpx


class LlmService:
    def __init__(self):
        self.base_url = os.getenv("LLM_BASE_URL", "http://ollama:11434")
        self.api_key = os.getenv("LLM_API_KEY")
        self.model = os.getenv("LLM_MODEL", "llama3.2")
        self.use_ollama = os.getenv("USE_OLLAMA", "true").lower() == "true"

    def chat(self, messages: List[Dict], model: Optional[str] = None,
             temperature: float = 0.7, max_tokens: int = 1024) -> Dict:
        model = model or self.model

        if self.use_ollama:
            return self._chat_ollama(messages, model, temperature)
        else:
            return self._chat_openai_compatible(messages, model, temperature, max_tokens)

    def _chat_ollama(self, messages: List[Dict], model: str, temperature: float) -> Dict:
        try:
            response = httpx.post(
                f"{self.base_url}/api/chat",
                json={
                    "model": model,
                    "messages": messages,
                    "stream": False,
                    "options": {
                        "temperature": temperature,
                    },
                },
                timeout=120,
            )
            response.raise_for_status()
            data = response.json()
            return {
                "content": data["message"]["content"],
                "model": data.get("model", model),
                "usage": {},
            }
        except Exception as e:
            # Fallback response if Ollama is unavailable
            return {
                "content": (
                    "Je suis temporairement indisponible. Voici quelques conseils généraux :\n\n"
                    "1. Surveillez régulièrement vos cultures pour détecter les maladies précocement\n"
                    "2. Adaptez l'irrigation aux besoins réels des plantes\n"
                    "3. Utilisez des engrais organiques pour améliorer la structure du sol\n"
                    "4. Pratiquez la rotation des cultures\n\n"
                    "Pour des conseils personnalisés, veuillez réessayer plus tard."
                ),
                "model": model,
                "usage": {},
            }

    def _chat_openai_compatible(self, messages: List[Dict], model: str,
                                 temperature: float, max_tokens: int) -> Dict:
        headers = {"Content-Type": "application/json"}
        if self.api_key:
            headers["Authorization"] = f"Bearer {self.api_key}"

        response = httpx.post(
            f"{self.base_url}/v1/chat/completions",
            headers=headers,
            json={
                "model": model,
                "messages": messages,
                "temperature": temperature,
                "max_tokens": max_tokens,
            },
            timeout=120,
        )
        response.raise_for_status()
        data = response.json()
        return {
            "content": data["choices"][0]["message"]["content"],
            "model": data.get("model", model),
            "usage": data.get("usage", {}),
        }
