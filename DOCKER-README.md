# Running a dev environment in docker

### Docker instalation:
- Ubuntu (https://docs.docker.com/install/linux/docker-ce/ubuntu/)
- Windows (https://docs.docker.com/docker-for-windows/install/)
- Mac (https://docs.docker.com/docker-for-mac/install/)
- Debian (https://docs.docker.com/install/linux/docker-ce/debian/)
- Centos (https://docs.docker.com/install/linux/docker-ce/centos/)
- Fedora (https://docs.docker.com/install/linux/docker-ce/fedora/)

## First installation:

#### With docker installed.

* $ git clone https://github.com/Paratii-Video/paratii-portal
* $ cd paratii-portal
* Create a .env with LOCAL_IP=<your_local_ip> provided by:

$ ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1'

* `docker-compose up --build`

Now the portal should be running on port http://localhost:8080.

(and the db on port 3000, and the ethereum node (parity) on 8545)

### Network Issue

**OBS:**

If you change of the network you will need to update the .env(LOCAL_IP) with your new ip after this you need to run:

* `docker-compose up`

## Development

Run `docker-compose up` and develop away!

Everything is working as always, except if you change dependencies in `package.json

In that case, you need to re-run `docker-compose up --build`

### Testing

The tests can be running outside of containers and see from your browser but first you need to **install the dependencies.**

$ npm install

To run unit tests:

    $ npm run unit-test

For run chimp tests:

    $ npm run chimp-test

Or, when you are developing:

    $ npm run chimp-test:watch


### Logs

*It's possible to see the outlog come from the container split by service*

- docker-compose logs -f **name_container**

for example:

- docker-compose logs -f portal
- docker-compose logs -f db
- docker-compose logs -f mongo
- docker-compose logs -f parity
