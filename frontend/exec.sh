#!/usr/bin/env bash

docker build -t unassigned-frontend
docker run -p 3000:3000 --init unassigned-frontend