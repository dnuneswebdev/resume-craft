"use client";
import {Control, Controller, useFormContext} from "react-hook-form";
import {ComponentProps, ReactNode} from "react";
import {Input} from "../ui/input";
import FieldWrapper from "./field-wrapper";

type InputFieldProps = ComponentProps<typeof Input> & {
  name: string;
  label: string;
  containerClassName?: string;
  extraContent?: (value: string) => ReactNode;
  control?: Control<any, any>;
};

export const InputField = ({
  name,
  label,
  required,
  containerClassName,
  extraContent,
  control: customControl, //esse custom control foi adicionado para referenciar o form de um componente específico
  ...props //caso contrario, ele pega o form do app inteiro por padrão por conta do useFormContext
}: InputFieldProps) => {
  const {control} = useFormContext();

  return (
    <Controller
      control={customControl ?? control} //se customControl for passado, ele usa ele, senão usa o control do useFormContext
      name={name}
      rules={{required: required && "This field is required"}}
      render={({field, fieldState}) => (
        <FieldWrapper
          label={label}
          className={containerClassName}
          error={fieldState?.error}
        >
          <Input {...field} {...props} />
          {extraContent && extraContent(field.value)}
        </FieldWrapper>
      )}
    />
  );
};
