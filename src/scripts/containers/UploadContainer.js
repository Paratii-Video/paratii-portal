import { connect } from 'react-redux'

import React, { Component } from 'react'
import type { RootState, UploadProgress } from 'types/ApplicationTypes'

import { getIsUploading, getHasUploadInfo, getProgress } from 'selectors/index'
import UploadFileContainer from 'containers/UploadFileContainer'
import CreateVideoFormContainer from 'containers/CreateVideoFormContainer'

type Props = {
  isUploading: boolean,
  hasUploadInfo: boolean,
  progress: UploadProgress
}

class UploadContainer extends Component<Props, void> {
  render () {
    const { progress, isUploading, hasUploadInfo } = this.props
    const p = progress ? progress.getIn(['value']) : '0' // need getIn because is immutable
    return (
      <div>
        <p>{p}</p>
        {!isUploading && <UploadFileContainer />}
        {isUploading && !hasUploadInfo && <CreateVideoFormContainer />}
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  progress: getProgress(state),
  isUploading: getIsUploading(state),
  hasUploadInfo: getHasUploadInfo(state)
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(UploadContainer)
