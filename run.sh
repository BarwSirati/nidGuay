#!/bin/bash
pm2 describe frontend > /dev/null
RUNNING=$?

if [ "${RUNNING}" -ne 0 ]; then
  pm2 start yarn --name frontend -- start
else
  pm2 restart frontend
fi;