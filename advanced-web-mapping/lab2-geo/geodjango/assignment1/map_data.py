from django.contrib.gis.utils import LayerMapping
from .models import PointDistribution  # Import your model

mapping = {
    'OBJECTID': 'OBJECTID',
    'TAXON_LATI': 'TAXON_LATI',
    'SAMPLE_SPA': 'SAMPLE_SPA',
    'SURVEY_NAM': 'SURVEY_NAM',
    'SAMPLE_YEA': 'SAMPLE_YEA',
    'DatasetTit': 'DatasetTit',
    'StartDate': 'StartDate',
    'EndDate': 'EndDate',
    'SiteName': 'SiteName',
    'GridReference': 'GridReference',
    'Source': 'Source',
    'RecordDate': 'RecordDate',
    'x_coord_IG': 'x_coord_IG',
    'y_coord_IG': 'y_coord_IG',
    'Input_file': 'Input_file',
    'geometry': 'POINT',
}
