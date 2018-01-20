import { connect } from 'react-redux'

import React, { Component } from 'react'
import type { RootState, UploadProgress } from 'types/ApplicationTypes'

import { getIsUploading, getShowEditVideoInfo, getShowUploadFile, getShowVideoInfo, getUploadProgress } from 'selectors/UploadSelectors'
import UploadFileContainer from 'containers/UploadFileContainer'
import UploadVideoFormContainer from 'containers/UploadVideoFormContainer'
import UploadVideoStatusContainer from 'containers/UploadVideoStatusContainer'

type Props = {
  isUploading: boolean,
  showUploadFile: boolean,
  showEditVideoInfo: boolean,
  showVideoInfo: boolean,
  progress: UploadProgress,
  state: Object
}

class UploadContainer extends Component<Props, void> {
  render () {
    const { progress, isUploading, showUploadFile, showEditVideoInfo, showVideoInfo, state } = this.props
    const p = progress // need getIn because is immutable
    const stringifiedState = JSON.stringify(state)
    return (
      <div>
        {isUploading && <p>{p}</p>}
        {showUploadFile && <UploadFileContainer />}
        {showEditVideoInfo && <UploadVideoFormContainer />}
        {showVideoInfo && <UploadVideoStatusContainer />}
        <pre>
          <b>some state info to keep sane...</b>
          {stringifiedState}
        </pre>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  progress: getUploadProgress(state),
  showUploadFile: getShowUploadFile(state),
  showEditVideoInfo: getShowEditVideoInfo(state),
  showVideoInfo: getShowVideoInfo(state),
  isUploading: getIsUploading(state),
  state: state // have the state here for debugging purposes...
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(UploadContainer)
