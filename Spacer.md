
## Các thuộc tính

Component sử dụng các thuộc tính đã được định nghĩa sẵn, ngoài ra người dùng có thể custom lại style

 
 Tạo khoảng cách: không cần sử dụng padding hay margin

```tsx
interface SpacerProps {
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
}
```

## Sử dụng

```tsx
import { Spacer } from 'sapo-components-ui-rn';

function MyComponent() {
  return (
    <Spacer width={10} />
  );
}
```
