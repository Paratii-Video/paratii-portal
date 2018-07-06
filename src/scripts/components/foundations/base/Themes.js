/* @flow */

import Colors from 'components/foundations/base/Colors'

const Themes = {
  dark: {
    background: {
      body: Colors.grayDark,
      primary: Colors.blackAlt,
      secondary: Colors.blackDark,
      tertiary: Colors.blackLight,
      transparent: Colors.blackTransparent
    },
    button: {
      color: Colors.white,
      primary: Colors.grayAlt,
      accent: Colors.purple,
      warn: Colors.white,
      primaryFrom: Colors.purpleGradientFrom,
      primaryTo: Colors.purpleGradientTo,
      accentFrom: Colors.greenGradientFrom,
      accentTo: Colors.greenGradientTo,
      warnFrom: Colors.redGradientFrom,
      warnTo: Colors.redGradientTo,
      shadow: '0 1px 6px rgba(0, 0, 0, 0.2)'
    },
    text: {
      primary: Colors.grayLight,
      secondary: Colors.gray,
      accent: Colors.white,
      warn: Colors.purple,
      error: Colors.red
    },
    header: {
      logo: Colors.white,
      shadow: '0 0 20px rgba(0,0,0,0.16)'
    },
    footer: {
      logo: Colors.white
    },
    LandingPage: {
      headerShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
    },
    Card: {
      shadow: '0 0 6px rgba(0, 0, 0, 0.2)'
    },
    Modal: {
      shadow: '0 0 6px rgba(0, 0, 0, 0.2)'
    },
    Popover: {
      shadow: '0 3px 6px rgba(32, 35, 46, 0.7)'
    },
    ProfileCuration: {
      ChallengeBackgroundOneFrom: Colors.purpleGradientFrom,
      ChallengeBackgroundOneTo: Colors.purpleGradientTo,
      ChallengeBackgroundTwoFrom: Colors.pink,
      ChallengeBackgroundTwoTo: Colors.purple,
      VotingBarOne: Colors.green,
      VotingBarTwo: Colors.pink,
      ChallengeSequenceDot: Colors.white
    }
  }
}

export default Themes
