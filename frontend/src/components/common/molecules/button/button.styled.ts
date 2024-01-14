import styled from '@emotion/styled';

import { ButtonProps } from './Button';

const StyledButton = styled.button<Required<ButtonProps>>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  border-radius: ${({ borderRadius }) => borderRadius};
  border-color?: ${({ borderColor }) => borderColor};
  border-width?: ${({ borderWidth }) => borderWidth};
  background-color: ${({ backGroundColor }) => backGroundColor};
  color: ${({ color }) => color};
  float: ${({ float }) => float};
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export { StyledButton };
