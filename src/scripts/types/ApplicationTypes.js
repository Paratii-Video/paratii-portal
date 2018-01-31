/* @flow */

import VideoRecord from 'records/VideoRecords'
import UserRecord from 'records/UserRecords'
import UploadRecord from 'records/UploadRecords'

export type RouteMatch = {
  path: string,
  url: string,
  isExact: boolean,
  params: Object
}

export type Location = {
  pathname: string,
  search: string,
  state: Object
}

export type AsyncTaskStatusName = 'idle' | 'running' | 'success' | 'error'

export type VideoInfo = {
  title: ?string,
  description: ?string
}

export type Action<T> = {
  type: string,
  payload: T
}

export type RootState = {
  selectedVideo: ?VideoRecord,
  user: ?UserRecord,
  uploads: UploadRecord
}

export type ParatiiLibConfig = {
  provider: string
}

// TODO move this into paratii-lib repo
export type ParatiiLib = {
  config: {
    account: {
      address: string,
      privateKey: string
    }
  },
  core: {
    vids: {
      get: (id: string) => ?Object,
      create: Object => Object
    }
  },
  eth: {
    wallet: {
      decrypt: (string, password: string) => Object,
      encrypt: (password: string) => Object,
      // newMnemonic: () => string,
      getMnemonic: () => string,
      create: () => Object
    },
    vids: {
      get: (id: string) => ?Object,
      makeId: () => string
    }
  },
  ipfs: {
    uploader: {
      add: Object => Object
    }
  }
}
