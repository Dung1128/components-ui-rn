import React, { forwardRef, memo } from "react";
import { Animated } from "react-native";
import deepEqual from "deep-equal";
export function memoDeepEqual<T>(component: React.ComponentType<T>) {
  return memo(component, (prevProps, nextProps) =>
    deepEqual(prevProps, nextProps)
  );
}

export const memoWithRef = (component: any) => {
  return memo(forwardRef(component), (prevProps, nextProps) =>
    deepEqual(prevProps, nextProps)
  );
};

export const detectEmail = (email: string) => {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const detectUserName = (name: string) => {
  var re =
    /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$/i;
  return re.test(name);
};

export const detectPhoneNumber = (phoneNum: string) => {
  var filter = /^[0-9]+$/;
  if (filter.test(phoneNum)) {
    return true;
  } else {
    return false;
  }
};

export function withAnimated(
  WrappedComponent: React.ComponentType<any>
): React.ComponentType {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  class WithAnimated extends React.Component {
    static displayName = `WithAnimated(${displayName})`;

    render(): React.ReactNode {
      return <WrappedComponent {...this.props} />;
    }
  }

  return Animated.createAnimatedComponent(WithAnimated);
}

export const phoneValid = (phone: string) => {
  const phoneRegex = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;
  return phoneRegex.test(phone?.trim());
};

export const lightenColor = (color: string, percent: number) => {
  const num = parseInt(color.slice(1), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return `#${(
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  )
    .toString(16)
    .slice(1)}`;
};

export function getFileExtension(filename: string) {
  return filename.substring(filename.lastIndexOf(".") + 1);
}
