/* @flow */

import { createStore } from 'redux'
import Immutable from 'immutable'

import reducer from 'reducers/VideosReducer'
import {
  UPLOAD_REQUESTED,
  UPLOAD_PROGRESS,
  UPLOAD_SUCCESS,
  UPLOAD_LOCAL_SUCCESS,
  UPDATE_VIDEO_INFO,
  VIDEO_DATA_START,
  VIDEO_DATA_SAVED,
  TRANSCODING_REQUESTED,
  TRANSCODING_PROGRESS,
  TRANSCODING_SUCCESS,
  TRANSCODING_FAILURE,
  VIDEOFETCH_ERROR,
  VIDEOFETCH_SUCCESS
} from 'constants/ActionConstants'
import VideoRecord from 'records/VideoRecords'
import {
  AsyncTaskStatusRecord,
  DataStatusRecord
} from 'records/AsyncTaskStatusRecord'
import {
  getDefaultVideo,
  getDefaultAsyncTaskStatus,
  getDefaultDataStatus
} from 'unit-tests/fixtures/VideoFixtures'
import { expect } from 'chai'

describe('Video Reducer', () => {
  describe('UPLOAD_REQUESTED', () => {
    it('should do nothing if there is no payload', () => {
      const store = createStore(reducer)
      expect(store.getState().toJS()).to.deep.equal({})
      store.dispatch({
        type: UPLOAD_REQUESTED
      })
      expect(store.getState().toJS()).to.deep.equal({})
    })
    it('should do nothing if there is no id in the payload', () => {
      const store = createStore(reducer)
      expect(store.getState().toJS()).to.deep.equal({})
      store.dispatch({
        type: UPLOAD_REQUESTED,
        payload: {
          foo: 'bar'
        }
      })
      expect(store.getState().toJS()).to.deep.equal({})
    })
    it('should add a video if there are no videos in the store', () => {
      const store = createStore(reducer)
      expect(store.getState().toJS()).to.deep.equal({})
      store.dispatch({
        type: UPLOAD_REQUESTED,
        payload: {
          id: '111',
          filename: 'bazbar.mp4',
          filesize: '11111'
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        '111': {
          ...getDefaultVideo(),
          filename: 'bazbar.mp4',
          filesize: '11111',
          uploadStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'running',
            data: {
              ...getDefaultDataStatus(),
              progress: 0
            }
          }
        }
      })
    })
    it('should add a video to the store', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '123': new VideoRecord({
            filename: 'bazbar'
          }),
          '333': new VideoRecord({
            title: 'beezle'
          })
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '123': {
          ...getDefaultVideo(),
          filename: 'bazbar'
        },
        '333': {
          ...getDefaultVideo(),
          title: 'beezle'
        }
      })
      store.dispatch({
        type: UPLOAD_REQUESTED,
        payload: {
          id: '111',
          filename: 'bazbar.mp4',
          filesize: '11111'
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        '123': {
          ...getDefaultVideo(),
          filename: 'bazbar'
        },
        '333': {
          ...getDefaultVideo(),
          title: 'beezle'
        },
        '111': {
          ...getDefaultVideo(),
          filename: 'bazbar.mp4',
          filesize: '11111',
          uploadStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'running',
            data: {
              ...getDefaultDataStatus(),
              progress: 0
            }
          }
        }
      })
    })
    it('should add update an existing video in the store', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '123': new VideoRecord({
            filename: 'bazbar'
          }),
          '333': new VideoRecord({
            title: 'beezle'
          }),
          '111': new VideoRecord({
            title: 'test123',
            filesize: '11111',
            uploadStatus: new AsyncTaskStatusRecord({
              name: 'running',
              data: new DataStatusRecord({
                title: 'foo'
              })
            })
          })
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '123': {
          ...getDefaultVideo(),
          filename: 'bazbar'
        },
        '333': {
          ...getDefaultVideo(),
          title: 'beezle'
        },
        '111': {
          ...getDefaultVideo(),
          title: 'test123',
          filesize: '11111',
          uploadStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'running',
            data: {
              ...getDefaultDataStatus(),
              title: 'foo'
            }
          }
        }
      })
      store.dispatch({
        type: UPLOAD_REQUESTED,
        payload: {
          id: '111',
          filename: 'bazbar.mp4',
          filesize: '11111'
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        '123': {
          ...getDefaultVideo(),
          filename: 'bazbar'
        },
        '333': {
          ...getDefaultVideo(),
          title: 'beezle'
        },
        '111': {
          ...getDefaultVideo(),
          title: 'test123',
          filename: 'bazbar.mp4',
          filesize: '11111',
          uploadStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'running',
            data: {
              ...getDefaultDataStatus(),
              progress: 0,
              title: 'foo'
            }
          }
        }
      })
    })
  })
  describe('UPLOAD_PROGRESS', () => {
    it('should throw if there is no payload', () => {
      const store = createStore(reducer)
      expect(store.getState().toJS()).to.deep.equal({})
      expect(() =>
        store.dispatch({
          type: UPLOAD_PROGRESS
        })
      ).to.throw()
    })
    it('should throw when there is no id in the payload', () => {
      const store = createStore(reducer)
      expect(store.getState().toJS()).to.deep.equal({})
      expect(() =>
        store.dispatch({
          type: UPLOAD_PROGRESS,
          payload: {
            foo: 'bar'
          }
        })
      ).to.throw()
    })
    it('should throw when there is no matching id in the store', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '123': new VideoRecord({}),
          '999': new VideoRecord({})
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '999': getDefaultVideo()
      })
      expect(() =>
        store.dispatch({
          type: UPLOAD_PROGRESS,
          payload: {
            id: '111'
          }
        })
      ).to.throw()
    })
    it('should update the video progress when a matching id is in the store', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '123': new VideoRecord({}),
          '888': new VideoRecord({
            title: 'foobar',
            uploadStatus: new AsyncTaskStatusRecord({
              name: 'running',
              data: new DataStatusRecord({
                title: 'foo',
                progress: 44
              })
            })
          }),
          '999': new VideoRecord({})
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '888': {
          ...getDefaultVideo(),
          title: 'foobar',
          uploadStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'running',
            data: {
              ...getDefaultDataStatus(),
              title: 'foo',
              progress: 44
            }
          }
        },
        '999': getDefaultVideo()
      })
      store.dispatch({
        type: UPLOAD_PROGRESS,
        payload: {
          id: '888',
          progress: 98
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '888': {
          ...getDefaultVideo(),
          title: 'foobar',
          uploadStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'running',
            data: {
              ...getDefaultDataStatus(),
              title: 'foo',
              progress: 98
            }
          }
        },
        '999': getDefaultVideo()
      })
    })
  })
  describe('UPLOAD_LOCAL_SUCCESS', () => {
    it('should throw if there is no payload', () => {
      const store = createStore(reducer)
      expect(store.getState().toJS()).to.deep.equal({})
      expect(() =>
        store.dispatch({
          type: UPLOAD_LOCAL_SUCCESS
        })
      ).to.throw()
    })
    it('should throw when there is no id in the payload', () => {
      const store = createStore(reducer)
      expect(store.getState().toJS()).to.deep.equal({})
      expect(() =>
        store.dispatch({
          type: UPLOAD_LOCAL_SUCCESS,
          payload: {
            foo: 'bar'
          }
        })
      ).to.throw()
    })
    it('should throw when there is no matching id in the store', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '123': new VideoRecord({}),
          '999': new VideoRecord({})
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '999': getDefaultVideo()
      })
      expect(() =>
        store.dispatch({
          type: UPLOAD_LOCAL_SUCCESS,
          payload: {
            id: '111'
          }
        })
      ).to.throw()
    })
    it('should update the upload status and hash when a matching id is in the store', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '123': new VideoRecord({}),
          '888': new VideoRecord({
            title: 'foobar',
            uploadStatus: new AsyncTaskStatusRecord({
              name: 'running',
              data: new DataStatusRecord({
                title: 'foo',
                progress: 44
              })
            })
          }),
          '999': new VideoRecord({})
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '888': {
          ...getDefaultVideo(),
          title: 'foobar',
          uploadStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'running',
            data: {
              ...getDefaultDataStatus(),
              title: 'foo',
              progress: 44
            }
          }
        },
        '999': getDefaultVideo()
      })
      store.dispatch({
        type: UPLOAD_LOCAL_SUCCESS,
        payload: {
          id: '888',
          hash: 'Qjow875hgaahaw'
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '888': {
          ...getDefaultVideo(),
          title: 'foobar',
          ipfsHashOrig: 'Qjow875hgaahaw',
          uploadStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'uploaded to local node',
            data: {
              ...getDefaultDataStatus(),
              title: 'foo',
              progress: 44,
              ipfsHashOrig: 'Qjow875hgaahaw'
            }
          }
        },
        '999': getDefaultVideo()
      })
    })
  })
  describe('UPLOAD_SUCCESS', () => {
    it('should throw if there is no payload', () => {
      const store = createStore(reducer)
      expect(store.getState().toJS()).to.deep.equal({})
      expect(() =>
        store.dispatch({
          type: UPLOAD_SUCCESS
        })
      ).to.throw()
    })
    it('should throw when there is no id in the payload', () => {
      const store = createStore(reducer)
      expect(store.getState().toJS()).to.deep.equal({})
      expect(() =>
        store.dispatch({
          type: UPLOAD_SUCCESS,
          payload: {
            foo: 'bar'
          }
        })
      ).to.throw()
    })
    it('should throw when there is no matching id in the store', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '123': new VideoRecord({}),
          '999': new VideoRecord({})
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '999': getDefaultVideo()
      })
      expect(() =>
        store.dispatch({
          type: UPLOAD_SUCCESS,
          payload: {
            id: '111'
          }
        })
      ).to.throw()
    })
    it('should update the upload status and hash when a matching id is in the store', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '123': new VideoRecord({}),
          '888': new VideoRecord({
            title: 'foobar',
            uploadStatus: new AsyncTaskStatusRecord({
              name: 'uploaded to local node',
              data: new DataStatusRecord({
                title: 'foo',
                progress: 44
              })
            })
          }),
          '999': new VideoRecord({})
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '888': {
          ...getDefaultVideo(),
          title: 'foobar',
          uploadStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'uploaded to local node',
            data: {
              ...getDefaultDataStatus(),
              title: 'foo',
              progress: 44
            }
          }
        },
        '999': getDefaultVideo()
      })
      store.dispatch({
        type: UPLOAD_SUCCESS,
        payload: {
          id: '888',
          hash: 'Qjow875hgaahaw'
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '888': {
          ...getDefaultVideo(),
          title: 'foobar',
          ipfsHashOrig: 'Qjow875hgaahaw',
          uploadStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'uploaded to transcoder node',
            data: {
              ...getDefaultDataStatus(),
              title: 'foo',
              progress: 44,
              ipfsHashOrig: 'Qjow875hgaahaw'
            }
          }
        },
        '999': getDefaultVideo()
      })
    })
  })
  describe('UPDATE_VIDEO_INFO', () => {
    it('should do nothing if there is no payload', () => {
      const store = createStore(reducer)
      expect(store.getState().toJS()).to.deep.equal({})
      store.dispatch({
        type: UPDATE_VIDEO_INFO
      })
      expect(store.getState().toJS()).to.deep.equal({})
    })
    it('should do nothing when there is no id in the payload', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '999': new VideoRecord()
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '999': getDefaultVideo()
      })
      store.dispatch({
        type: UPDATE_VIDEO_INFO,
        payload: {
          foo: 'bar'
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        '999': getDefaultVideo()
      })
    })
    it('should do nothing when there is no matching id in the store', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '123': new VideoRecord({}),
          '999': new VideoRecord({})
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '999': getDefaultVideo()
      })
      store.dispatch({
        type: UPDATE_VIDEO_INFO,
        payload: {
          id: '111'
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '999': getDefaultVideo()
      })
    })
    it('should update the title and description of an existing video', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '123': new VideoRecord({}),
          '888': new VideoRecord({
            title: 'foobar',
            description: 'great video',
            uploadStatus: new AsyncTaskStatusRecord({
              name: 'uploaded to transcoder node'
            })
          }),
          '999': new VideoRecord({})
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '888': {
          ...getDefaultVideo(),
          title: 'foobar',
          description: 'great video',
          uploadStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'uploaded to transcoder node'
          }
        },
        '999': getDefaultVideo()
      })
      store.dispatch({
        type: UPDATE_VIDEO_INFO,
        payload: {
          id: '888',
          title: 'bazbar',
          description: 'even better description'
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '888': {
          ...getDefaultVideo(),
          title: 'bazbar',
          description: 'even better description',
          uploadStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'uploaded to transcoder node'
          }
        },
        '999': getDefaultVideo()
      })
    })
  })
  describe('VIDEO_DATA_START', () => {
    it('should do nothing if there is no payload', () => {
      const store = createStore(reducer)
      expect(store.getState().toJS()).to.deep.equal({})
      store.dispatch({
        type: VIDEO_DATA_START
      })
      expect(store.getState().toJS()).to.deep.equal({})
    })
    it('should do nothing when there is no id in the payload', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '999': new VideoRecord()
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '999': getDefaultVideo()
      })
      store.dispatch({
        type: VIDEO_DATA_START,
        payload: {
          foo: 'bar'
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        '999': getDefaultVideo()
      })
    })
    it('should do nothing when there is no matching id in the store', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '123': new VideoRecord({}),
          '999': new VideoRecord({})
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '999': getDefaultVideo()
      })
      store.dispatch({
        type: VIDEO_DATA_START,
        payload: {
          id: '111'
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '999': getDefaultVideo()
      })
    })
    it('should update the blockchain status of the matching video in the store', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '123': new VideoRecord({}),
          '888': new VideoRecord({
            title: 'foobar',
            description: 'great video',
            uploadStatus: new AsyncTaskStatusRecord({
              name: 'uploaded to transcoder node'
            })
          }),
          '999': new VideoRecord({})
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '888': {
          ...getDefaultVideo(),
          title: 'foobar',
          description: 'great video',
          uploadStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'uploaded to transcoder node'
          }
        },
        '999': getDefaultVideo()
      })
      store.dispatch({
        type: VIDEO_DATA_START,
        payload: {
          id: '888',
          title: 'bazbar',
          description: 'foobaz',
          owner: 'me'
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '888': {
          ...getDefaultVideo(),
          title: 'foobar',
          description: 'great video',
          uploadStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'uploaded to transcoder node'
          },
          blockchainStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'running',
            data: {
              ...getDefaultDataStatus(),
              id: '888',
              title: 'bazbar',
              description: 'foobaz',
              owner: 'me'
            }
          }
        },
        '999': getDefaultVideo()
      })
    })
  })
  describe('VIDEO_DATA_SAVED', () => {
    it('should do nothing if there is no payload', () => {
      const store = createStore(reducer)
      expect(store.getState().toJS()).to.deep.equal({})
      store.dispatch({
        type: VIDEO_DATA_SAVED
      })
      expect(store.getState().toJS()).to.deep.equal({})
    })
    it('should do nothing when there is no id in the payload', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '999': new VideoRecord()
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '999': getDefaultVideo()
      })
      store.dispatch({
        type: VIDEO_DATA_SAVED,
        payload: {
          foo: 'bar'
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        '999': getDefaultVideo()
      })
    })
    it('should do nothing when there is no matching id in the store', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '123': new VideoRecord({}),
          '999': new VideoRecord({})
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '999': getDefaultVideo()
      })
      store.dispatch({
        type: VIDEO_DATA_SAVED,
        payload: {
          id: '111'
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '999': getDefaultVideo()
      })
    })
    it('should update the blockchain status and data of the matching video in the store', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '123': new VideoRecord({}),
          '888': new VideoRecord({
            title: 'foobar',
            description: 'great video',
            uploadStatus: new AsyncTaskStatusRecord({
              name: 'uploaded to transcoder node'
            })
          }),
          '999': new VideoRecord({})
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '888': {
          ...getDefaultVideo(),
          title: 'foobar',
          description: 'great video',
          uploadStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'uploaded to transcoder node'
          }
        },
        '999': getDefaultVideo()
      })
      store.dispatch({
        type: VIDEO_DATA_SAVED,
        payload: {
          id: '888',
          title: 'bazbar',
          description: 'foobaz',
          owner: 'me'
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '888': {
          ...getDefaultVideo(),
          title: 'bazbar',
          description: 'foobaz',
          uploadStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'uploaded to transcoder node'
          },
          blockchainStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'success',
            data: {
              ...getDefaultDataStatus(),
              id: '888',
              title: 'bazbar',
              description: 'foobaz',
              owner: 'me'
            }
          }
        },
        '999': getDefaultVideo()
      })
    })
  })
  describe('TRANSCODING_REQUESTED', () => {
    it('should do nothing if there is no payload', () => {
      const store = createStore(reducer)
      expect(store.getState().toJS()).to.deep.equal({})
      store.dispatch({
        type: TRANSCODING_REQUESTED
      })
      expect(store.getState().toJS()).to.deep.equal({})
    })
    it('should do nothing when there is no id in the payload', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '999': new VideoRecord()
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '999': getDefaultVideo()
      })
      store.dispatch({
        type: TRANSCODING_REQUESTED,
        payload: {
          foo: 'bar'
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        '999': getDefaultVideo()
      })
    })
    it('should do nothing when there is no matching id in the store', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '123': new VideoRecord({}),
          '999': new VideoRecord({})
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '999': getDefaultVideo()
      })
      store.dispatch({
        type: TRANSCODING_REQUESTED,
        payload: {
          id: '111'
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '999': getDefaultVideo()
      })
    })
    it('should update the transcoding status of the matching video in the store', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '123': new VideoRecord({}),
          '999': new VideoRecord({}),
          '888': new VideoRecord({
            title: 'foobar',
            description: 'great video',
            uploadStatus: new AsyncTaskStatusRecord({
              name: 'uploaded to transcoder node'
            })
          })
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '999': getDefaultVideo(),
        '888': {
          ...getDefaultVideo(),
          title: 'foobar',
          description: 'great video',
          uploadStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'uploaded to transcoder node'
          }
        }
      })
      store.dispatch({
        type: TRANSCODING_REQUESTED,
        payload: {
          id: '888'
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '999': getDefaultVideo(),
        '888': {
          ...getDefaultVideo(),
          title: 'foobar',
          description: 'great video',
          uploadStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'uploaded to transcoder node'
          },
          transcodingStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'requested',
            data: {
              ...getDefaultDataStatus()
            }
          }
        }
      })
    })
  })
  describe('TRANSCODING_PROGRESS', () => {
    it('should do nothing if there is no payload', () => {
      const store = createStore(reducer)
      expect(store.getState().toJS()).to.deep.equal({})
      store.dispatch({
        type: TRANSCODING_PROGRESS
      })
      expect(store.getState().toJS()).to.deep.equal({})
    })
    it('should do nothing when there is no id in the payload', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '999': new VideoRecord()
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '999': getDefaultVideo()
      })
      store.dispatch({
        type: TRANSCODING_PROGRESS,
        payload: {
          foo: 'bar'
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        '999': getDefaultVideo()
      })
    })
    it('should do nothing when there is no matching id in the store', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '123': new VideoRecord({}),
          '999': new VideoRecord({})
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '999': getDefaultVideo()
      })
      store.dispatch({
        type: TRANSCODING_PROGRESS,
        payload: {
          id: '111'
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '999': getDefaultVideo()
      })
    })
    it('should update the transcoding status of the matching video in the store', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '123': new VideoRecord({}),
          '999': new VideoRecord({}),
          '888': new VideoRecord({
            title: 'foobar',
            description: 'great video',
            uploadStatus: new AsyncTaskStatusRecord({
              name: 'uploaded to transcoder node'
            })
          })
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '999': getDefaultVideo(),
        '888': {
          ...getDefaultVideo(),
          title: 'foobar',
          description: 'great video',
          uploadStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'uploaded to transcoder node'
          }
        }
      })
      store.dispatch({
        type: TRANSCODING_PROGRESS,
        payload: {
          id: '888'
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '999': getDefaultVideo(),
        '888': {
          ...getDefaultVideo(),
          title: 'foobar',
          description: 'great video',
          uploadStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'uploaded to transcoder node'
          },
          transcodingStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'progress',
            data: {
              ...getDefaultDataStatus()
            }
          }
        }
      })
    })
  })

  describe('TRANSCODING_SUCCESS', () => {
    it('should do nothing if there is no payload', () => {
      const store = createStore(reducer)
      expect(store.getState().toJS()).to.deep.equal({})
      store.dispatch({
        type: TRANSCODING_SUCCESS
      })
      expect(store.getState().toJS()).to.deep.equal({})
    })
    it('should do nothing when there is no id in the payload', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '999': new VideoRecord()
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '999': getDefaultVideo()
      })
      store.dispatch({
        type: TRANSCODING_SUCCESS,
        payload: {
          foo: 'bar'
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        '999': getDefaultVideo()
      })
    })
    it('should do nothing when there is no matching id in the store', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '123': new VideoRecord({}),
          '999': new VideoRecord({})
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '999': getDefaultVideo()
      })
      store.dispatch({
        type: TRANSCODING_SUCCESS,
        payload: {
          id: '111'
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '999': getDefaultVideo()
      })
    })
    it('should do nothing if the payload is missing the "master" property', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '123': new VideoRecord({}),
          '999': new VideoRecord({}),
          '888': new VideoRecord({
            title: 'foobar',
            description: 'great video',
            uploadStatus: new AsyncTaskStatusRecord({
              name: 'uploaded to transcoder node'
            })
          })
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '999': getDefaultVideo(),
        '888': {
          ...getDefaultVideo(),
          title: 'foobar',
          description: 'great video',
          uploadStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'uploaded to transcoder node'
          }
        }
      })
      store.dispatch({
        type: TRANSCODING_SUCCESS,
        payload: {
          id: '888',
          sizes: {
            foo: {
              hash: 'q82gh20'
            }
          }
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '999': getDefaultVideo(),
        '888': {
          ...getDefaultVideo(),
          title: 'foobar',
          description: 'great video',
          uploadStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'uploaded to transcoder node'
          }
        }
      })
    })
    it('should update the transcoding status of the matching video in the store', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '123': new VideoRecord({}),
          '999': new VideoRecord({}),
          '888': new VideoRecord({
            title: 'foobar',
            description: 'great video',
            uploadStatus: new AsyncTaskStatusRecord({
              name: 'uploaded to transcoder node'
            })
          })
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '999': getDefaultVideo(),
        '888': {
          ...getDefaultVideo(),
          title: 'foobar',
          description: 'great video',
          uploadStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'uploaded to transcoder node'
          }
        }
      })
      store.dispatch({
        type: TRANSCODING_SUCCESS,
        payload: {
          id: '888',
          sizes: {
            master: {
              hash: 'q82gh20'
            }
          }
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '999': getDefaultVideo(),
        '888': {
          ...getDefaultVideo(),
          title: 'foobar',
          description: 'great video',
          ipfsHash: 'q82gh20',
          uploadStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'uploaded to transcoder node'
          },
          transcodingStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'success',
            data: {
              ...getDefaultDataStatus(),
              ipfsHash: 'q82gh20',
              sizes: {
                master: {
                  hash: 'q82gh20'
                }
              }
            }
          }
        }
      })
    })
  })
  describe('TRANSCODING_FAILURE', () => {
    it('should do nothing if there is no payload', () => {
      const store = createStore(reducer)
      expect(store.getState().toJS()).to.deep.equal({})
      store.dispatch({
        type: TRANSCODING_FAILURE
      })
      expect(store.getState().toJS()).to.deep.equal({})
    })
    it('should do nothing when there is no id in the payload', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '999': new VideoRecord()
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '999': getDefaultVideo()
      })
      store.dispatch({
        type: TRANSCODING_FAILURE,
        payload: {
          foo: 'bar'
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        '999': getDefaultVideo()
      })
    })
    it('should do nothing when there is no matching id in the store', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '123': new VideoRecord({}),
          '999': new VideoRecord({})
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '999': getDefaultVideo()
      })
      store.dispatch({
        type: TRANSCODING_FAILURE,
        payload: {
          id: '111'
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '999': getDefaultVideo()
      })
    })
    it('should update the transcoding status of the matching video in the store', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '123': new VideoRecord({}),
          '999': new VideoRecord({}),
          '888': new VideoRecord({
            title: 'foobar',
            ipfsHash: 'q82gh20',
            description: 'great video',
            uploadStatus: new AsyncTaskStatusRecord({
              name: 'uploaded to transcoder node'
            }),
            transcodingStatus: new AsyncTaskStatusRecord({
              name: 'running'
            })
          })
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '999': getDefaultVideo(),
        '888': {
          ...getDefaultVideo(),
          title: 'foobar',
          ipfsHash: 'q82gh20',
          description: 'great video',
          uploadStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'uploaded to transcoder node'
          },
          transcodingStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'running'
          }
        }
      })
      store.dispatch({
        type: TRANSCODING_FAILURE,
        payload: {
          id: '888'
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '999': getDefaultVideo(),
        '888': {
          ...getDefaultVideo(),
          title: 'foobar',
          description: 'great video',
          ipfsHash: 'q82gh20',
          uploadStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'uploaded to transcoder node'
          },
          transcodingStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'failed'
          }
        }
      })
    })
  })
  describe('VIDEOFETCH_SUCCESS', () => {
    it('should add a new video to an empty store', () => {
      const store = createStore(reducer)
      expect(store.getState().toJS()).to.deep.equal({})
      const newVideo = new VideoRecord({
        id: '222',
        title: 'foobar',
        ipfsHash: 'q999'
      })
      store.dispatch({
        type: VIDEOFETCH_SUCCESS,
        payload: newVideo
      })
      expect(store.getState().toJS()).to.deep.equal({
        '222': {
          ...getDefaultVideo(),
          id: '222',
          title: 'foobar',
          ipfsHash: 'q999',
          fetchStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'success'
          }
        }
      })
    })
    it('should do nothing if there is no payload', () => {
      const store = createStore(reducer)
      expect(store.getState().toJS()).to.deep.equal({})
      store.dispatch({
        type: VIDEOFETCH_SUCCESS
      })
      expect(store.getState().toJS()).to.deep.equal({})
    })
    it('should do nothing if the payload is missing an id', () => {
      const store = createStore(reducer)
      expect(store.getState().toJS()).to.deep.equal({})
      const newVideo = new VideoRecord({
        id: undefined,
        title: 'foobar',
        ipfsHash: 'q999'
      })
      store.dispatch({
        type: VIDEOFETCH_SUCCESS,
        payload: newVideo
      })
      expect(store.getState().toJS()).to.deep.equal({})
    })
    it('should add a new video to a store with other videos', () => {
      const newVideo = new VideoRecord({
        id: '222',
        title: 'foobar',
        ipfsHash: 'q999'
      })
      const store = createStore(
        reducer,
        Immutable.Map({
          '888': new VideoRecord({
            description: 'baz'
          }),
          '444': new VideoRecord({
            title: 'foo',
            transcodingStatus: new AsyncTaskStatusRecord({
              name: 'running',
              data: new DataStatusRecord({
                progress: 0
              })
            })
          })
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '888': {
          ...getDefaultVideo(),
          description: 'baz'
        },
        '444': {
          ...getDefaultVideo(),
          title: 'foo',
          transcodingStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'running',
            data: {
              ...getDefaultDataStatus(),
              progress: 0
            }
          }
        }
      })
      store.dispatch({
        type: VIDEOFETCH_SUCCESS,
        payload: newVideo
      })
      expect(store.getState().toJS()).to.deep.equal({
        '888': {
          ...getDefaultVideo(),
          description: 'baz'
        },
        '444': {
          ...getDefaultVideo(),
          title: 'foo',
          transcodingStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'running',
            data: {
              ...getDefaultDataStatus(),
              progress: 0
            }
          }
        },
        '222': {
          ...getDefaultVideo(),
          id: '222',
          title: 'foobar',
          ipfsHash: 'q999',
          fetchStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'success'
          }
        }
      })
    })
  })
  describe('VIDEOFETCH_ERROR', () => {
    it('should do nothing if there is no payload', () => {
      const store = createStore(reducer)
      expect(store.getState().toJS()).to.deep.equal({})
      store.dispatch({
        type: VIDEOFETCH_ERROR
      })
      expect(store.getState().toJS()).to.deep.equal({})
    })
    it('should do nothing when there is no id in the payload', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '999': new VideoRecord()
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '999': getDefaultVideo()
      })
      store.dispatch({
        type: VIDEOFETCH_ERROR,
        payload: {
          foo: 'bar'
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        '999': getDefaultVideo()
      })
    })
    it('should create a video and set its status to error if the video was not in the store', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '123': new VideoRecord({}),
          '999': new VideoRecord({})
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '999': getDefaultVideo()
      })
      store.dispatch({
        type: VIDEOFETCH_ERROR,
        payload: {
          id: '333',
          error: {
            message: 'bazbar'
          }
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '999': getDefaultVideo(),
        '333': {
          ...getDefaultVideo(),
          fetchStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'failed',
            data: {
              ...getDefaultDataStatus(),
              error: 'bazbar'
            }
          }
        }
      })
    })
    it('should update the fetch status of the matching video in the store', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          '123': new VideoRecord({}),
          '999': new VideoRecord({})
        })
      )
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '999': getDefaultVideo()
      })
      store.dispatch({
        type: VIDEOFETCH_ERROR,
        payload: {
          id: '999',
          error: {
            message: 'bazbar'
          }
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        '123': getDefaultVideo(),
        '999': {
          ...getDefaultVideo(),
          fetchStatus: {
            ...getDefaultAsyncTaskStatus(),
            name: 'failed',
            data: {
              ...getDefaultDataStatus(),
              error: 'bazbar'
            }
          }
        }
      })
    })
  })
})
