import React from 'react';
import { StyledCardContainer } from './card.styled';

type CardProps = {
  children: any;
  backgroundColor?: string;
  border?: string;
  borderRadius?: string;
  width: string;
  height: string;
  paddingY?: string;
  paddingX?: string;
  marginY?: string;
  marginX?: string;
  flexDirection?: string;
  justifyContent?: string;
  gap?: string;
};

const Card = ({
  children,
  backgroundColor = 'white',
  border = '2px solid',
  borderRadius = '10px',
  width,
  height,
  paddingY = '0',
  paddingX = '0',
  marginY = '0',
  marginX = '0',
  flexDirection = 'column',
  justifyContent = 'start',
  gap = '0',
  ...props
}: CardProps) => {
  return (
    <StyledCardContainer
      backgroundColor={backgroundColor}
      border={border}
      borderRadius={borderRadius}
      width={width}
      height={height}
      paddingX={paddingX}
      paddingY={paddingY}
      marginX={marginX}
      marginY={marginY}
      flexDirection={flexDirection}
      justifyContent={justifyContent}
      gap={gap}
      {...props}
    >
      {children}
    </StyledCardContainer>
  );
};

export { Card };
export type { CardProps };
