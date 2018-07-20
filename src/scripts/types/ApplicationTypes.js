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
import VideoManagerRecord from 'records/VideoManagerRecords'
import TippingRecord from 'records/TippingRecords'
import UserNavRecord from 'records/UserNavRecord'
import {
  REQUEST_STATUS,
  TRANSITION_STATE,
  NOTIFICATION_LEVELS,
  NOTIFICATION_POSITIONS
} from 'constants/ApplicationConstants'
import { PLAYER_PLUGIN } from 'constants/PlayerConstants'
import { TOKEN_UNITS } from 'constants/ParatiiLibConstants'

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
  tipping: TippingRecord,
  videoManager: VideoManagerRecord,
  userNav: UserNavRecord
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

export type TokenUnit = $Values<typeof TOKEN_UNITS>

// TODO move this into paratii-js repo
export type ParatiiLib = {
  getAccount: () => string,
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
      clear: () => void,
      createFromMnemonic: (num: ?number, mnemonic: ?string) => Object,
      decrypt: (string, password: string) => Object,
      encrypt: (password: string) => Object,
      getMnemonic: () => Promise<string>,
      isValidMnemonic: string => boolean,
      length: number,
      newMnemonic: () => string
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
      challengeExists: string => boolean,
      checkEligiblityAndApply: (string, number) => Promise<Object>,
      getMinDeposit: () => string,
      getTotalStaked: string => Promise<Object>,
      isWhitelisted: string => Promise<Object>,
      approveAndStartChallenge: string => Promise<Object>,
      approveAndGetRightsAndCommitVote: (string, number, number) => void,
      challenge: {
        get: string => Object
      },
      votes: {
        get: (string, string) => Object
      }
    },
    // tcrPlaceholder: {
    //   apply: (string, number) => Promise<Object>,
    //   checkEligiblityAndApply: (string, number) => Promise<Object>,
    //   getMinDeposit: () => string
    // },
    transfer: (address: string, amount: number, unit: TokenUnit) => void
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
    smooth: string,
    outexpo: string,
    inexpo: string
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
  lineHeight: string,
  weight: {
    light: number,
    regular: number,
    bold: number
  },
  anchor: string,
  button: {
    big: string,
    main: string,
    small: string
  },
  title: {
    bigger: string,
    huge: string,
    big: string,
    main: string,
    small: string,
    hugeLineHeight: string,
    bigLineHeight: string,
    mainLineHeight: string,
    smallLineHeight: string
  },
  text: {
    big: string,
    main: string,
    small: string,
    tiny: string,
    bigLineHeight: string,
    mainLineHeight: string,
    smallLineHeight: string,
    tinyLineHeight: string
  },
  footer: {
    text: string
  },
  form: {
    input: string,
    helper: string
  },
  card: {
    title: string,
    subtitle: string,
    strong: string,
    text: string,
    index: string
  },
  modal: {
    title: string
  },
  video: {
    form: {
      title: string,
      subtitle: string
    },
    info: {
      progress: string,
      percentual: string
    },
    list: {
      title: string,
      filename: string,
      status: string
    },
    share: {
      link: string
    },
    quality: {
      levels: string,
      levelsDesktop: string
    }
  },
  radio: {
    title: string,
    label: string
  },
  popover: {
    title: string
  }
}

type Colors = {
  background: {
    body: string,
    primary: string,
    secondary: string,
    tertiary: string,
    transparent: string
  },
  button: {
    color: string,
    primary: string,
    accent: string,
    highlight: string,
    primaryFrom: string,
    primaryTo: string,
    accentFrom: string,
    accentTo: string,
    highlightFrom: string,
    highlightTo: string,
    shadow: string
  },
  text: {
    primary: string,
    secondary: string,
    accent: string,
    highlight: string,
    warn: string
  },
  header: {
    logo: string,
    shadow: string
  },
  footer: {
    logo: string
  },
  LandingPage: {
    headerShadow: string
  },
  Card: {
    shadow: string
  },
  Modal: {
    shadow: string
  },
  Popover: {
    shadow: string
  },
  ProfileCuration: {
    ChallengeBackgroundOneFrom: string,
    ChallengeBackgroundOneTo: string,
    ChallengeBackgroundTwoFrom: string,
    ChallengeBackgroundTwoTo: string,
    VotingBarOne: string,
    VotingBarTwo: string,
    ChallengeSequenceDot: string
  }
}

export type Theme = Object & {
  animation: Animation,
  fonts: Typography,
  colors: Colors
}

export type RequestStatus = $Values<typeof REQUEST_STATUS>

export type TransitionState = $Values<typeof TRANSITION_STATE>

export type PlayerPlugin = $Values<typeof PLAYER_PLUGIN>

export type NotificationPosition = $Values<typeof NOTIFICATION_POSITIONS>

export type NotificationLevel = $Values<typeof NOTIFICATION_LEVELS>

export type Notification = {
  title: string | any,
  message?: string | any,
  position?: NotificationPosition
}
