from pathlib import Path
from django.contrib.gis.utils import LayerMapping
from assignment1.models import PineMartens
import os

os.environ['DJANGO_SETTINGS_MODULE'] = 'geodjango.settings'


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

world_shp = Path(__file__).resolve().parent / "data" / "AR1719_1357_point_distribution.shp"


def run(verbose=True):
    lm = LayerMapping(PineMartens, world_shp, mapping, transform=False)
    lm.save(strict=True, verbose=verbose)