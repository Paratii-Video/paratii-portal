/* @flow */

import { connect } from 'react-redux'

import ProfileMyVideos from 'components/ProfileMyVideos'
import { getUploaderVideos } from 'selectors/UploaderSelectors'
import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  videos: getUploaderVideos(state)
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMyVideos)