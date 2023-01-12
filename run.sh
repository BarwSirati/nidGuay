#!/bin/bash
if [ ! "$(docker ps -a -q -f name=nextjs)" ]; then
    if [ "$(docker ps -aq -f status=exited -f name=nextjs)" ]; then
        # cleanup
        docker-compose up -d --build
    fi
    # run your container
    docker-compose up -d
fi