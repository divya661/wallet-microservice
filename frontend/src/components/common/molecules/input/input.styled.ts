import styled from '@emotion/styled';

import { fontSizes } from '../../atoms/text/text.styled';
import { StyleLabelProps } from './Input';

const StyledInputContainer = styled.div<{ height: string; fontSize: string; width: string }>`
  height: ${({ height, fontSize }) => `calc(${height} + ${fontSizes[fontSize]})`};
  flex-shrink: 0;
  margin-bottom: 16px;
  border-radius: 4px;
  width: ${({ width }) => width};
`;

const StyledLabel = styled.label<Required<StyleLabelProps>>`
  margin: 0;
  color: #242525;
  font-size: ${({ fontSize }) => fontSizes[fontSize]};
  font-weight: 600;
  font-style: normal;
  line-height: normal;
`;

const StyledInput = styled.input<{
  height: string;
  backgroundColor: string;
  borderRadius: string;
  margin: string;
  padding: string;
}>`
  color: #343436;
  box-sizing: border-box;
  padding: 12px;
  font-size: 16px;
  font-style: normal;
  background-color: ${({ backgroundColor }) => backgroundColor ?? 'inherit'};
  font-weight: 400;
  line-height: normal;
  width: 100%;
  height: ${({ height }) => height};
  flex-shrink: 0;
  border-radius: ${({ borderRadius }) => borderRadius};
  border: 1.5px solid #35373b;
  margin: ${({ margin }) => margin ?? '10px 0 0 0'};
  display: flex;
`;

const StyledErrorText = styled.p`
  color: red;
  font-size: 0.75rem;
  font-style: italic;
`;

export { StyledInputContainer, StyledLabel, StyledInput, StyledErrorText };
