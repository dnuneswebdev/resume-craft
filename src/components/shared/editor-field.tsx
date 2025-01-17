"use client";
import {Control, Controller, useFormContext} from "react-hook-form";
import FieldWrapper from "./field-wrapper";
import {Editor} from "../pages/dashboard/resume/infos-sidebar/editor";

type EditorFieldProps = {
  name: string;
  label: string;
  containerClassName?: string;
  className?: string;
  required?: boolean;
  control?: Control<any, any>;
};

export const EditorField = ({
  name,
  label,
  required,
  containerClassName,
  control: customControl, //esse custom control foi adicionado para referenciar o form de um componente específico
  ...props
}: EditorFieldProps) => {
  const {control} = useFormContext();

  return (
    <Controller
      control={customControl ?? control}
      name={name}
      rules={{required: required && "This field is required"}}
      render={({field, fieldState}) => (
        <FieldWrapper
          label={label}
          className={containerClassName}
          error={fieldState?.error}
        >
          <Editor {...props} {...field} />
        </FieldWrapper>
      )}
    />
  );
};
