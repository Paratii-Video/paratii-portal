# Running a dev environment in docker


## First installation:

* Install docker
* $ git clone https://github.com/Paratii-Video/paratii-portal
* $ cd paratii-portal
* Create a .env with LOCAL_IP=<your_local_ip> provided by:

$ ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1'

* `docker-compose up --build`

Now the portal should be running on port http://localhost:8080.

(and the db on port 3000, and the ethereum node (parity) on 8545)


## Development

Run `docker-compose up` and develop away!

Everything is working as always, except if you change dependencies in `package.json

In that case, you need to re-run `docker-compose up --build`

### Testing

The tests can be running outside of containers and see from your browser.

To run unit tests:

    $ yarn run unit-test

For run chimp tests:

    $ yarn run chimp-test

Or, when you are developing:

    $ yarn run chimp-test:watch


### Logs

*It's possible to see the outlog come from the container split by service*

- docker-compose logs -f <name of container>

for example:

- docker-compose logs -f portal
- docker-compose logs -f db
- docker-compose logs -f mongo
- docker-compose logs -f parity
