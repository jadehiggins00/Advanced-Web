import json
from decimal import Decimal
from django.contrib.gis.geos import Point
from datetime import date

class GeoJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Point):
            return {'type': 'Point', 'coordinates': [obj.x, obj.y]}
        elif isinstance(obj, Decimal):
            return float(obj)  # or str(obj) for string representation
        elif isinstance(obj, date):
            return obj.isoformat()  # Convert date to ISO 8601 string format
        return json.JSONEncoder.default(self, obj)
