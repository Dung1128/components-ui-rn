import React, { forwardRef, memo } from "react";
import { Animated } from "react-native";
import isEqual from "lodash/isEqual";

// Helper function to check if value is Date object
function isDateObject(value: any): boolean {
  return value instanceof Date && !isNaN(value.getTime());
}

// Wrapper function for deepEqual to handle Date object comparison
export function deepEqualWithDate(a: any, b: any): boolean {
  // Handle Date object comparison
  if (isDateObject(a) !== isDateObject(b)) {
    return false;
  }
  if (isDateObject(a) && isDateObject(b)) {
    return a.getTime() === b.getTime();
  }
  return isEqual(a, b);
}

// Wrapper function for deepEqual to handle arguments object comparison
export function deepEqualWithArguments(a: any, b: any): boolean {
  // Handle arguments object comparison
  if (isArguments(a) !== isArguments(b)) {
    return false;
  }
  return deepEqualWithDate(a, b);
}

// Helper function to check if value is arguments object
function isArguments(value: any): boolean {
  return Object.prototype.toString.call(value) === "[object Arguments]";
}

export function memoDeepEqual<T>(component: React.ComponentType<T>) {
  return memo(component, (prevProps, nextProps) =>
    deepEqualWithArguments(prevProps, nextProps)
  );
}

export const memoWithRef = (component: any) => {
  return memo(forwardRef(component), (prevProps, nextProps) =>
    isEqual(prevProps, nextProps)
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
