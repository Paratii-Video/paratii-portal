import { connect } from 'react-redux'
import { Map } from 'immutable'
import VideoList from 'components/VideoList'
import UploadRecord from 'records/UploadRecords'

const mapStateToProps = (state) => ({
  uploads: Map({'1': new UploadRecord(), '2': new UploadRecord()})
})

const mapDispatchToProps = () => ({})
export default connect(mapStateToProps, mapDispatchToProps)(VideoList)
