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

export const Themes = {
  dark: {
    body: {
      background: Colors.grayDark
    },
    header: {
      background: Colors.black,
      logoFill: Colors.white
    }
  },
  light: {
    body: {
      background: Colors.grayLight
    },
    header: {
      background: Colors.white,
      logoFill: Colors.black
    }
  }
}

export const Fonts = {
  family: 'Roboto'
}

export const Sizes = {
  mainHeader: {
    height: '96px'
  },
  mainHeaderLogo: {
    height: '29px',
    width: '98px'
  }
}
