
## Các thuộc tính

Component sử dụng các thuộc tính đã được định nghĩa sẵn, ngoài ra người dùng có thể custom lại style

```
    style: custom style riêng cho component
    title: Tiêu đề của button
    borderColor
    isLoading: trạng thái loading nếu có
    left: Custom bên ReactNode bên trái tiêu đề
    right: Custom bên ReactNode bên phải tiêu đề
    small: Button dạng nhỏ
    textStyle: Custom style cho tiêu đề
    onPress,
    disabled,
    backgroundColor,
    textColor,
    bold = true :font của title
    size = 16: size của title
    medium = false: font của title
    mode = "contained": Các dạng của button
```

## Sử dụng

```tsx
import { Button } from '@dung1128/components-ui-rn';

function MyComponent() {
  return (
    <Button disabled textStyle={{...}}  title="My Button" onPress={()=> {}}/>
  );
}
```
