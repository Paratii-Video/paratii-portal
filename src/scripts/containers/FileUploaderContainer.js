import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { uploadAndTranscode } from 'actions/UploaderActions'
import type { RootState } from 'types/ApplicationTypes'
import FilesUploader from '../components/widgets/FilesUploader'
import { getIsSecure } from 'selectors/UserSelectors'
import { checkUserWallet } from 'actions/UserActions'

const mapStateToProps = (state: RootState) => ({
  isWalletSecured: getIsSecure(state)
})

const mapDispatchToProps = dispatch => ({
  onFileChosen: bindActionCreators(uploadAndTranscode, dispatch),
  checkUserWallet: bindActionCreators(checkUserWallet, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(FilesUploader)
