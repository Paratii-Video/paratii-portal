import { connect } from 'react-redux'

import React, { Component } from 'react'
import type { RootState } from 'types/ApplicationTypes'

import { getIsUploading, getShowEditVideoInfo, getShowUploadFile, getShowVideoInfo } from 'selectors/UploadSelectors'
import UploadFileContainer from 'containers/UploadFileContainer'
import UploadVideoFormContainer from 'containers/UploadVideoFormContainer'
import UploadVideoStatusContainer from 'containers/UploadVideoStatusContainer'
import UploadProgressContainer from 'containers/UploadProgressContainer'

type Props = {
  isUploading: boolean,
  showUploadFile: boolean,
  showEditVideoInfo: boolean,
  showVideoInfo: boolean,
  state: Object
}

class UploadContainer extends Component<Props, void> {
  render () {
    const { isUploading, showUploadFile, showEditVideoInfo, showVideoInfo, state } = this.props
    const stringifiedState = JSON.stringify(state)
    return (
      <div>
        {isUploading && <UploadProgressContainer />}
        {showUploadFile && <UploadFileContainer />}
        {showEditVideoInfo && <UploadVideoFormContainer />}
        {showVideoInfo && <UploadVideoStatusContainer />}
        <pre>
          -------------------------the state----
          {stringifiedState}
        </pre>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  showUploadFile: getShowUploadFile(state),
  showEditVideoInfo: getShowEditVideoInfo(state),
  showVideoInfo: getShowVideoInfo(state),
  isUploading: getIsUploading(state),
  state: state // have the state here for debugging purposes...
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(UploadContainer)
