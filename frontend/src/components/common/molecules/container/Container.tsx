import React from 'react';
import { StyledContainer } from './container.styled';

type ContainerProps = {
  children: any;
  backgroundColor?: string;
  border?: string;
  borderRadius?: string;
  width?: string;
  height?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  display?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  gap?: string;
};

const Container = ({
  children,
  backgroundColor = 'inherit',
  border = '0',
  borderRadius = '0',
  width = 'inherit',
  height = '100%',
  paddingTop = '0',
  paddingBottom = '0',
  paddingLeft = '0',
  paddingRight = '0',
  marginTop = '0',
  marginBottom = '0',
  gap = '0',
  marginLeft = '0',
  marginRight = '0',
  display = 'flex',
  flexDirection = 'column',
  justifyContent = 'start',
  alignItems = 'start',
  ...props
}: ContainerProps) => {
  return (
    <StyledContainer
      backgroundColor={backgroundColor}
      border={border}
      borderRadius={borderRadius}
      width={width}
      height={height}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      display={display}
      flexDirection={flexDirection}
      justifyContent={justifyContent}
      alignItems={alignItems}
      gap={gap}
      {...props}
    >
      {children}
    </StyledContainer>
  );
};

export { Container };
export type { ContainerProps };
