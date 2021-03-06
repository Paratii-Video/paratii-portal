/* @flow */

import styled from 'styled-components'

/* prettier-ignore */
export const ProgressBarContainer = styled.div`
  width: 100%;
  height: ${props => props.small ? '2px' : '3px'};
  overflow: hidden;
  position: relative;
  background: ${props => props.theme.colors.text.secondary};`

const ProgressBar = styled.div.attrs({
  style: ({ current, total }) => ({
    transform: `translateX(${Math.min(current / total * 100, 100)}%)`
  })
})`
  left: -100%;
  position: absolute;
  height: 100%;
  background: linear-gradient(
    to right,
    ${({ theme }) =>
    `${theme.colors.button.primaryFrom}, ${theme.colors.button.primaryTo}`}
  );
  background: ${props =>
    props.colorful ? null : props.theme.colors.text.primary};
  width: 100%;
`

export default ProgressBar
