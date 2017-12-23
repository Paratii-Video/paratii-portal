# paratii-portal

![](./src/assets/img/paratii_logo.png)

## Installing

    $ yarn

## Testing

    $ yarn test

## Development

    $ yarn run dev 

This does two things, concurrently:

* boots a simple express server listening on port `8080` that will serve up `index.html` on all routes.
* kicks off `webpack` build

Both processes recompile/restart on relevant file changes. In addition, the dev server is set up to support hot-module-replacement for `react` and `redux`.

## Code Quality

### eslint

    $ yarn run lint:scripts

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