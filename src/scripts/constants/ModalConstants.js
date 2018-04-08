/* @flow */

const makeModalConstant = (ModalName: string): string => `Modal${ModalName}`

export const MODAL: Object = {
  ASK_PIN: makeModalConstant('AskPin'),
  RESTORE_ACCOUNT: makeModalConstant('RestoreAccount'),
  REWRITE_SEED: makeModalConstant('RewriteSeed'),
  SECURE: makeModalConstant('Secure'),
  SET_PIN: makeModalConstant('SetPin'),
  SHOW_SEED: makeModalConstant('ShowSeed'),
  STAKE: makeModalConstant('Stake')
}
