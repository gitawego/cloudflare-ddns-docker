#!/usr/bin/env bash

read -p "going to build image, press [Enter] to continue"

docker build . -f ./docker/raspberry-pi/Dockerfile -t cloudflare-ddns-docker-rpi

docker tag cloudflare-ddns-docker-rpi ichainml/cloudflare-ddns-docker:rpi-latest

read -p "now push to docker, press [Enter] to continue"
docker push ichainml/cloudflare-ddns-docker:rpi-latest
