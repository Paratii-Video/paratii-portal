# paratii-portal

![](./src/assets/img/paratii_logo.png)

## Prerequisites

* node >= 8.9.0
* Install [parity](https://github.com/paritytech/parity) (ethereum client):
    ```shell
        bash <(curl https://get.parity.io -Lk)
    ```


## Installing

    $ npm i


## Testing

To run unit tests:

    $ npm run unit-test

End-to-end tests that can be run by starting up the application in one window:

    $ npm run dev

And running the tests in another window:

    $ npm run chimp-test

Or, when you are developing:

    $ npm run chimp-test:watch


## Development

    $ npm run dev

This does two things, concurrently:

* boots a simple express server listening on port `8080` that will serve up `index.html` on all routes.
* kicks off `webpack` build

Both processes recompile/restart on relevant file changes. In addition, the dev server is set up to support hot-module-replacement for `react` and `redux`.

To also run the `parity` ethereum client concurrently, instead run:

    $ npm run dev-parity

## Code Quality

### eslint

    $ npm run lint:scripts

If you want the linter to try to fix errors automatically, you can run:

    $ npm run lint:scripts --fix

### stylelint

    $ npm run lint:styles

_Note: this is used for linting styles written in javascript strings for `styled-components`_

### flow

    $ npm run flow


### Run all checks in sequence

    $ npm run quality

## Build for Production

    $ npm run build

After this command completes, `index.html` and `bundle.js` will both reside in the `build/` directory.
