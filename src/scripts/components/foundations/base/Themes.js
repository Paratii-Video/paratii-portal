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
          background: Colors.grayLight,
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
        background: Colors.blackLight,
        hoverBackground: Colors.grayMedium,
        titleColor: Colors.white,
        descriptionColor: Colors.gray,
        border: Colors.grayDark
      },
      nextButton: Colors.gray
    }
  }
}

export default Themes
