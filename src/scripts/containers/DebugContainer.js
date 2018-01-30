import { connect } from 'react-redux'
import type { RootState } from 'types/ApplicationTypes'
import Debug from 'components/Debug'

const mapDispatchToProps = () => ({})

const mapStateToProps = (state: RootState) => ({
  state: state
})

export default connect(mapStateToProps, mapDispatchToProps)(Debug)
