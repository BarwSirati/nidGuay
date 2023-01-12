#!/bin/bash
if [ $( docker ps -a | grep nidguay_app_frontend | wc -l ) -gt 0 ]; then
  docker-compose up -d --build
else
  docker-compose up -d
fi