/* @flow */

import type { RootState } from 'types/ApplicationTypes'

import DefaultState from 'unit-tests/test-utils/DefaultState'

const mockGetState = (
  properties: ?Object = {}
): (() => RootState) => (): RootState => ({
  ...DefaultState,
  ...properties
})

export default mockGetState
