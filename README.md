# paratii-portal

![](./src/assets/img/paratii_logo.png)

## Installing

    $ yarn

## Testing

    $ yarn test

## Development

    $ yarn dev

This does two things, concurrently:

* boots a simple express server listening on port `8080` that will serve up `index.html` on all routes.
* kicks off `webpack` build

Both processes recompile/restart on relevant file changes. In addition, the dev server is set up to support hot-module-replacement for `react` and `redux`.

## Code Quality

### eslint

    $ yarn lint:scripts

If you want the linter to try to fix errors automatically, you can run:

    $ yarn lint:scripts --fix

### stylelint

    $ yarn lint:styles

_Note: this is used for linting styles written in javascript strings for `styled-components`_

### flow

    $ yarn flow


### Run all checks in sequence

    $ yarn quality

## Build for Production

    $ yarn build

After this command completes, `index.html` and `bundle.js` will both reside in the `build/` directory.
