"""
Django settings for geodjango project.

Generated by 'django-admin startproject' using Django 4.2.5.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path
import os
import socket


os.environ['PROJ_LIB'] = 'b:\\anaconda\\envs\\milo_is_gay\\Library\\share\\proj'
os.environ['GDAL_DATA'] = f"{os.environ.get('CONDA_PREFIX','')}/share"



<<<<<<< HEAD
# CORS_ALLOW_ALL_ORIGINS = False
=======
CORS_ALLOW_ALL_ORIGINS = False
>>>>>>> 0130e62667ecc81662a9b993e1e9f060a744c636

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
STATIC_ROOT = os.path.join(BASE_DIR, "static")
STATIC_URL = "/static/"




# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/


with open(f'{BASE_DIR}/secret_key.txt') as f:
   SECRET_KEY = f.read().strip()


# SECURITY WARNING: don't run with debug turned on in production!
<<<<<<< HEAD
DEBUG = True

#ALLOWED_HOSTS = ['blah.today', '40.113.49.212']

ALLOWED_HOSTS = []
=======
DEBUG = False

#ALLOWED_HOSTS = ['blah.today', '40.113.49.212']

ALLOWED_HOSTS = ['127.0.0.1', 'localhost']
>>>>>>> 0130e62667ecc81662a9b993e1e9f060a744c636

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.gis',
    'rest_framework',
    # 'corsheaders',
    'assignment1',
    'widget_tweaks',
    'rest_framework'
 
]

LEAFLET_CONFIG = {
    # "SPATIAL_EXTENT": (5.0, 44.0, 7.5, 46),
    "DEFAULT_CENTER": (13.3888599, 52.5170365), #set your corordinate to reference to a solid place (the above coordinates places you somewhere on the sea in the middle east )
    "DEFAULT_ZOOM": 16,
    "MIN_ZOOM": 3,
    "MAX_ZOOM": 20,
    "DEFAULT_PRECISION": 6,
    "SCALE": "both",
    "ATTRIBUTION_PREFIX": "powered by <Your corporate name>",
}
CRISPY_TEMPLATE_PACK= 'bootstrap4'
CRISPY_FAIL_SILENTLY = not DEBUG

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    # 'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    "whitenoise.middleware.WhiteNoiseMiddleware",
]

ROOT_URLCONF = 'geodjango.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'geodjango.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': 'gis',             # Make sure this is the correct database name you have set up
        'USER': 'docker',
        'PASSWORD': 'docker',
        'HOST': 'localhost',    # localhost  my-fyp wmap_postgis
        'PORT': '25432',
    }
}

DATABASES["default"]["PORT"] = 25432



CSRF_TRUSTED_ORIGINS = ['https://*.blah.today','https://*.40.113.49.212']


# Set DEPLOY_SECURE based on environment variable, defaulting to False if not set
DEPLOY_SECURE = os.environ.get('DEPLOY_SECURE', 'False').lower() == 'True'

if DEPLOY_SECURE:
    DEBUG = True
    TEMPLATES[0]["OPTIONS"]["debug"] = True
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True
else:
    DEBUG = True
    TEMPLATES[0]["OPTIONS"]["debug"] = True
    ALLOWED_HOSTS = ['*', ]
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
        'simple': {
            'format': '{levelname} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'C:/Users/Jade Higgins/OneDrive - Technological University Dublin/4th-year-2023/awm-github/Advanced-Web/advanced-web-mapping/lab2-geo/geodjango/geodjango/logs/django.log',
            'formatter': 'verbose',
        }
        # 'console': {
        #     'class': 'logging.StreamHandler',
        #     'formatter': 'simple',
        # },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],  # Removed 'console' from this list
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}



# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / "staticfiles"

# this can redirect the user to a new page 
<<<<<<< HEAD
#LOGIN_REDIRECT_URL = "/assignment1/pine-martens"
=======
# LOGIN_REDIRECT_URL = "/assignment1/pine-martens"
# LOGIN_URL = '/assignment1/login/'

>>>>>>> 0130e62667ecc81662a9b993e1e9f060a744c636

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
