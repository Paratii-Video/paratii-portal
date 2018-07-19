/* @flow */

import { connect } from 'react-redux'

import ProfileMyVideos from 'components/ProfileMyVideos'
import { getUploaderVideos } from 'selectors/UploaderSelectors'
import { getIsSecure } from 'selectors/UserSelectors'
import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  videos: getUploaderVideos(state),
  isWalletSecured: getIsSecure(state)
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMyVideos)
