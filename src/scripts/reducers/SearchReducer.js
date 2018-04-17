/* @flow */

import { handleActions } from 'redux-actions'

import Search from 'records/SearchRecords'

const reducer = {}

export default handleActions(reducer, new Search())
