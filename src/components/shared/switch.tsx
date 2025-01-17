"use client";
import {Controller, useFormContext} from "react-hook-form";
import {Switch} from "../ui/switch";

type SwitchFieldProps = {
  name: string;
  className?: string;
};

const SwitchField: React.FC<SwitchFieldProps> = ({name, ...props}) => {
  const {control} = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({field}) => (
        <Switch
          {...props}
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      )}
    />
  );
};

export default SwitchField;
