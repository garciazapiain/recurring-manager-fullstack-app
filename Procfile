web: gunicorn mysite.wsgi --log-file -
release: python manage.py migrate
frontend: cd frontend && npm install && npm run build
static: cd frontend && serve -s build
