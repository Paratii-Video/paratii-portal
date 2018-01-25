import styled, { css } from 'styled-components'

export const StyleColor = css`
  ${props => {
    if (props.white) {
      return css`color: ${props => props.theme.colors.button.white};`
    } else if (props.purple) {
      return css`color: ${props => props.theme.colors.button.purple};`
    } else {
      return css`color: ${props => props.theme.colors.button.gray};`
    }
  }}
`

export const StyleHover = css`
  transition: opacity ${props => props.theme.animation.time.repaint};

  &:hover {
    opacity: ${props => props.theme.animation.opacity.hover};
  }
`

const TheButton = styled.div`
  ${StyleColor}
  ${StyleHover}
  cursor: pointer;
`

export default TheButton
