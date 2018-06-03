/* @flow */

import Immutable from 'immutable'

import GlobalRecord from 'records/GlobalRecord'
import VideoRecord from 'records/VideoRecords'
import UserRecord from 'records/UserRecords'
import PlayerRecord from 'records/PlayerRecords'
import UploaderRecord from 'records/UploaderRecords'
import NotificationRecord from 'records/NotificationRecord'
import ModalRecord from 'records/ModalRecord'
import SearchRecord from 'records/SearchRecords'
import VideoManagerRecord from 'records/VideoManagerRecord'
import {
  REQUEST_STATUS,
  TRANSITION_STATE,
  NOTIFICATION_LEVELS,
  NOTIFICATION_POSITIONS
} from 'constants/ApplicationConstants'
import { PLAYER_PLUGIN } from 'constants/PlayerConstants'

export type Location = {
  pathname: string,
  search: string,
  state: Object
}

export type AsyncTaskStatusName = 'idle' | 'running' | 'success' | 'error'

export type Stats = {
  likers: Array<any>,
  dislikers: Array<any>
}

export type VideoInfo = {
  author: string,
  blockNumber: number,
  createBlockNumber: number,
  description: string,
  duration: string,
  filename: string,
  filesize: string,
  id: string,
  ipfsData: string,
  ipfsHash: string,
  ipfsHashOrig: string,
  owner: string,
  price: number,
  published: string,
  stats: Stats,
  tags: Array<string>,
  thumbnails: Array<string>,
  title: string,
  uploader: {
    address: string
  }
}

export type Action<T> = {
  type: string,
  payload: T
}

export type VideoRecordMap = Immutable.Map<string, VideoRecord>
export type NotificationsArray = Array<NotificationRecord>

export type RootState = {
  global: GlobalRecord,
  uploader: UploaderRecord,
  user: UserRecord,
  videos: VideoRecordMap,
  player: PlayerRecord,
  notifications: NotificationsArray,
  modal: ModalRecord,
  search: SearchRecord,
  videoManager: VideoManagerRecord
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

type ClapprModule = {
  Events: { [key: string]: string }
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
  seek: (time: number) => void,
  clappr: ClapprModule
}

// TODO move this into paratii-js repo
export type ParatiiLib = {
  config: {
    account: {
      address: string,
      privateKey: string
    }
  },
  vids: {
    get: (id: string) => ?Object,
    create: Object => Object,
    upsert: Object => Object,
    update: (id: string, Object) => Object,
    search: Object => Object,
    uploadAndTranscode: Object => Object
  },
  users: {
    migrateAccount: (address: string) => Object,
    create: Object => Object,
    get: (address: string) => Object
  },
  eth: {
    getAccount: () => string,
    wallet: {
      decrypt: (string, password: string) => Object,
      encrypt: (password: string) => Object,
      newMnemonic: () => string,
      getMnemonic: () => Promise<string>,
      create: (num: ?number, mnemonic: ?string) => Object,
      clear: () => void,
      isValidMnemonic: string => boolean,
      length: number
    },
    vids: {
      get: (id: string) => ?Object,
      makeId: () => string
    },
    vouchers: {
      redeem: (value: string) => Promise<Object>
    },
    setAccount: string => void,
    balanceOf: (address: string, token: ?string) => Promise<Object>,
    web3: {
      utils: {
        fromWei: (value: number | string, toUnit: ?string) => string,
        toWei: (value: string, toUnit: ?string) => number
      }
    },
    tcr: {
      apply: (string, number) => Promise<Object>,
      checkEligiblityAndApply: (string, number) => Promise<Object>,
      getMinDeposit: () => string
    },
    tcrPlaceholder: {
      apply: (string, number) => Promise<Object>,
      checkEligiblityAndApply: (string, number) => Promise<Object>,
      getMinDeposit: () => string
    }
  },
  ipfs: {
    local: {
      add: Object => Object
    },
    remote: {},
    getIPFSInstance: () => Promise<Object>,
    start: () => Promise<Object>,
    stop: () => Promise<>
  },
  transcoder: {
    transcode: (string, Object) => Object
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

export type NotificationPosition = $Values<typeof NOTIFICATION_POSITIONS>

export type NotificationLevel = $Values<typeof NOTIFICATION_LEVELS>

export type Notification = {
  title: string,
  message?: string,
  position?: NotificationPosition
}
