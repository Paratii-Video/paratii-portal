<img src="https://github.com/Paratii-Video/paratiisite/blob/master/rebrand/src/svgs/paratii-logo.svg" width="200"> 

# paratii-portal
A modular web-interface for uploading content into the peer-to-peer network behind Paratii, and to browse or organize it. It's purpose is to **1)** help populate Paratii's registries with real world data and files from creators; **2)** expose widgets and forms of interaction with the paratii-library that other developers can leverage, or platform owners can implement; **3)** battletest distributed curation concepts, whenever mature for account management. First iteration will randomize account info. and focus on the experience of uploading videos.

## Prerequisites

* nodejs >= 8.9.0
* yarn
* Install [parity](https://github.com/paritytech/parity) (ethereum client):
    * ```$ bash <(curl https://get.parity.io -Lk)```

If you are on a Mac, you may need to set the path to parity:

    * add the following to your `.bash_profile`: `export PATH=/Applications/Parity\ Ethereum.app/Contents/MacOS:$PATH`
    * ``` $ source path/to/.bash_profile```



## Installing

    $ git clone https://github.com/Paratii-Video/paratii-portal
    $ cd paratii-portal
    $ yarn install


## Testing

To run unit tests:

    $ yarn run unit-test

End-to-end tests that can be run by starting up the application in one window:

    $ yarn run dev

And running the tests in another window:

    $ yarn run chimp-test

Or, when you are developing:

    $ yarn run chimp-test:watch


## Development

    $ yarn run dev

This does two things, concurrently:

* boots a simple express server listening on port `8080` that will serve up `index.html` on all routes.
* kicks off `webpack` build

Both processes recompile/restart on relevant file changes. In addition, the dev server is set up to support hot-module-replacement for `react` and `redux`.

To also run the `parity` ethereum client concurrently, instead run:

    $ yarn run dev-parity


## Embed Sever

The embedded player client code will be bundled with the commands shown above.

To boot up the server:

    $ yarn run start-embed

Or, to restart the server on changes:

    $ yarn run start-embed:dev


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
