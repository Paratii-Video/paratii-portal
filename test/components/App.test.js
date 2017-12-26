import App from 'components/App'
import createTestRenderer from 'test-utils/createTestRenderer'

const defaultProps = {
  match: {
    url: '/'
  }
}

const render = createTestRenderer(App, defaultProps)

describe('App component', () => {
  it('should render without crashing', () => {
    const wrapper = render()
    expect(wrapper.length).toEqual(1)
  })
})
