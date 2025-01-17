"use client";
import {Controller, useFormContext} from "react-hook-form";
import FieldWrapper from "./field-wrapper";
import {IconInput} from "./icon";

type IconFieldProps = {
  name: string;
  label: string;
  containerClassName?: string;
  required?: boolean;
};

export const IconField = ({
  name,
  label,
  required,
  containerClassName,
  ...props
}: IconFieldProps) => {
  const {control} = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={{required: required && "This field is required"}}
      render={({field, fieldState}) => (
        <FieldWrapper
          label={label}
          className={containerClassName}
          error={fieldState?.error}
        >
          <IconInput {...props} {...field} />
        </FieldWrapper>
      )}
    />
  );
};
