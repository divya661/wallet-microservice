import styled from '@emotion/styled';

import { FormProps } from './Form';

const StyledForm = styled.form<Required<FormProps>>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  paddingy: ${({ paddingY }) => paddingY};
  paddingx: ${({ paddingX }) => paddingX};
  marginy: ${({ marginY }) => marginY};
  marginx: ${({ marginX }) => marginX};
  justify-content: ${({ justifyContent }) => justifyContent};
`;

export { StyledForm };
