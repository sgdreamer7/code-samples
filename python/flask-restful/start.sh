#!/bin/bash

set -e

while ! (timeout 3 bash -c "</dev/tcp/${POSTGRES_HOST}/${POSTGRES_PORT}") &> /dev/null;
do
    echo waiting for PostgreSQL to start...;
    sleep 3;
done;

python3 migrate.py db init
python3 migrate.py db migrate
python3 migrate.py db upgrade
python3 run.py --host=0.0.0.0 --port=8000
