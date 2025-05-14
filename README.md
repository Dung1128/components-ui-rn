# sapo-components-ui-rn

Thư viện UI Components cho React Native được phát triển bởi Sapo.

## Cài đặt

```bash
npm install sapo-components-ui-rn
# or
yarn add sapo-components-ui-rn
```

## Yêu cầu

Thư viện này yêu cầu các peer dependencies sau:

```json
{
  "react": ">=18.0.0",
  "react-native": ">=0.70.0",
  "@react-native-community/masked-view": "*",
  "react-native-gesture-handler": "*",
  "react-native-reanimated": "*",
  "react-native-safe-area-context": "*",
  "react-native-screens": "*"
}
```

## Sử dụng

```tsx
import { Button } from '@sapo/components-ui-rn';

function MyComponent() {
  return (
    <Button disabled textStyle={{...}}  title="My Button" onPress={()=> {}}/>
  );
}
```

## Components

Thư viện bao gồm các components sau:

- [Avatar](Avatar.md)
- [Badge](Badge.md)
- [Button](Button.md)
- [ButtonIcon](ButtonIcon.md)
- [Checkbox](Checkbox.md)
- [ChipBar](ChipBar.md)
- [CountingDot](CountingDot.md)
- [FloatingButton](FloatingButton.md)
- [Image](Image.md)
- [RadioButton](RadioButton.md)
- [SearchInput](SearchInput.md)
- [SelectionField](SelectionField.md)
- [Spacer](Spacer.md)
- [Switch](Switch.md)
- [Text](Text.md)
- [TextInput](TextInput.md)
- [TextArea](TextArea.md)
- [Toast](Toast.md)
- [View](View.md)
<!-- 
## Đóng góp

Chúng tôi rất hoan nghênh mọi đóng góp! Vui lòng xem [hướng dẫn đóng góp](CONTRIBUTING.md) để biết thêm chi tiết. -->

## Giấy phép

Sapo.vn 