import {EditorField} from "@/components/shared/editor-field";
import {InputField} from "@/components/shared/input";
import {Button} from "@/components/ui/button";
import {queryKeys} from "@/contants/query-keys";
import {ApiService} from "@/services/api";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useForm, useFormContext} from "react-hook-form";
import {toast} from "sonner";

type FormData = {
  jobTitle: string;
  jobDescription: string;
};

type GenerationData = {
  headline: string;
  summary: string;
  skills: {
    name: string;
    keywords: string;
  }[];
};

type GenerateFromJobTitleProps = {
  onCloseModal: () => void;
};

export const GenerateFromJobTitle = ({
  onCloseModal,
}: GenerateFromJobTitleProps) => {
  const {control, handleSubmit} = useForm<FormData>();
  const {setValue} = useFormContext<ResumeData>();
  const queryClient = useQueryClient();

  const {mutate: handleGenerate, isPending} = useMutation({
    mutationFn: ApiService.generateContentForJob,
    onSuccess: (data) => {
      const genereatedContent = JSON.parse(data?.data) as GenerationData;

      setValue("content.infos.headline", genereatedContent.headline);
      setValue("content.summary", genereatedContent.summary);
      setValue("content.skills", genereatedContent.skills);

      toast.success("Content generated successfully");

      queryClient.invalidateQueries({queryKey: queryKeys.credits});

      onCloseModal();
    },
  });

  const onSubmit = async (formData: FormData) => {
    await handleGenerate(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <InputField
        control={control}
        name="jobTitle"
        label="Job title"
        placeholder="Front-End Developer"
        required
      />
      <EditorField
        control={control}
        name="jobDescription"
        label="Job description (optional)"
        className="min-h-[200px] max-h-[300px]"
        required
      />
      <Button className="w-max ml-auto" type="submit" disabled={isPending}>
        Generate
      </Button>
    </form>
  );
};
