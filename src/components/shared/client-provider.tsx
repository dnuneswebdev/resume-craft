"use client";

import {ReactNode, Suspense, useEffect} from "react";
import {ThemeProvider} from "./theme-provider";
import {QueryClientProvider} from "@tanstack/react-query";
import {useTanstackQuery} from "@/lib/tanstack-query";
import {Toaster} from "../ui/sonner";
import {useSearchParams} from "next/navigation";
import {toast} from "sonner";

const CreditsToast = () => {
  const searchParams = useSearchParams();

  const successCheckoutParam = searchParams.get("success");

  useEffect(() => {
    if (successCheckoutParam === "true") {
      toast.success(
        "Purchase successful! Your credits have been added to your account."
      );
    }
  }, [successCheckoutParam]);

  return null;
};

type ClientProvidersProps = {
  children: ReactNode;
};

export const ClientProviders = ({children}: ClientProvidersProps) => {
  const queryClient = useTanstackQuery();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Suspense>
          <CreditsToast />
        </Suspense>
        {children}
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
