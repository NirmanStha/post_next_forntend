"use client";

import * as React from "react";

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

type ToastState = {
  toasts: (ToastProps & { id: string })[];
};

type ToastAction =
  | { type: "ADD_TOAST"; toast: ToastProps & { id: string } }
  | { type: "REMOVE_TOAST"; id: string };

const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [...state.toasts, action.toast],
      };
    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.id),
      };
    default:
      return state;
  }
};

let toastCount = 0;

export const useToast = () => {
  const [state, dispatch] = React.useReducer(toastReducer, { toasts: [] });

  const toast = React.useCallback((props: ToastProps) => {
    const id = (toastCount++).toString();

    dispatch({
      type: "ADD_TOAST",
      toast: { ...props, id },
    });

    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      dispatch({ type: "REMOVE_TOAST", id });
    }, 5000);

    return id;
  }, []);

  const dismiss = React.useCallback((id: string) => {
    dispatch({ type: "REMOVE_TOAST", id });
  }, []);

  return {
    toast,
    dismiss,
    toasts: state.toasts,
  };
};
