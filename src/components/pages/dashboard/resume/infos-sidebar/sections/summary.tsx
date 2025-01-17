"use client";

import SectionTitle from "@/components/shared/section-title";
import {ScrollText} from "lucide-react";
import {Controller, useFormContext} from "react-hook-form";
import {Editor} from "../editor";

export const SummarySection = () => {
  const {control} = useFormContext();

  return (
    <div>
      <SectionTitle title="About You" icon={ScrollText} />
      <Controller
        control={control}
        name="content.summary"
        render={({field}) => (
          <Editor {...field} className="min-h-[200px] max-h-[300px] mt-4" />
        )}
      />
    </div>
  );
};
