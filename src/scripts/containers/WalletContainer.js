import { connect } from 'react-redux'

import Wallet from 'components/Wallet'

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Wallet)
