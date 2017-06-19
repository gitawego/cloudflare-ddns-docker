# Docker Container for using Cloudflare as a Dynamic DNS Provider

## Using this image

### build first

```shell
docker-compose build
```

### modify variables in docker-compose

* EMAIL: your cloudflare email
* API_KEY: your global api key found in [account setting](https://www.cloudflare.com/a/account/my-account)
* UPDATE_TIME: interval time, it's in minute.

### run docker

```shell
docker-compose up -d
```
