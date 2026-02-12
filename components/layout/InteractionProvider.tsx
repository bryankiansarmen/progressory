"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { ConfirmationModal, ConfirmationModalProps } from "@/components/ui/confirmation-modal";

export interface ConfirmOptions {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "destructive" | "warning" | "info";
}

interface InteractionContextType {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const InteractionContext = createContext<InteractionContextType | undefined>(undefined);

export function useInteractionContext() {
  const context = useContext(InteractionContext);
  if (!context) {
    throw new Error("useInteractionContext must be used within an InteractionProvider");
  }
  return context;
}

export function InteractionProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({
    title: "Confirm Action",
    variant: "destructive",
  });
  const [resolver, setResolver] = useState<((value: boolean) => void) | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const confirm = useCallback((opts: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setResolver((prev: ((value: boolean) => void) | null) => {
        if (prev) {
          // Cancel any pending confirmation
          prev(false);
        }
        return (val: boolean) => resolve(val);
      });
      setOptions(opts);
      setIsOpen(true);
      setIsLoading(false);
    });
  }, []);

  const handleConfirm = useCallback(() => {
    setIsLoading(true);
    // We don't resolve immediately here if we want to show loading state?
    // But the promise API implies we wait for user input.
    // If the action is async, the caller should handle loading state.
    // The modal just resolves true/false.
    // So we resolve true immediately.

    if (resolver) {
      resolver(true);
    }
    setIsOpen(false);
    setResolver(null);
    setIsLoading(false);
  }, [resolver]);

  const handleCancel = useCallback(() => {
    if (resolver) {
      resolver(false);
    }
    setIsOpen(false);
    setResolver(null);
    setIsLoading(false);
  }, [resolver]);

  return (
    <InteractionContext.Provider value={{ confirm }}>
      {children}
      <ConfirmationModal
        isOpen={isOpen}
        title={options.title}
        description={options.description}
        confirmText={options.confirmText}
        cancelText={options.cancelText}
        variant={options.variant}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </InteractionContext.Provider>
  );
}
