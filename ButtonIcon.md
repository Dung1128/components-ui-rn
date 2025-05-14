
## Các thuộc tính

Component sử dụng các thuộc tính đã được định nghĩa sẵn, ngoài ra người dùng có thể custom lại style

![ButtonIcon](./src/assets/images/button-icon.png)
```tsx
export interface ButtonIconProps {
  isLoading?: boolean;
  disabled?: boolean;
  onPress?: (val?: any) => void;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  size?: number;
  hiddenBackground?: boolean;
  props?: object;
  border?: boolean;
  circle?: boolean;
  backgroundColor?: string;
  borderColor?: string;
}
```

## Sử dụng

```tsx
import { ButtonIcon } from 'sapo-components-ui-rn';

function MyComponent() {
  return (
    <ButtonIcon>
      {...Icon}
    </ButtonIcon>
  );
}
```
