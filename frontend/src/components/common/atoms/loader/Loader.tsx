// Loader.tsx
import React from 'react';
import { ImSpinner } from 'react-icons/im';

import { LoaderWrapper, RotatingIcon } from './loader.styled';

const Loader: React.FC = () => {
  return (
    <LoaderWrapper>
      <RotatingIcon>
        <ImSpinner size={60} />
      </RotatingIcon>
    </LoaderWrapper>
  );
};

export default Loader;
