#!/bin/bash

# erase .env
echo -n "" > .env

# collect local ip

echo "$(echo 'LOCAL_IP=')$(ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1')" >> .env

# start docker
docker-compose up --build
