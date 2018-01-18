/* @flow */

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

import { getRoot } from 'utils/AppUtils'
import Play from 'components/Play'
import Video from 'records/VideoRecords'

import type { RouteMatch } from 'types/ApplicationTypes'

type Props = {
  match: RouteMatch
};

type State = {
  video?: ?Video
};

class EmbedApp extends React.Component<Props, State> {
  fetchVideo: () => void;

  constructor (props) {
    super(props)

    this.state = {}

    this.fetchVideo = this.fetchVideo.bind(this)
  }

  async fetchVideo (id: string) {
    await window.paratii.eth.deployContracts()
    const videoInfo = await window.paratii.eth.vids.get(id)

    this.setState({
      video: new Video(videoInfo)
    })
  }

  render () {
    const { match } = this.props
    const { video } = this.state

    return <Route
      exact path={`${match.url}video/:id`}
      component={({ match }) => (
        <Play
          fetchVideo={() => {
            this.fetchVideo(match.params.id)
          }}
          match={match}
          video={video}
        />
      )}
    />
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Route path='/' component={EmbedApp} />
  </BrowserRouter>,
  getRoot()
)
