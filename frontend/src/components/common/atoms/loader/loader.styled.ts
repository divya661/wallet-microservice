// Loader.styled.ts
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  z-index: 9999;
  background-color: #f0f0f0;
  opacity: 0.3;
`;

export const RotatingIcon = styled.div`
  ${css`
    animation: rotate 2s infinite linear;

    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `}
`;
