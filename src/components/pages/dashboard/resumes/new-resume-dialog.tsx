"use client";

import {BaseDialogProps, Dialog} from "@/components/shared/dialog";
import {InputField} from "@/components/shared/input";
import {Button} from "@/components/ui/button";
import {createResume} from "@/db/actions";
import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/navigation"; //pegar o router do client. se fosse do server seria do router
import {FormProvider, useForm} from "react-hook-form";
import {toast} from "sonner";

type FormData = {
  title: string;
};

const NewResumeDialog: React.FC<any> = (props: BaseDialogProps) => {
  const methods = useForm<FormData>();
  const router = useRouter();
  const {mutate: handleCreateResume, isPending} = useMutation({
    mutationFn: createResume,
    onSuccess: (resume) => {
      toast.success("Resume created successfully! 😀");
      router.push(`/dashboard/resumes/${resume.id}`);
    },
  });

  const onSubmit = async (data: FormData) => {
    handleCreateResume(data.title);
  };

  return (
    <Dialog
      {...props}
      title="Create new resume"
      description="Choose a title for your resume"
      content={
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="felx flex-col"
          >
            <InputField label="Title" name="title" required />
            <Button
              type="submit"
              className="w-max mt-6 ml-auto"
              disabled={isPending}
            >
              Save
            </Button>
          </form>
        </FormProvider>
      }
    ></Dialog>
  );
};

export default NewResumeDialog;
