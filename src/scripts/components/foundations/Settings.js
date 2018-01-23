// Settings

export const Colors = {
  white: '#fff',
  grayLight: '#828282',
  gray: '#c7c7c7',
  grayDark: '#2E3133',
  blackLight: '#262C30',
  black: '#21262A',
  blackDark: '#1B1F24',
  purple: '#7D70FF',
  purpleGradient: 'linear-gradient(to bottom, \'#9149EF\', \'#7D70FF\' )',
  pink: '##E13D84',
  pinkGradient: 'linear-gradient(to bottom, \'#E72061\', \'#DC3DCC\' )'
}

export const Fonts = {
  family: 'Roboto'
}

export const Sizes = {
  mainHeader: {
    height: '96px'
  },
  mainFooter: {
    height: '192px'
  },
  mainHeaderLogo: {
    height: '29px',
    width: '98px'
  },
  searchInputLogo: '17px',
  mainInput: {
    height: '44px'
  }
}

export const Themes = {
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
