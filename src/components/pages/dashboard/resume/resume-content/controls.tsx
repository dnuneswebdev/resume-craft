import {Tooltip} from "@/components/shared/tooltip";
import {Button} from "@/components/ui/button";
import {useResumeDownload} from "@/hooks/use-resume-download";
import {Download, RotateCcw, ZoomIn, ZoomOut} from "lucide-react";
import {useControls} from "react-zoom-pan-pinch";

type TransformControlsProps = {
  title: string;
};

export const TransformControls = ({title}: TransformControlsProps) => {
  const {zoomIn, zoomOut, centerView} = useControls();
  const {handleDownloadResume, isLoading} = useResumeDownload(title);

  const controls = [
    {
      icon: ZoomIn,
      label: "Zoom In",
      onClick: () => zoomIn(0.2),
    },
    {
      icon: ZoomOut,
      label: "Zoom Out",
      onClick: () => zoomOut(0.2),
    },
    {
      icon: RotateCcw,
      label: "Reset Position",
      onClick: () => centerView(0.5),
    },
    {
      icon: Download,
      label: "Download PDF",
      onClick: () => handleDownloadResume(),
      disabled: isLoading,
    },
  ];

  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-4 z-10 bg-background border border-muted py-3 px-4 rounded-full items-center flex gap-2">
      {controls.map((control) => (
        <Tooltip key={control.label} content={control.label}>
          <Button
            variant="secondary"
            className="w-6 h-6 bg-transparent"
            size="icon"
            onClick={control.onClick}
            disabled={control.disabled}
          >
            <control.icon size={16} />
          </Button>
        </Tooltip>
      ))}
    </div>
  );
};
