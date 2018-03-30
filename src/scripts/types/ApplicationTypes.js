/* @flow */

import Immutable from 'immutable'

import VideoRecord from 'records/VideoRecords'
import UserRecord from 'records/UserRecords'
import PlayerRecord from 'records/PlayerRecords'
import UploaderRecord from 'records/UploaderRecords'
import NotificationRecord from 'records/NotificationRecord'
import {
  REQUEST_STATUS,
  TRANSITION_STATE
} from 'constants/ApplicationConstants'
import { PLAYER_PLUGIN } from 'constants/PlayerConstants'

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
export type NotificationsArray = Array<NotificationRecord>

export type RootState = {
  uploader: UploaderRecord,
  user: UserRecord,
  videos: VideoRecordMap,
  player: PlayerRecord,
  notifications: NotificationsArray
}

type _ThunkAction<R> = (dispatch: Dispatch, getState?: () => RootState) => R
type ThunkAction = _ThunkAction<any>
export type Dispatch = (action: Action<*> | ThunkAction) => any

export type ParatiiLibConfig = {
  provider: string
}

type EventEmitter = {
  on: (eventType: string, callback: (any) => void) => void
}

// TODO move this into paratii-mediaplayer repo
type ClapprContainer = EventEmitter & {}

type ClapprPlayback = EventEmitter & {
  _hls?: {
    startLevel: number
  },
  currentLevel: number
}

type ClapprCore = EventEmitter & {
  getCurrentPlayback: () => ClapprPlayback,
  getCurrentContainer: () => ClapprContainer,
  mediaControl: {
    show: () => void,
    hide: () => void,
    setUserKeepVisible: () => void,
    resetUserKeepVisible: () => void
  }
}

export type ClapprPlayer = EventEmitter & {
  core: ClapprCore,
  isPlaying: () => boolean,
  play: () => void,
  pause: () => void,
  mute: () => void,
  unmute: () => void,
  getVolume: () => number,
  setVolume: (percentage: number) => void,
  destroy: () => void,
  seek: (time: number) => void
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
      upsert: Object => Object,
      update: (id: string, Object) => Object,
      search: Object => Array<Object>
    }
  },
  eth: {
    wallet: {
      decrypt: (string, password: string) => Object,
      encrypt: (password: string) => Object,
      // newMnemonic: () => string,
      getMnemonic: () => Promise<string>,
      create: (num: ?number, mnemonic: ?string) => Object,
      clear: () => void
    },
    vids: {
      get: (id: string) => ?Object,
      makeId: () => string
    },
    vouchers: {
      redeem: (value: string) => Promise<Object>
    },
    setAccount: (string, string) => ?Object,
    balanceOf: (address: string, token: ?string) => Promise<Object>,
    web3: {
      utils: {
        fromWei: (value: number | string, toUnit: ?string) => string,
        toWei: (value: string, toUnit: ?string) => number
      }
    },
    tcr: {
      apply: (string, number) => Promise<Object>,
      checkEligiblityAndApply: (string, number) => Promise<Object>
    }
  },
  ipfs: {
    uploader: {
      add: Object => Object,
      transcode: (string, Object) => Object
    },
    getIPFSInstance: () => Promise<Object>
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
  base: string,
  weight: {
    light: number,
    regular: number,
    bold: number
  },
  anchor: string,
  button: string,
  form: {
    input: string,
    helper: string
  },
  video: {
    form: {
      title: string,
      subtitle: string
    },
    info: {
      time: string,
      progress: string,
      percentual: string
    }
  },
  radio: {
    title: string,
    label: string
  },
  title: {
    big: string,
    main: string,
    small: string
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
  card: {
    padding: string
  },
  mainInput: {
    height: string
  },
  radio: string
}

type Colors = {
  body: {
    background: string,
    color: string
  },
  header: {
    background: string,
    icon: string,
    logo: string
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
  Popover: {
    background: string,
    color: string
  },
  TextField: {
    border: string,
    borderFocus: string,
    color: string,
    placeholder: string,
    error: string
  },
  Radio: {
    title: string,
    label: string,
    border: string,
    active: string
  },
  MainCard: {
    background: string,
    color: string,
    title: {
      color: string
    },
    footer: {
      background: string,
      color: string
    }
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
  },
  VideoForm: {
    header: {
      border: string,
      title: string,
      subtitle: string,
      subtitle2: string
    },
    info: {
      time: {
        background: string,
        color: string
      },
      progress: {
        color: string,
        icon: string,
        iconBg: string,
        background: string,
        barFrom: string,
        barTo: string
      }
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

export type TransitionState = $Values<typeof TRANSITION_STATE>

export type PlayerPlugin = $Values<typeof PLAYER_PLUGIN>
