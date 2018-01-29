import { Link } from 'react-router-dom'
import Anchor from './Anchor'

const StyleNavLink = Anchor.extend`
  font-size: 14px;
`
const NavLink = StyleNavLink.withComponent(Link)

export default NavLink
