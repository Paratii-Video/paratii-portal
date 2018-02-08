import { connect } from 'react-redux'
import RequiresLogin from './RequiresLogin'

import Login from 'components/pages/Login'

const mapStateToProps = () => ({})

const mapDispatchToProps = () => ({})

export default RequiresLogin(
  connect(mapStateToProps, mapDispatchToProps)(Login),
  false
)
