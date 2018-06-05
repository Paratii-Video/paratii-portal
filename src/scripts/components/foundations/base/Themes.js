/* @flow */

import Colors from 'components/foundations/base/Colors'

const Themes = {
  dark: {
    body: {
      background: Colors.grayDark,
      color: Colors.grayLight,
      primary: Colors.purple
    },
    header: {
      background: Colors.blackLight,
      icon: Colors.grayLight,
      logo: Colors.white
    },
    footer: {
      background: Colors.black,
      color: Colors.white,
      color2: Colors.grayLight,
      logoFill: Colors.white
    },
    button: {
      white: Colors.white,
      gray: Colors.grayLight,
      purple: Colors.purple,
      pink: Colors.pink
    },
    Modal: {
      background: Colors.blackLight,
      content: Colors.blackDark,
      close: Colors.grayLight,
      title: Colors.purple,
      hightlight: Colors.white,
      color: Colors.grayLight
    },
    Popover: {
      background: Colors.blackLightTransparent,
      color: Colors.white,
      shadow: '0 3px 6px rgba(32, 35, 46, 0.7)'
    },
    TextField: {
      border: Colors.grayLight,
      borderFocus: Colors.purple,
      color: Colors.white,
      placeholder: Colors.grayLight,
      error: Colors.pink
    },
    Radio: {
      title: Colors.grayLight,
      label: Colors.white,
      border: Colors.grayLight,
      active: Colors.purple
    },
    MainCard: {
      background: Colors.black,
      color: Colors.white,
      title: Colors.white,
      subtitle: Colors.white,
      subtitleIcon: Colors.purple,
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
        enter: Colors.blackTransparent
      },
      input: {
        background: Colors.blackDark,
        color: Colors.purple
      },
      supportedFileTypes: {
        color: Colors.grayLight
      }
    },
    VideoList: {
      selectedBackground: Colors.blackLight,
      title: Colors.purple,
      filename: Colors.white,
      status: Colors.grayLight,
      done: Colors.purple
    },
    VideoForm: {
      header: {
        border: Colors.grayMedium,
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
    VideoPlayer: {
      background: Colors.black,
      header: {
        title: Colors.white,
        icons: Colors.white
      },
      controls: {
        background: 'transparent',
        time: Colors.white
      },
      levels: {
        color: Colors.white,
        selectedBackground: Colors.blackDark
      },
      share: {
        background: Colors.blackDarkTransparent
      }
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
    UploadListItem: {
      background: Colors.black
    },
    LandingPage: {
      headerBackground: Colors.blackLight,
      headerContentBackground: Colors.blackTransparent,
      VideoLinkBackground: Colors.grayDark,
      VideoLinkColor: Colors.white,
      listItemBackground: Colors.blackAlt,
      listItemTimeBackground: Colors.blackTransparent,
      listItemTimeColor: Colors.white
    }
  }
}

export default Themes
