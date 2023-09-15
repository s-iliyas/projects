FROM python:3.9-alpine
# Sets an environmental variable that ensures output from python is sent straight to the terminal without buffering it first
ENV PYTHONUNBUFFERED 1
RUN pip install --upgrade pip
# Sets the container's working directory to /app
WORKDIR /app
# Copies all files from our local project into the container
COPY . /app/
# runs the pip install command for all packages listed in the requirements.txt file
RUN apk update && apk add python3-dev gcc libffi-dev libc-dev
RUN pip install -r requirements.txt 

RUN python3 manage.py makemigrations
RUN python3 manage.py migrate
# ENTRYPOINT [ "sh" , "entrypoint.sh" ]
EXPOSE 8000