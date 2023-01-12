#!/bin/bash
if [ ! "$(docker ps -a -q -f name=nidguay_app_frontend)" ]; then
    if [ "$(docker ps -aq -f status=exited -f name=nidguay_app_frontend)" ]; then
        # cleanup
        docker-compose up -d --build
    fi
    # run your container
    docker-compose up -d
fi