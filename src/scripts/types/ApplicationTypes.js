/* @flow */

import VideoRecord from 'records/VideoRecords'

export type RouteMatch = {
  path: string,
  url: string,
  isExact: boolean,
  params: Object
};

export type Action<T> = {
  type: string,
  payload: T
};

export type RootState = {
  video: ?VideoRecord
};
