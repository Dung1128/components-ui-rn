
## Các thuộc tính

Component sử dụng các thuộc tính đã được định nghĩa sẵn, ngoài ra người dùng có thể custom lại style

![Button](./src/assets/images/button.png)
```tsx
export interface ButtonProps extends TouchableOpacityProps {
  style?: StyleProp<ViewStyle>;
  borderColor?: string;
  title?: string;
  backgroundColor?: string;
  isLoading?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
  small?: boolean;
  textColor?: string;
  bold?: boolean;
  size?: number;
  textStyle?: TextStyle;
  medium?: boolean;
  mode?: "outlined" | "contained" | "transparent";
  onPress?: (res?: any) => void;
  theme?: ThemeProp;
}
```

## Sử dụng

```tsx
import { Button } from 'sapo-components-ui-rn';

function MyComponent() {
  return (
    <Button disabled textStyle={{...}}  title="My Button" onPress={()=> {}}/>
  );
}
```
