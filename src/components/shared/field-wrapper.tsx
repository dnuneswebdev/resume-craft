import React from "react";
import {Label} from "../ui/label";
import {cn} from "@/lib/utils";
import {FieldError} from "react-hook-form";

type FieldWrapperProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
  error?: FieldError;
};

const FieldWrapper: React.FC<FieldWrapperProps> = ({
  label,
  children,
  className,
  error,
}) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label>{label}</Label>
      {children}
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
};

export default FieldWrapper;
