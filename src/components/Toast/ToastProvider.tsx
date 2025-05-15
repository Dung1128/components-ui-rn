import React, { forwardRef, useImperativeHandle } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "./index";
import { toastRef } from "../../utils/toast-manager";

interface ToastRef {
  show: (params: {
    message: string;
    duration?: number;
    position?: "top" | "bottom";
    type?: "success" | "fail";
    onPress?: () => void;
    title: string;
    spacer?: "normal" | "medium" | "large" | number;
  }) => void;
}

interface ToastProviderProps {
  children: React.ReactNode;
  /**
   * Nếu ứng dụng đã có SafeAreaProvider, set wrapSafeArea = false
   * @default true
   */
  wrapSafeArea?: boolean;
}

const ToastProvider = forwardRef<ToastRef, ToastProviderProps>(
  ({ children, wrapSafeArea = true }, ref) => {
    const toastComponentRef = React.useRef<ToastRef>(null);

    // Expose the show method through the ref
    useImperativeHandle(ref, () => ({
      show: (params) => {
        if (toastComponentRef.current) {
          toastComponentRef.current.show(params);
        }
      },
    }));

    // Update the global toastRef when component mounts
    React.useEffect(() => {
      if (toastComponentRef.current) {
        toastRef.current = toastComponentRef.current;
      }
      return () => {
        toastRef.current = null;
      };
    }, []);

    const renderToast = () => {
      if (wrapSafeArea) {
        return (
          <SafeAreaProvider>
            <Toast ref={toastComponentRef} />
          </SafeAreaProvider>
        );
      }
      return <Toast ref={toastComponentRef} />;
    };

    return (
      <>
        {children}
        {renderToast()}
      </>
    );
  }
);

export default ToastProvider;
