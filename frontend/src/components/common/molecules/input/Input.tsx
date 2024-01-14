import React from 'react';
import { LinkProps, Link } from '../../atoms/link';
import { StyledInputContainer, StyledLabel, StyledInput, StyledErrorText } from './input.styled';

type StyleLabelProps = {
  fontSize?: string;
};

type InputProps<T> = {
  id: string;
  name: string;
  label?: string;
  labelStyle?: StyleLabelProps;
  placeholder?: string;
  value: T;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasError?: boolean;
  errorMessage?: string | undefined;
  required?: boolean;
  type: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
  helpOrInfoLink?: LinkProps | null;
  height?: string;
  backgroundColor?: string;
  borderRadius?: string;
  margin?: string;
  padding?: string;
  width?: string;
};

const Input = <T extends string | number>({
  id,
  name,
  label,
  labelStyle = { fontSize: '14px' },
  placeholder,
  value,
  onChange,
  type,
  hasError,
  errorMessage,
  required,
  minLength,
  maxLength,
  pattern,
  onKeyDown = () => {},
  onKeyUp = () => {},
  helpOrInfoLink = null,
  height = '43px',
  backgroundColor = 'inherit',
  borderRadius = '4px',
  margin = '10px 0 0 0',
  padding = '12px',
  width = '100%',
  ...props
}: InputProps<T>) => {
  return (
    <StyledInputContainer height={height} fontSize={labelStyle.fontSize ?? 'md'} width={width}>
      <StyledLabel htmlFor={id} fontSize={labelStyle.fontSize ?? '14px'}>
        {label} {required ? <span className="text-red-500">*</span> : null}
      </StyledLabel>
      {helpOrInfoLink && <Link {...helpOrInfoLink} />}

      <StyledInput
        backgroundColor={backgroundColor}
        type={type}
        minLength={minLength}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        pattern={pattern}
        height={height}
        borderRadius={borderRadius}
        margin={margin}
        padding={padding}
        {...props}
      />
      {hasError ? <StyledErrorText>*{errorMessage}</StyledErrorText> : null}
    </StyledInputContainer>
  );
};

export { Input };
export type { InputProps, StyleLabelProps };
