/* @flow */

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Play from "components/Play";
import { setVideoId, fetchVideo } from "actions/VideoActions";
import { getVideoId } from "selectors/index";

import type { RootState } from "types/ApplicationTypes";

const mapStateToProps = (state: RootState) => ({
  videoId: getVideoId(state)
});

const mapDispatchToProps = dispatch => ({
  setVideoId: bindActionCreators(setVideoId, dispatch),
  fetchVideo: bindActionCreators(fetchVideo, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Play);
