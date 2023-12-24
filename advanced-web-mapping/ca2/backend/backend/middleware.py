# backend/middleware.py
import logging

class SimpleLoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.logger = logging.getLogger(__name__)

    def __call__(self, request):
        response = self.get_response(request)
        self.logger.debug(f"Request to {request.path} responded with status {response.status_code}")
        return response
