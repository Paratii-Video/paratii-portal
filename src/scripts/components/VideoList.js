import React, { Component } from 'react'
import styled from 'styled-components'

import type { UploadRecord } from 'records/UploadRecords'
import type { Map } from 'immutable'

import VideoListItem from 'components/VideoListItem'

type Props = {
  uploads: Map<string, UploadRecord>
};

//

const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.body.background};
  font-family: ${props => props.theme.fonts.family ? props.theme.fonts.family : 'Monospace'}, sans-serif;
  display: flex;
  flex-direction: column;
  width: 300px;
`

class UploadList extends Component<Props, void> {
  render () {
    const { uploads } = this.props
    return (
      <Wrapper>
        {uploads.entrySeq().map(([k, v]) => <VideoListItem key={k} item={v} />)}
      </Wrapper>
    )
  }
}

export default UploadList
