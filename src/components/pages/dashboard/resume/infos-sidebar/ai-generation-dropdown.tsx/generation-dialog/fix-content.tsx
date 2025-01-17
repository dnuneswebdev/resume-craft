import {Button} from "@/components/ui/button";
import {ApiService} from "@/services/api";
import {useMutation} from "@tanstack/react-query";
import {mergician} from "mergician";
import {useForm, useFormContext} from "react-hook-form";
import {toast} from "sonner";

type GenerateFromFixContentProps = {
  onCloseModal: () => void;
};

export const GenerateFromFixContent = ({
  onCloseModal,
}: GenerateFromFixContentProps) => {
  const {formState, handleSubmit} = useForm();
  const {getValues, setValue} = useFormContext<ResumeData>();

  const {mutateAsync: handleGenerate} = useMutation({
    mutationFn: ApiService.fixContent,
  });

  const onSubmit = async () => {
    const content = getValues("content");
    const data = await handleGenerate(content);
    const generation = JSON.parse(data.data);
    const mergedContent = mergician(content, generation) as ResumeContentData;

    setValue("content", mergedContent);

    toast.success("Content fixed successfully");

    onCloseModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <p>
        This functionality enhances the current content of the curriculum and
        fix some gramatical errors.{" "}
        <strong>Remember to fill the content before generate. </strong>
      </p>

      <p>this can take some seconds. Wait for the result.</p>

      <Button
        className="w-max ml-auto"
        type="submit"
        disabled={formState.isSubmitting}
      >
        Generate
      </Button>
    </form>
  );
};
