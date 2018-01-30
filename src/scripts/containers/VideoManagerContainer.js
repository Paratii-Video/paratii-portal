import { connect } from 'react-redux'

import React, { Component } from 'react'
import VideoList from './VideoListContainer'
import VideoForm from './VideoFormContainer'
// import Debug from 'components/Debug'
import Debug from './DebugContainer'
import UploadFile from './UploadFileContainer'
import UploadRecord from 'records/UploadRecords'
import { Map } from 'immutable'
import type { RootState } from 'types/ApplicationTypes'
import { getUploads } from 'selectors/index'
import styled from 'styled-components'

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
  uploads: Map<string, UploadRecord>
}

class VideoManagerContainer extends Component<Props, void> {
  constructor (props) {
    super(props)
    this.state = { selectedUpload: null }
    this.onVideoListItemClicked = this.onVideoListItemClicked.bind(this)
  }

  onVideoListItemClicked (id: string) {
    console.log('onVideoListItemClicked')
    this.setState({
      selectedUpload: id
    })
  }

  render () {
    const { uploads } = this.props
    const { selectedUpload } = this.state
    return (
      <Wrapper>
        {this.props.uploads.count() > 0 && (
          <VideoList onItemClick={this.onVideoListItemClicked} />
        )}
        {selectedUpload === null && <UploadFile />}
        {selectedUpload !== null && (
          <VideoForm
            id={selectedUpload}
            videoInfo={uploads.getIn([selectedUpload, 'videoInfo'])}
          />
        )}
        <Debug />
      </Wrapper>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  uploads: getUploads(state)
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(
  VideoManagerContainer
)
