/* @flow */

import { Map as ImmutableMap } from 'immutable'

import GlobalRecord from 'records/GlobalRecord'
import Uploader from 'records/UploaderRecords'
import UserRecord from 'records/UserRecords'
import ModalRecord from 'records/ModalRecord'
import PlayerRecord from 'records/PlayerRecords'
import SearchRecord from 'records/SearchRecords'

const DefaultState = {
  global: new GlobalRecord(),
  uploader: new Uploader(),
  user: new UserRecord(),
  videos: ImmutableMap(),
  player: new PlayerRecord(),
  modal: new ModalRecord(),
  notifications: [],
  search: new SearchRecord()
}

export default DefaultState
