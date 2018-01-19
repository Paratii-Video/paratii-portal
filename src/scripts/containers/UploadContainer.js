import { connect } from 'react-redux'

import React, { Component } from 'react'
import type { RootState, UploadProgress } from 'types/ApplicationTypes'

import { getIsUploading, getHasUploadInfo, getProgress } from 'selectors/index'
import UploadFileContainer from 'containers/UploadFileContainer'
import UploadVideoFormContainer from 'containers/UploadVideoFormContainer'
import UploadVideoStatusContainer from 'containers/UploadVideoStatusContainer'

type Props = {
  isUploading: boolean,
  hasUploadInfo: boolean,
  progress: UploadProgress,
  state: Object
}

class UploadContainer extends Component<Props, void> {
  render () {
    const { progress, isUploading, hasUploadInfo, state } = this.props
    const p = progress ? progress.getIn(['value']) : '0' // need getIn because is immutable
    const stringifiedState = JSON.stringify(state)
    return (
      <div>
        {isUploading && <p>{p}</p>}
        {!isUploading && <UploadFileContainer />}
        {isUploading && !hasUploadInfo && <UploadVideoFormContainer />}
        {hasUploadInfo && <UploadVideoStatusContainer />}
        <pre>
          <b>some state info to keep sane...</b>
          <p>progress: {p}</p>
          <p>isUploading: {(isUploading && <span>true</span>) || <span>false</span>}</p>
          <p>hasUploadInfo: {(hasUploadInfo && <span>true</span>) || <span>false</span>}</p>
          {stringifiedState}
        </pre>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  progress: getProgress(state),
  isUploading: getIsUploading(state),
  hasUploadInfo: getHasUploadInfo(state),
  state: state // have the state here for debugging purposes...
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(UploadContainer)
