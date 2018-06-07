/* @flow */

import { connect } from 'react-redux'
import { getUploaderVideos } from 'selectors/UploaderSelectors'
import type { RootState } from 'types/ApplicationTypes'
import Landing from 'components/pages/Landing'

const mapStateToProps = (state: RootState) => ({
  videos: getUploaderVideos(state)
})

const mapDispatchToProps: Object = {}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
