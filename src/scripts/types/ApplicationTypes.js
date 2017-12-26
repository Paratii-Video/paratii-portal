/* @flow */

export type RouteMatch = {
  match: {
    path: string,
    url: string,
    isExact: boolean,
    params: Object
  }
};
