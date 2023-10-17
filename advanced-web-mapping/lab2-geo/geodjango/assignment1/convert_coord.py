from django.contrib.gis.gdal import SpatialReference, CoordTransform
from django.contrib.gis.geos import Point
from .models import PineMartens

def transform_coordinates():
    # Define the source and target spatial reference systems
    source_srs = SpatialReference(29902)  # Replace with your source SRS code
    target_srs = SpatialReference(4326)  # WGS 84
    ct = CoordTransform(source_srs, target_srs)

    # Fetch all objects
    for obj in PineMartens.objects.all():
        # Create a GEOS geometry point
        point = Point(float(obj.x_coord_IG), float(obj.y_coord_IG))
        
        # Transform the point
        point.transform(ct)

        # Update the latitude and longitude fields
        obj.latitude = point.y  # Latitude
        obj.longitude = point.x  # Longitude

        obj.save()

# Call the function
transform_coordinates()
