/* @flow */

export const TIPPING_PTI_AMOUNTS: Array<number> = [10, 15, 20, 25]

export const TIPPING_UI_STEPS: { [key: string]: string } = {
  CHOOSE_AMOUNT: 'CHOOSE_AMOUNT',
  CONFIRM_TIP: 'CONFIRM_TIP',
  TIP_COMPLETE: 'TIP_COMPLETE'
}

export const MINIMUM_VIEWED_SECONDS_FOR_TIP_PROMPT: number = 3

export const MAXIMUM_LAST_SECURED_FOR_PASSWORD_PROMPT_SECONDS: number = 60
