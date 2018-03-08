<img src="https://github.com/Paratii-Video/paratiisite/blob/master/public/svgs/paratii-logo.svg" width="200">

# paratii-portal
A modular web-interface for uploading content into the peer-to-peer network behind Paratii, and to browse or organize it. It's purpose is to **1)** help populate Paratii's registries with real world data and files from creators; **2)** expose widgets and forms of interaction with the paratii-library that other developers can leverage, or platform owners can implement; **3)** battletest distributed curation concepts, whenever mature for account management. First iteration will randomize account info. and focus on the experience of uploading videos.

## Prerequisites

* nodejs >= 8.9.0
* yarn
* libssl1.1 (required by parity >= 1.8.7)
* parity >= 1.9
* Install [parity](https://github.com/paritytech/parity) (ethereum client):
   * `bash <(curl https://get.parity.io -Lk)`

If you are on a Mac, you may need to set the path to parity:

* add the following to your `.bash_profile: export PATH=/Applications/Parity\ Ethereum.app/Contents/MacOS:$PATH`
* `$ source path/to/.bash_profile`



## Installing

    $ git clone https://github.com/Paratii-Video/paratii-portal
    $ cd paratii-portal
    $ yarn install

### Workaround for web3 bug [perhaps not needed anymore]

Currently, instead of using `yarn` to install dependencies the following steps must be taken:

    $ npm install

## Testing

To run unit tests:

    $ yarn run unit-test


End-to-end tests that can be run by starting up the application in one window. The procedure at the moment is rather complex, but we are working on simplifying the dev environment.

First of all, you need to install `paratii-db` on your system.

You will need 4 different consoles, and you need to start the processes in the exact order given here:


1. `yarn run parity`
2. `yarn run build:dev`
3. `yarn run server:dev`
4. In the directory where you installed paratii-db, run `yarn run dev`

When all these process are are running, y
the application should be available on `http://localhost:8080/`

Open yet another console to run the tests:

    $ yarn run chimp-test

Or, when you are developing:

    $ yarn run chimp-test:watch


## Development

    $ yarn run dev

This does three things, concurrently:

* boots up the server
* bundles client code with webpack
* boots up `parity`

The client and server will recompile/restart on relevant file changes. In addition, the dev server is set up to support hot-module-replacement for `react` and `redux`.

To run these processes separately:

`$ yarn run build:dev`

`$ yarn run server:dev`

`$ yarn run parity`

The application can be visited at `http://localhost:8080`


## Code Quality

### eslint

    $ yarn run lint:scripts

If you want the linter to try to fix errors automatically, you can run:

    $ yarn run lint:scripts --fix

### stylelint

    $ yarn run lint:styles

_Note: this is used for linting styles written in javascript strings for `styled-components`_

### flow

    $ yarn run flow


### Run all checks in sequence

    $ yarn run quality

## Build for Production

    $ yarn run build

After this command completes, `index.html` and `bundle.js` will both reside in the `build/` directory.


# Troubleshooting


If you get the following error:

    [1] Module build failed: Error: ENOENT: no such file or directory, scandir '.../paratii-portal/node_modules/node-sass/vendor'

Rebuilding `node-sass` may help:

    yarn rebild node-sass

If npm install doesn't work, maybe it's because you have a node version > 9.0.0
To fix it downgrade node to version 8.9.0:

   $ sudo npm cache clean -f
   $ sudo npm install -g n
   $ sudo n 8.9.0

Then run npm install again.

If you get the following error:

   [1] [nodemon] Internal watch failed: watch .../paratii-portal/node_modules ENOSPC

Run the following code to install nodemon globally and fix the port issue

    $ npm install -g nodemon
    $ echo fs.inotify.max_user_watches=582222 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p