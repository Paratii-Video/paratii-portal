/* @flow */

import type { VideoInfo } from 'types/ApplicationTypes'

export type SearchResults = {
  hasNext: boolean,
  query: {
    keyword: string
  },
  results: Array<VideoInfo>
}
