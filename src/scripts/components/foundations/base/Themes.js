/* @flow */

import Colors from 'components/foundations/base/Colors'

const Themes = {
  dark: {
    body: {
      background: Colors.grayDark,
      color: Colors.grayLight
    },
    header: {
      background: Colors.black,
      iconsFill: Colors.grayLight,
      logoFill: Colors.white
    },
    footer: {
      background: Colors.black,
      color: Colors.grayLight,
      logoFill: Colors.white
    },
    button: {
      white: Colors.white,
      gray: Colors.grayLight,
      purple: Colors.purple
    },
    popover: {
      border: Colors.gray,
      background: Colors.black,
      color: Colors.white
    },
    mainInput: {
      border: Colors.grayLight,
      borderFocus: Colors.purple,
      color: Colors.white,
      placeholder: Colors.grayLight,
      error: Colors.pink
    },
    MainCard: {
      background: Colors.black,
      color: Colors.white,
      padding: '80px',
      title: {
        color: Colors.white
      },
      footer: {
        background: Colors.blackDark,
        color: Colors.grayLight
      }
    },
    FilesUploader: {
      drag: {
        background: Colors.black,
        color: Colors.purple,
        color2: Colors.grayLight,
        info: Colors.purple,
        enter: Colors.blackLight
      },
      input: {
        background: Colors.blackDark,
        color: Colors.purple
      }
    }
  },
  light: {
    body: {
      background: Colors.grayLight,
      color: Colors.blackLight
    },
    header: {
      background: Colors.white,
      color: Colors.gray,
      logoFill: Colors.black
    },
    footer: {
      background: Colors.white,
      color: Colors.gray,
      logoFill: Colors.blackDark
    },
    button: {
      white: Colors.white,
      gray: Colors.grayLight,
      purple: Colors.purple
    },
    mainInput: {
      border: Colors.grayLight,
      borderFocus: Colors.purple,
      color: Colors.white,
      placeholder: Colors.grayLight
    },
    MainCard: {
      background: Colors.black,
      color: Colors.white,
      padding: '80px',
      title: {
        color: Colors.white
      },
      footer: {
        background: Colors.blackDark,
        color: Colors.white
      }
    },
    FilesUploader: {
      drag: {
        background: Colors.black,
        color: Colors.purple,
        color2: Colors.grayLight,
        enter: Colors.blackLight
      },
      input: {
        background: Colors.blackDark,
        color: Colors.purple
      }
    }
  }
}

export default Themes
