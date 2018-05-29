/* @flow */

import { connect } from 'react-redux'

import MyVideoItem from 'components/MyVideoItem'
import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(MyVideoItem)
