import Colors from './Colors'

const Themes = {
  dark: {
    body: {
      background: Colors.grayDark,
      color: Colors.grayLight
    },
    header: {
      background: Colors.black,
      color: Colors.grayLight,
      logoFill: Colors.white
    },
    footer: {
      background: Colors.black,
      color: Colors.grayLight,
      logoFill: Colors.white
    },
    mainInput: {
      border: Colors.grayLight,
      color: Colors.white,
      placeholder: Colors.grayLight
    }
  },
  light: {
    body: {
      background: Colors.grayLight,
      color: Colors.blackLight
    },
    header: {
      background: Colors.black,
      color: Colors.grayLight,
      logoFill: Colors.white
    },
    footer: {
      background: Colors.black,
      color: Colors.grayLight,
      logoFill: Colors.white
    },
    mainInput: {
      border: Colors.grayLight,
      color: Colors.white,
      placeholder: Colors.grayLight
    }
  }
}

export default Themes
