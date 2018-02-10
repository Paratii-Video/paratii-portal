/* @flow */

import Immutable from 'immutable'

import VideoRecord from 'records/VideoRecords'
import UserRecord from 'records/UserRecords'
import PlayerRecord from 'records/PlayerRecords'
import { REQUEST_STATUS } from 'constants/ApplicationConstants'

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

export type VideoRecordMap = Immutable.Map<string, VideoRecord>

export type RootState = {
  selectedVideo: ?string,
  user: UserRecord,
  videos: VideoRecordMap,
  player: PlayerRecord
}

type _ThunkAction<R> = (dispatch: Dispatch, getState?: () => RootState) => R
type ThunkAction = _ThunkAction<any>
export type Dispatch = (action: Action<*> | ThunkAction) => any

export type ParatiiLibConfig = {
  provider: string
}

type EventEmitter = {
  on: (eventType: string, callback: (e: Object) => void) => void
}

// TODO move this into paratii-mediaplayer repo
type ClapprCore = EventEmitter & {}

export type ClapprPlayer = EventEmitter & {
  core: {
    getCurrentPlayback: () => ClapprCore
  },
  play: () => void
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
      create: Object => Object,
      update: (id: string, Object) => Object
    }
  },
  eth: {
    wallet: {
      decrypt: (string, password: string) => Object,
      encrypt: (password: string) => Object,
      // newMnemonic: () => string,
      getMnemonic: () => Promise<string>,
      create: () => Object,
      clear: () => void
    },
    vids: {
      get: (id: string) => ?Object,
      makeId: () => string
    },
    setAccount: (string, string) => ?Object,
    balanceOf: (address: string, token: ?string) => Promise<Object>,
    web3: {
      utils: {
        fromWei: (value: number, toUnit: ?string) => string
      }
    }
  },
  ipfs: {
    uploader: {
      add: Object => Object,
      transcode: (string, Object) => Object
    }
  }
}

type Animation = {
  ease: {
    smooth: string
  },
  time: {
    repaint: string
  },
  opacity: {
    hover: number,
    disabled: number
  }
}

type Typography = {
  family: string,
  weight: {
    regular: number,
    bold: number
  },
  button: {
    size: {
      main: string
    }
  },
  text: {
    big: string,
    main: string,
    small: string
  }
}

type Sizes = {
  mainHeader: {
    height: string
  },
  mainFooter: {
    height: string
  },
  mainHeaderLogo: {
    height: string,
    width: string
  },
  searchInputButton: string,
  mainInput: {
    height: string
  }
}

type Colors = {
  body: {
    background: string,
    color: string
  },
  header: {
    background: string,
    iconsFill: string,
    logoFill: string
  },
  footer: {
    background: string,
    color: string,
    logoFill: string
  },
  button: {
    white: string,
    gray: string,
    purple: string
  },
  mainInput: {
    border: string,
    color: string,
    placeholder: string,
    error: string
  },
  FilesUploader: {
    drag: {
      background: string,
      color: string,
      color2: string,
      info: string,
      enter: string
    },
    input: {
      background: string,
      color: string
    }
  }
}

export type Theme = Object & {
  animation: Animation,
  fonts: Typography,
  sizes: Sizes,
  colors: Colors
}

export type RequestStatus = $Values<typeof REQUEST_STATUS>
