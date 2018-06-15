/* @flow */

import { connect } from 'react-redux'

import TipButton from 'components/tipping/TipButton'

import { addDoNotTipVideo, setUserIsTipping } from 'actions/TippingActions'

import { getPlayingVideo } from 'selectors/PlayerSelectors'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  video: getPlayingVideo(state)
})

const mapDispatchToProps = {
  addDoNotTipVideo,
  setUserIsTipping
}

export default connect(mapStateToProps, mapDispatchToProps)(TipButton)
