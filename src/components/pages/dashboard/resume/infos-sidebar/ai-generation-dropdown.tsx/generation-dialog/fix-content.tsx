import {Button} from "@/components/ui/button";
import {queryKeys} from "@/contants/query-keys";
import {ApiService} from "@/services/api";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {mergician} from "mergician";
import {useForm, useFormContext} from "react-hook-form";
import {toast} from "sonner";

type GenerateFromFixContentProps = {
  onCloseModal: () => void;
};

export const GenerateFromFixContent = ({
  onCloseModal,
}: GenerateFromFixContentProps) => {
  const {handleSubmit} = useForm();
  const {getValues, setValue} = useFormContext<ResumeData>();
  const queryClient = useQueryClient();

  const {mutate: handleGenerate, isPending} = useMutation({
    mutationFn: ApiService.fixContent,
    onSuccess: (data) => {
      const content = getValues("content");
      const generation = JSON.parse(data.data);
      const mergedContent = mergician(content, generation) as ResumeContentData;

      setValue("content", mergedContent);

      toast.success("Content fixed successfully");

      queryClient.invalidateQueries({queryKey: queryKeys.credits});

      onCloseModal();
    },
  });

  const onSubmit = async () => {
    const content = getValues("content");
    handleGenerate(content);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <p>
        This functionality enhances the current content of the curriculum and
        fix some gramatical errors.{" "}
        <strong>Remember to fill the content before generate. </strong>
      </p>

      <p>this can take some seconds. Wait for the result.</p>

      <Button className="w-max ml-auto" type="submit" disabled={isPending}>
        Generate
      </Button>
    </form>
  );
};
