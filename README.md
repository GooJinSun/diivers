# Diivers

[![Build Status](https://travis-ci.org/swsnu/swpp2020-team8.svg?branch=master)](https://travis-ci.org/swsnu/swpp2020-team8)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swpp2020-team8&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swpp2020-team8)
[![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2020-team8/badge.svg?branch=master)](https://coveralls.io/github/swsnu/swpp2020-team8?branch=master)

## Frontend

### 환경변수 세팅
- `frontend/.env`에 FCM 관련 환경변수를 세팅해줍니다


### Run
```
cd frontend
yarn install
yarn start
```

### Test
```
yarn test --coverage --watchAll=false
```

## Backend
### 환경변수 세팅
- 파이썬 환경변수: `SECRET_KEY`, `DB_PASSWORD`, `EMAIL_HOST_PASSWORD`를 포함한 환경변수를 `.zshrc` `.bashrc` 혹은 `.bash_profile`에 세팅
- fcm 관련 환경변수: `backend/adoorback/adoorback/serviceAccountKey.json`


### Run
```
cd backend/adoorback
pip install -r requirements.txt

rm -f tmp.db adoorback/db.sqlite3
python manage.py makemigrations account feed comment like notification user_report content_report
python manage.py migrate

# for seed data
python manage.py shell
from adoorback.test.seed import set_seed
set_seed(20)
exit()

python manage.py runserver
```

```
psycopg2==2.8.6
django-mysql==3.9.0
```
psycopg2, mysqlclient, python-dev
이 세 가지는 requirements.txt에서 제거하고 설치해도 됩니당


### Test

```
rm -f tmp.db db.sqlite3

pylint **/*.py --load-plugins pylint_django

python manage.py makemigrations account feed comment like notification user_report content_report
python manage.py migrate

coverage run --source='.' --omit='*/migrations/*','adoorback/*','feed/algorithms/*','feed/cron.py','account/cron.py','locustfile.py','manage.py','*/wsgi.py','*/asgi.py','*/utils/*' ./manage.py test
coverage run --source='.' --branch --omit='*/migrations/*','adoorback/*','feed/algorithms/*','feed/cron.py','account/cron.py','locustfile.py','manage.py','*/wsgi.py','*/asgi.py','*/utils/*' ./manage.py test

coverage report -m

# 특정 모델만 테스트
coverage run --source='.' --omit='*/migrations/*','adoorback/*','feed/algorithms/*','feed/cron.py','account/cron.py','locustfile.py','manage.py','*/wsgi.py','*/asgi.py','*/utils/*' ./manage.py test [model_name]
coverage run --source='.' --branch --omit='*/migrations/*','adoorback/*','feed/algorithms/*','feed/cron.py','account/cron.py','locustfile.py','manage.py','*/wsgi.py','*/asgi.py','*/utils/*' ./manage.py test [model_name]
coverage report -m
```
