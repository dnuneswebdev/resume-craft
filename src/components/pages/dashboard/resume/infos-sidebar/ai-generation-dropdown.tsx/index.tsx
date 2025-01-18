import {Button} from "@/components/ui/button";
import {
  BadgeCent,
  Bot,
  BriefcaseBusiness,
  CirclePercent,
  Languages,
  PencilLine,
} from "lucide-react";
import React, {useState} from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {GenerationDialog} from "./generation-dialog";
import {useQuery} from "@tanstack/react-query";
import {ApiService} from "@/services/api";
import {Skeleton} from "@/components/ui/skeleton";
import {BuyCreditsDialog} from "./buy-credits-dialog";
import {queryKeys} from "@/contants/query-keys";
import {toast} from "sonner";

const AIGenerationDropdown: React.FC = () => {
  const [generationMode, setGenerationMode] = useState<AIGenerationMode | null>(
    null
  );
  const [showCreditsDialog, setShowCreditsDialog] = useState(false);

  const onAction = (mode: AIGenerationMode) => {
    if (!credits) {
      toast.error("You don't have enough credits to generate content.", {
        action: {
          label: "Buy credits",
          onClick: () => setShowCreditsDialog(true),
        },
      });
      return;
    }

    setGenerationMode(mode);
  };

  const actions = [
    {
      label: "Buy credits",
      icon: CirclePercent,
      onClick: () => setShowCreditsDialog(true),
    },
    {
      label: "Generating content for job vacancies",
      icon: BriefcaseBusiness,
      onClick: () => onAction("JOB_TITLE"),
    },
    {
      label: "Improve and correct existing content",
      icon: PencilLine,
      onClick: () => onAction("FIX_CONTENT"),
    },
    {
      label: "Translate existing content",
      icon: Languages,
      onClick: () => onAction("TRANSLATE_CONTENT"),
    },
  ];

  const {data: credits, isLoading} = useQuery({
    queryKey: queryKeys.credits,
    queryFn: ApiService.getCredits,
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="gap-2 text-xs px-2.5 py-1 h-9">
            <Bot size={20} />
            AI Generation
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={10} align="start">
          <DropdownMenuLabel className="text-muted-foreground text-xs flex items-center gap-1">
            You have {""}{" "}
            <strong className="text-foreground inline-flex gap-0.5 items-center">
              <BadgeCent size={14} />
              {isLoading ? <Skeleton className="w-5 h-5" /> : credits}{" "}
              {credits === 1 ? "credit" : "credits"}
            </strong>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actions.map((action) => (
            <DropdownMenuItem
              key={action.label}
              className="gap-2"
              onClick={action.onClick}
              disabled={isLoading}
            >
              <action.icon size={18} className="text-muted-foreground" />
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <BuyCreditsDialog
        open={showCreditsDialog}
        setOpen={setShowCreditsDialog}
      />

      {!!generationMode && (
        <GenerationDialog
          mode={generationMode}
          open={!!generationMode}
          setOpen={(value) => {
            if (!value) setGenerationMode(null);
          }}
        />
      )}
    </>
  );
};

export default AIGenerationDropdown;
