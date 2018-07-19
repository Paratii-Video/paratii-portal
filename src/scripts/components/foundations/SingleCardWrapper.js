import styled from 'styled-components'
import { CARD_MAX_WIDTH } from 'constants/UIConstants'

const SingleCardWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: ${CARD_MAX_WIDTH};
  width: 100%;

  @media (max-width: 1024px) {
    max-width: initial;
  }
`

export default SingleCardWrapper
