
## Các thuộc tính

Component sử dụng các thuộc tính đã được định nghĩa sẵn, ngoài ra người dùng có thể custom lại style

 
```tsx
export interface IText extends TextProps {
  size?: number;
  color?: string;
  center?: boolean;
  bold?: boolean;
  medium?: boolean;
  children?: any;
  theme?: ThemeProp;
}
```

## Sử dụng

```tsx
import { Text } from 'sapo-components-ui-rn';

function MyComponent() {
  return (
    <Text>Hello</Text>
  );
}
```
