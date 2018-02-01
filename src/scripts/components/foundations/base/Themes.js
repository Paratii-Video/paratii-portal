import Colors from './Colors'

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
    mainInput: {
      border: Colors.grayLight,
      color: Colors.white,
      placeholder: Colors.grayLight,
      error: Colors.pink
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
      color: Colors.white,
      placeholder: Colors.grayLight
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
