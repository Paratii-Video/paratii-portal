/* @flow */

const makePluginConstant = (plugin: string): string => `PLAYER_PLUGIN_${plugin}`

export const PLAYER_PLUGIN: Object = {
  PLAYBACK_LEVELS: makePluginConstant('PLAYBACK_LEVEL')
}

export const PLAYER_PARAMS: Object = {
  AUTOPLAY: 'autoplay'
}
