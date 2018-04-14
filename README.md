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
* ZONE: list of zones to update, ex: domain1.io, domain2.com
* IGNORED_DNS_NAME: list of **A** records to be ignored, ex: ds.domain1.io, test.domain2.io

### run docker

```shell
docker-compose up -d
```
