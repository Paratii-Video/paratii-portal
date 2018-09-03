import { css } from 'styled-components'

export const FlexCenterStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const AbsoluteFullStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const OpacityStyleHover = css`
  backface-visibility: hidden;
  transition: all 0.5s;

  &:focus,
  &:hover {
    opacity: 0.7;
  }
`
