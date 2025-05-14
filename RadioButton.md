
## Các thuộc tính

Component sử dụng các thuộc tính đã được định nghĩa sẵn, ngoài ra người dùng có thể custom lại style

![RadioButton](./src/assets/images/radio-button.png)
```tsx
interface RadioButtonProps {
  style?: StyleProp<ViewStyle>;
  content: string;
  onPress?: (val?: any) => void;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  checked?: boolean;
}

```

## Sử dụng

```tsx
import { RadioButton } from 'sapo-components-ui-rn';

function MyComponent() {
  return (
     <RadioButton content="string"/>
  );
}
```
