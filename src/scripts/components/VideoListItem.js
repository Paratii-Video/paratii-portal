import React, { Component } from 'react'
import styled from 'styled-components'
import type { UploadRecord } from 'records/UploadRecords'

type Props = {
  id: string,
  item: UploadRecord,
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
`

const Label = styled.p`
  color: white;
`

class UploadListItem extends Component<Props, void> {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.onClick(this.props.id)
  }

  render () {
    const item = this.props.item
    console.log(this.props)
    let status = ''
    if (item.getIn(['uploadStatus', 'name']) === 'running') {
      const progress = item.getIn(['uploadStatus', 'data', 'progress'])
      status = `Uploading (${progress}%)`
    } else {
      status = item.getIn(['uploadStatus', 'name'])
    }
    return (
      <Item onClick={this.handleClick}>
        <Label>
          {item.filename} {item.id} xxx
        </Label>
        <Label>{status} [status]</Label>
      </Item>
    )
  }
}

export default UploadListItem
