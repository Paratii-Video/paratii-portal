import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

import React, { Component } from 'react'

import type { RootState } from 'types/ApplicationTypes'
import Wrapper from '../components/foundations/Wrapper'

type Props = {
}

class UploadVideoStatusContainer extends Component<Props, void> {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <Wrapper>
        <pre>
        Your Video is now being uploaded/beging transcoded/all ready for sharing!
          <br />
        You can share your video here [link] or embed it like this [link]
          <br />
        Soon you willl also be able to tag the video, create playlists,a nd other goodies! (But not yet :-())
        </pre>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = dispatch => ({
  // updateUploadInfo: bindActionCreators(updateUploadInfo, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadVideoStatusContainer)
