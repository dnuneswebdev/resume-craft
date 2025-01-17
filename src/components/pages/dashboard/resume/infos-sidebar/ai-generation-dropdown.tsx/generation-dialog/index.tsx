import {BaseDialogProps, Dialog} from "@/components/shared/dialog";
import {GenerateFromJobTitle} from "./job-title";
import {GenerateFromFixContent} from "./fix-content";
import {GenerateTranslation} from "./translate";

type GenerationDialogProps = BaseDialogProps & {
  mode: AIGenerationMode;
  setOpen: (open: boolean) => void;
};

export const GenerationDialog = ({mode, ...props}: GenerationDialogProps) => {
  const onCloseModal = () => {
    props.setOpen(false);
  };

  const configPerMode: Record<AIGenerationMode, JSX.Element> = {
    JOB_TITLE: <GenerateFromJobTitle onCloseModal={onCloseModal} />,
    FIX_CONTENT: <GenerateFromFixContent onCloseModal={onCloseModal} />,
    TRANSLATE_CONTENT: <GenerateTranslation onCloseModal={onCloseModal} />,
  };

  const content = configPerMode[mode] || <div>Invalid mode</div>;

  return (
    <Dialog
      {...props}
      title="Artificial Intelligence"
      description="The generated content will overwrite the existing fields. Each generation costs 1 credit."
      content={content}
    />
  );
};
