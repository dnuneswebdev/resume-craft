"use client";
import {Controller, useFormContext} from "react-hook-form";
import {Slider} from "../ui/slider";
import FieldWrapper from "./field-wrapper";

type SliderFieldProps = {
  name: string;
  label: string;
  containerClassName?: string;
  required: boolean;
};

export const SliderField = ({
  name,
  label,
  containerClassName,
  required,
}: SliderFieldProps) => {
  const {control} = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: required && "Required Field",
      }}
      defaultValue={1}
      render={({field, fieldState}) => (
        <FieldWrapper
          label={label}
          className={containerClassName}
          error={fieldState?.error}
        >
          <div className="flex items-center gap-4">
            <Slider
              step={1}
              defaultValue={[1]}
              min={0}
              max={5}
              value={[field.value]}
              onValueChange={(value) => field.onChange(value[0])}
            />
            <p className="font-bold">
              {field.value === 0 ? "Hidden" : field.value}
            </p>
          </div>
        </FieldWrapper>
      )}
    />
  );
};
