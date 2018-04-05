/* @flow */

import styled from 'styled-components'

/* prettier-ignore */
export const ProgressBarWrapper = styled.div`
  width: 100%;
  height: ${props => props.small ? '2px' : '3px'};
  overflow: hidden;
  position: relative;
  background: ${props => props.theme.colors.bar.base};`

const ProgressBar = styled.div`
  left: -100%;
  position: absolute;
  height: 100%;
  background: linear-gradient(
    to right,
    ${({ theme }) => `${theme.colors.bar.from}, ${theme.colors.bar.to}`}
  );
  background: ${props =>
    props.colorful ? null : props.theme.colors.bar.buffer};
  transform: translate3d(
    ${props => Math.min(props.current / props.total * 100, 100) + '%'},
    0,
    0
  );
  width: 100%;
`

export default ProgressBar
