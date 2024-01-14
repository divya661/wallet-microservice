import React, { ChangeEvent, useState } from 'react';
import { StyledLabel, StyledSelect, StyledOption } from './select.styled';
import { Text } from '../text';
import { Container } from 'components/common/molecules/container';

type Options<T> = {
  label: string;
  value: T;
};
interface SelectProps<T> {
  label: string;
  options: Options<T>[];
  width?: string;
  handleTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const Select = <T extends string | number>({ label, options, width = '100%', handleTypeChange }: SelectProps<T>) => {
  const [type] = useState<T | undefined>();

  return (
    <Container width={width}>
      <StyledLabel>
        <Text fontWeight="600" marginBottom="10px" textAlign="left">
          {label}
        </Text>
        <StyledSelect value={type} onChange={handleTypeChange}>
          {options.map((option) => {
            return (
              <StyledOption key={option.value} value={option.value}>
                {option.label}
              </StyledOption>
            );
          })}
        </StyledSelect>
      </StyledLabel>
    </Container>
  );
};

export { Select };
export type { SelectProps, Options };
