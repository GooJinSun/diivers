#!/bin/bash

cd ../backend/adoorback
rm -f tmp.db adoorback/db.sqlite3
rm -r */migrations
pip3.7 install -r requirements.txt

python3.7 manage.py makemigrations
python3.7 manage.py migrate

# for seed data (optional)
python3.7 manage.py shell -c "from adoorback.test.seed import set_seed; set_seed(20)"

python3.7 manage.py runserver