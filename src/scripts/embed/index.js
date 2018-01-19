/* @flow */

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import { initParatiiLib, paratii } from 'utils/ParatiiLib'
import { getRoot } from 'utils/AppUtils'
import PlayContainer from 'containers/PlayContainer'
import Video from 'records/VideoRecords'
import createStore from 'scripts/createStore'

import 'styles/embed/index.scss'

import type { RouteMatch } from 'types/ApplicationTypes'

type Props = {
  match: RouteMatch
};

type State = {
  video?: Video
};

const store = createStore()

class EmbedApp extends React.Component<Props, State> {
  fetchVideo: () => void;

  constructor (props: Props) {
    super(props)

    this.state = {}

    this.fetchVideo = this.fetchVideo.bind(this)
  }

  fetchVideo (id: string) {
    paratii().eth.vids.get(id)
      .then(videoInfo => {
        this.setState(prevState => {
          if (!prevState.video) {
            return {
              video: new Video(videoInfo)
            }
          }
        })
      })
  }

  render () {
    const { match } = this.props
    const { video } = this.state

    console.log('video: ', video)

    return <Route
      exact path={`${match.url}video/:id`}
      component={PlayContainer}
    />
  }
}

initParatiiLib().then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Route path='/' component={EmbedApp} />
      </BrowserRouter>
    </Provider>,
    getRoot()
  )
})
