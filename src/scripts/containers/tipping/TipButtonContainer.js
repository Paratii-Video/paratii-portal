/* @flow */

import { connect } from 'react-redux'

import TipButton from 'components/tipping/TipButton'

import { addDoNotTipVideo, setUserIsTipping } from 'actions/TippingActions'
import { checkUserWallet } from 'actions/UserActions'

import { getIsSecure } from 'selectors/UserSelectors'
import { getPlayingVideo } from 'selectors/PlayerSelectors'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  walletIsSecure: getIsSecure(state),
  video: getPlayingVideo(state)
})

const mapDispatchToProps = {
  addDoNotTipVideo,
  checkUserWallet,
  setUserIsTipping
}

export default connect(mapStateToProps, mapDispatchToProps)(TipButton)
