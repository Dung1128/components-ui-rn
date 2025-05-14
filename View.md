
## Các thuộc tính

Component sử dụng các thuộc tính đã được định nghĩa sẵn, ngoài ra người dùng có thể custom lại style

 
```tsx

interface ViewProps {
  row?: boolean;
  full?: boolean;
  justifyCenter?: boolean;
  justifyBetween?: boolean;
  alignCenter?: boolean;
  center?: boolean;
  gap?: number;
  color?: any;
  backgroundColor?: any;
  width?: number | `${number}%`;
  height?: number | `${number}%`;
  onPress?: () => void;
  padding?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  disabled?: boolean;
  activeOpacity?: number;
  paddingBottom?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  alignEnd?: boolean;
  wrap?: boolean;
  borderBottomWidth?: number;
  borderBottomColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
}
```

## Sử dụng

```tsx
import { View } from 'sapo-components-ui-rn';

function MyComponent() {

  return (
      <View>
        <Text>Hello</Text>
      </View>
  );
}
```
