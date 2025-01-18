import {Dialog} from "@/components/shared/dialog";
import {Button} from "@/components/ui/button";
import {Skeleton} from "@/components/ui/skeleton";
import {queryKeys} from "@/contants/query-keys";
import {ApiService} from "@/services/api";
import {useMutation, useQuery} from "@tanstack/react-query";
import {usePathname} from "next/navigation";
import {useMemo} from "react";

type BuyCreditsDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const BuyCreditsDialog = ({open, setOpen}: BuyCreditsDialogProps) => {
  const pathName = usePathname();
  const {data, isLoading} = useQuery({
    queryKey: queryKeys.packages,
    queryFn: ApiService.getPackages,
  });

  const packages = useMemo(() => {
    if (!data) return [];

    return (data ?? [])
      .map((item: any) => ({
        id: item.id,
        credits: Number(item.metadata.amount),
        price: (item.unit_amount ?? 0) / 100,
      }))
      .sort((a, b) => a.credits - b.credits);
  }, [data]);

  const {mutate: handleBuyCredits, isPending} = useMutation({
    mutationFn: (priceId: string) =>
      ApiService.getCheckoutUrl(priceId, pathName),
    onSuccess: (url) => {
      location.href = url;
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      title="Buy Credits"
      description="Choose one of the packs to buy credits."
      content={
        <div className="flex flex-col gap-4">
          {isLoading && (
            <>
              <Skeleton className="h-[70px] " />
              <Skeleton className="h-[70px] " />
              <Skeleton className="h-[70px] " />
            </>
          )}
          {packages.map((item) => (
            <Button
              key={item.credits}
              onClick={() => handleBuyCredits(item.id)}
              variant="outline"
              className="flex flex-col h-max"
              disabled={isPending}
            >
              <strong className="font-title font-bold text-2xl">
                {item.credits} credits
              </strong>
              <span className="text-muted-foreground text-sm">
                for ${item.price}
              </span>
            </Button>
          ))}
        </div>
      }
    />
  );
};
