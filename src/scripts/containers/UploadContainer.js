import { connect } from 'react-redux'

import { Component } from 'react'

import type { RootState } from 'types/ApplicationTypes'

import { getIsUploading, getHasUploadInfo } from 'selectors/Index'

type Props = {
  isUploading: boolean,
  hasUploadInfo: boolean
}

class UploadFileContainer extends Component<Props, void> {
  render () {
    return null
  }
}

const mapStateToProps = (state: RootState) => ({
  isUploading: getIsUploading(state),
  hasUploadInfo: getHasUploadInfo(state)
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(UploadFileContainer)
