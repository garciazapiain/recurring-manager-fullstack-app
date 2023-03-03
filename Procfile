web: gunicorn mysite.wsgi --log-file -
release: python manage.py migrate
frontend: cd frontend && npm install && npm start
static: cd frontend && serve -s build