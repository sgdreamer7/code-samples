#!/bin/bash

set -e

while ! (timeout 3 bash -c "</dev/tcp/${POSTGRES_HOST}/${POSTGRES_PORT}") &> /dev/null;
do
    echo waiting for PostgreSQL to start...;
    sleep 3;
done;

python3 manage.py collectstatic --noinput
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver 0.0.0.0:8000
