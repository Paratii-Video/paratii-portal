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
    TextField: {
      border: Colors.grayLight,
      borderFocus: Colors.purple,
      color: Colors.grayLight,
      placeholder: Colors.grayLight,
      error: Colors.pink
    },
    VideoPlayer: {
      header: {
        title: Colors.white,
        icons: Colors.white
      },
      controls: {
        time: Colors.white
      },
      levels: {
        color: Colors.white,
        selectedBackground: Colors.blackDark
      }
    },
    Popover: {
      background: Colors.blackLightTransparent,
      color: Colors.white,
      shadow: '0 3px 6px rgba(32, 35, 46, 0.7)'
    },
    Radio: {
      title: Colors.grayLight,
      label: Colors.white,
      border: Colors.grayLight,
      active: Colors.purple
    },
    VideoForm: {
      header: {
        border: Colors.blackAlt,
        title: Colors.white,
        subtitle: Colors.grayLight,
        subtitle2: Colors.purple
      },
      info: {
        imageBackground: Colors.blackDark,
        icon: Colors.white,
        time: {
          background: Colors.black,
          color: Colors.white
        },
        progress: {
          success: Colors.purple,
          color: Colors.grayLight,
          icon: Colors.black,
          iconBg: Colors.purple,
          background: Colors.gray,
          barFrom: Colors.purpleGradientFrom,
          barTo: Colors.purpleGradientTo
        },
        text: Colors.grayLight
      }
    },
    bar: {
      from: Colors.purpleGradientFrom,
      to: Colors.purpleGradientTo,
      scrubber: Colors.white,
      base: Colors.gray,
      buffer: Colors.grayLight
    },
    VideoDescription: {
      icon: Colors.grayLight
    },
    Nav: {
      search: {
        background: Colors.grayDark
      }
    },
    Search: {
      results: {
        background: Colors.blackAlt,
        hoverBackground: Colors.grayDark,
        titleColor: Colors.white,
        authorColor: Colors.whiteTransparent,
        descriptionColor: Colors.gray,
        border: Colors.grayDark,
        duration: {
          text: Colors.white,
          background: Colors.blackDarkTransparent
        },
        searchTerm: {
          prompt: Colors.grayLight,
          term: Colors.white
        },
        zeroState: {
          text: Colors.white
        }
      },
      nextButton: Colors.gray
    },
    ProfileCuration: {
      ChallengeBackgroundOneFrom: Colors.purpleGradientFrom,
      ChallengeBackgroundOneTo: Colors.purpleGradientTo,
      ChallengeBackgroundTwoFrom: Colors.pink,
      ChallengeBackgroundTwoTo: Colors.purple,
      VotingBarOne: Colors.green,
      VotingBarTwo: Colors.pink,
      ChallengeSequenceDot: Colors.white
    },
    ProfileMyVideos: {
      headerImageBackground: Colors.blackDark,
      headerInfoBackground: Colors.blackAlt,
      ProfilePictureBackground: Colors.blackAlt,
      filterBackground: Colors.blackDark
    }
  }
}

export default Themes
