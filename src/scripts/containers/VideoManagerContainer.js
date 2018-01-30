import { Map } from 'immutable'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { setCurrentVideo } from 'actions/VideoActions'

import UploadRecord from 'records/UploadRecords'
import VideoRecord from 'records/VideoRecords'

import { getUploads } from 'selectors/index'

import type { RootState } from 'types/ApplicationTypes'

import VideoList from './VideoListContainer'
import VideoForm from './VideoFormContainer'
import Debug from './DebugContainer'
import UploadFile from './UploadFileContainer'

const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.body.background};
  font-family: ${props =>
    props.theme.fonts.family ? props.theme.fonts.family : 'Monospace'},
    sans-serif;
  display: flex;
  flex-direction: row;
  width: 300px;
`

type Props = {
  uploads: Map<string, UploadRecord>,
  selectedVideo: VideoRecord
}

class VideoManagerContainer extends Component<Props, void> {
  constructor (props) {
    super(props)
    this.state = { selectedUpload: null }
    setCurrentVideo(null)
    this.onVideoListItemClicked = this.onVideoListItemClicked.bind(this)
  }

  onVideoListItemClicked (id: string) {
    console.log('onVideoListItemClicked')
    this.setState({
      selectedUpload: id
    })
    setCurrentVideo(id)
  }

  render () {
    const selectedUpload = this.props.selectedVideo
    return (
      <Wrapper>
        <VideoList onItemClick={this.onVideoListItemClicked} />
        {selectedUpload === null && <UploadFile />}
        {selectedUpload !== null && <VideoForm />}
        <Debug />
      </Wrapper>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  uploads: getUploads(state),
  selectedVideo: state.selectedVideo
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(
  VideoManagerContainer
)
