FROM python:3.5

ENV PYTHONUNBUFFERED 1

RUN mkdir /api
WORKDIR /api

ADD requirements.txt /api/

RUN pip install -r requirements.txt

ADD . /api/

RUN python ./manage.py collectstatic --traceback --noinput
EXPOSE 8000

CMD ["./start.sh"]
