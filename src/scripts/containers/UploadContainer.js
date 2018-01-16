import { connect } from 'react-redux'

import React, { Component } from 'react'

import type { RootState } from 'types/ApplicationTypes'

import { getIsUploading, getHasUploadInfo } from 'selectors/Index'
import UploadFileContainer from 'components/UploadFileContainer'
import CreateVideoFormContainer from 'components/CreateVideoFormContainer'

type Props = {
  isUploading: boolean,
  hasUploadInfo: boolean
}

class UploadContainer extends Component<Props, void> {
  render () {
    const { isUploading, hasUploadInfo } = this.props
    return (
      <div>
        {!isUploading && <UploadFileContainer />}
        {isUploading && !hasUploadInfo && <CreateVideoFormContainer />}
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  isUploading: getIsUploading(state),
  hasUploadInfo: getHasUploadInfo(state)
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(UploadContainer)
