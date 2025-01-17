import {Languages} from "lucide-react";
import {Controller, useFormContext} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SectionTitle from "@/components/shared/section-title";

type LanguageOption = {
  label: string;
  value: ResumeLanguages;
};

export const languagesOptions: LanguageOption[] = [
  {
    label: "English",
    value: "english",
  },
  {
    label: "Spanish",
    value: "spanish",
  },
  {
    label: "French",
    value: "french",
  },
  {
    label: "German",
    value: "german",
  },
  {
    label: "Italian",
    value: "italian",
  },
  {
    label: "Portuguese",
    value: "portuguese",
  },
];

export const LanguageSection = () => {
  const {control} = useFormContext<ResumeData>();

  return (
    <div>
      <SectionTitle title="Language" icon={Languages} />
      <Controller
        control={control}
        name="structure.language"
        render={({field}) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="mt-4">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              {languagesOptions.map((language) => (
                <SelectItem value={language.value} key={language.value}>
                  {language.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      ></Controller>
    </div>
  );
};
