/* @flow */

const makeModalConstant = (ModalName: string): string => `Modal${ModalName}`

export const MODAL: Object = {
  ASK_PIN: makeModalConstant('AskPin'),
  RESTORE_ACCOUNT: makeModalConstant('RestoreAccount'),
  REWRITE_SEED: makeModalConstant('RewriteSeed'),
  CREATE_PASSWORD: makeModalConstant('ModalCreatePassword'),
  PROFILE: makeModalConstant('ModalProfile'),
  SECURE: makeModalConstant('Secure'),
  GREAT_POWER: makeModalConstant('GreatPower'),
  SET_PIN: makeModalConstant('SetPin'),
  SHOW_SEED: makeModalConstant('ShowSeed'),
  STAKE: makeModalConstant('Stake')
}
