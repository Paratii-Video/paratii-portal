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
      placeholder: Colors.grayLight
    },
    FilesUploader: {
      fake: {
        background: Colors.black,
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
    }
  }
}

export default Themes
