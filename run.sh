#!/bin/bash
if [ ! "$(docker ps -a -q -f name=nidguay_app_frontend)" ]; then
    docker-compose up -d
else
    docker-compose up -d --build
fi