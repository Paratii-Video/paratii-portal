import styled from 'styled-components'

export default styled.input`
  height: 25px;
  font-size: ${props => props.theme.fonts.form.input};
  font-weight: 500;
  display: block;
  border: none;
  border-bottom: 2px solid #ddd;
  background-color: rgba(0, 0, 0, 0);
  margin-bottom: 15px;
`
