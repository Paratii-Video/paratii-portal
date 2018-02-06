import React, { Component } from 'react'
import styled from 'styled-components'

import NavLink from 'components/foundations/buttons/NavLink'
import type { VideoRecord } from 'records/VideoRecords'

type Props = {
  video: VideoRecord,
  onClick: (id: string) => void
}

const Item = styled.div`
  background-color: ${props => props.theme.colors.body.background};
  font-family: ${props =>
    props.theme.fonts.family ? props.theme.fonts.family : 'Monospace'},
    sans-serif;
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
  padding: 10px;
  font-size: 14px;
`

const Label = styled.div`
  color: white;
  font-weight: bold;
  margin-bottom: 10px;
`

class UploadListItem extends Component<Props, void> {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.onClick(this.props.video.id)
  }

  render () {
    const item = this.props.video
    let progress = 0
    if (item.getIn(['uploadStatus', 'name']) === 'running') {
      progress = item.getIn(['uploadStatus', 'data', 'progress'])
    }
    let linkToVideo = ''
    if (item.transcodingStatus.name === 'success') {
      const link = `/play/${item.id}`
      linkToVideo = (
        <Label>
          <h3>Link</h3>
          <NavLink to={link}>Play video</NavLink>
        </Label>
      )
    }

    return (
      <Item onClick={this.handleClick} id="video-list-item-{item.id}">
        <h3>Info</h3>
        <Label>Video id: {item.id}</Label>
        <Label>Filename: {item.filename}</Label>
        <h3>Status</h3>
        <Label>
          Upload Status: <b>{item.uploadStatus.name}</b> ({progress}%)
        </Label>
        <Label>
          Blockchain Status (is the video info saved on the blockchain?):{' '}
          <b>{item.blockchainStatus.name}</b>
        </Label>
        <Label>
          Transcoding Status: <b>{item.getIn(['transcodingStatus', 'name'])}</b>
          <br />
          <br />
          {linkToVideo}
        </Label>
      </Item>
    )
  }
}

export default UploadListItem
