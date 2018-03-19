# DOCKER

## Prerequisites:
- Docker
- Git paratii-portal repository cloned
- Create a .env with LOCAL_IP=<your_local_ip> provided by ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1'

### Docker instalation:

- Ubuntu (https://docs.docker.com/install/linux/docker-ce/ubuntu/)
- Windows (https://docs.docker.com/docker-for-windows/install/)
- Mac (https://docs.docker.com/docker-for-mac/install/)
- Debian (https://docs.docker.com/install/linux/docker-ce/debian/)
- Centos (https://docs.docker.com/install/linux/docker-ce/centos/)
- Fedora (https://docs.docker.com/install/linux/docker-ce/fedora/)


### Paratii-portal repository:

- https://github.com/Paratii-Video/paratii-portal.git

## Development:

### First time:

*It's necessary because the docker needs to build the image for initialize the container.*

- docker-compose up --build

### After your first build:

- docker-compose up


### Logs

*It's possible to see the outlog come from the container split by service*

- docker-compose logs -f <name of container>

for example:

- docker-compose logs -f portal
- docker-compose logs -f db
- docker-compose logs -f mongo
- docker-compose logs -f parity
