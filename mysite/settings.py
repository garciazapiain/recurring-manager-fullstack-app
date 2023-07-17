"""
Django settings for mysite project.

Generated by 'django-admin startproject' using Django 3.2.16.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""


import os
# from dotenv import load_dotenv
from pathlib import Path
import whitenoise

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
# load_dotenv(os.path.join(BASE_DIR, ".env"))
# SECRET_KEY = os.getenv("SECRET_KEY")


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-x$53m^zm*)t4mskm301o$yezxz@#eoh-j)(qg=inpkulv153xw'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# SESSION_COOKIE_SECURE = True

# if DEBUG:
#     CSRF_COOKIE_SECURE = False
#     SESSION_COOKIE_SECURE = False

ALLOWED_HOSTS = ['127.0.0.1','recurring-manager-app.herokuapp.com', '39dfacfc1c72.ngrok.app']

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'product',
    'corsheaders',
    'rest_framework',
    'frontend'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'mysite.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['frontend/build', 'registration'],
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

WSGI_APPLICATION = 'mysite.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

from decouple import config
import dj_database_url

DATABASES = {
    'default': dj_database_url.config(default=config('DATABASE_URL'))
}

# DATABASE_URL = os.getenv("DATABASE_URL")

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

# DATABASES = {"default": dj_database_url.config()}

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

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


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ORIGIN_WHITELIST = [
    'http://localhost:3000','http://recurring-manager-app.herokuapp.com', 'http://127.0.0.1:8000'
]

CSRF_TRUSTED_ORIGINS = ['https://39dfacfc1c72.ngrok.app', 'http://localhost:3000', 'http://127.0.0.1:8000']

CORS_ALLOWED_ORIGINS = CORS_ORIGIN_WHITELIST

# CORS_ALLOW_CREDENTIALS = True

# SESSION_COOKIE_SAMESITE = 'None'

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = "/static/"
STATICFILES_DIRS = [
    BASE_DIR / "frontend" / "build" / "static",
]
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    )
}

MIME_TYPES = {
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.woff': 'application/font-woff',
    '.woff2': 'application/font-woff2',
    '.eot': 'application/vnd.ms-fontobject',
    '.ttf': 'application/font-sfnt',
}

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# WHITENOISE_MIMETYPES = {
#     **whitenoise.storage.CompressedManifestStaticFilesStorage.default_mimetypes,
#     **MIME_TYPES,
# }

LOGIN_URL = '/login/'
LOGOUT_URL = 'logout'
LOGIN_REDIRECT_URL = '/home/'
LOGOUT_REDIRECT_URL = '/login/'

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    # Additional authentication backends if any
]

REACT_APP_API_BASE_URL = os.getenv('REACT_APP_API_BASE_URL', 'https://recurring-manager-app.herokuapp.com/')
NODE_ENV = os.getenv('NODE_ENV', 'development')