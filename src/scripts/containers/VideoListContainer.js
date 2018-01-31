import { connect } from 'react-redux'
import VideoList from 'components/VideoList'
import type { RootState } from 'types/ApplicationTypes'
import { getUploads } from 'selectors/index'

const mapStateToProps = (state: RootState) => ({
  uploads: getUploads(state)
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(VideoList)
