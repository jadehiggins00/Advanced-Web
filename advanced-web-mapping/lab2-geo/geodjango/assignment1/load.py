from pathlib import Path
from django.contrib.gis.utils import LayerMapping
from .models import PineMartens
import os


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
    'GridRefere': 'GridRefere',  # Corrected the key from 'Grid_Ref' to match the model's field
    'Source': 'Source',
    'RecordDate': 'RecordDate',
    'x_coord_IG': 'x_coord_IG',
    'y_coord_IG': 'y_coord_IG',
    'Input_file': 'Input_file',
    'Source_file': 'Source_',  # Corrected the key to match the shapefile column based on previous output
    'geometry': 'POINT',
}


world_shp = Path(__file__).resolve().parent / "data" / "AR1719_1357_point_distribution.shp"


def run(verbose=True):
    lm = LayerMapping(PineMartens, world_shp, mapping, transform=False)
    lm.save(strict=True, verbose=verbose)