# Running a dev environment in docker


## First installation:

* Install docker
* $ git clone https://github.com/Paratii-Video/paratii-portal
* $ cd paratii-portal
* `docker-compose up --build`

Now the portal should be running on port http://localhost:8080.

(and the db on port 3000, and the ethereum node (parity) on 8545)


## Development

Run `docker-compose up` and develop away!


Everything is working as always, except if you change dependencies in `package.json

In that case, you need to re-run `docker-compose up --build`
