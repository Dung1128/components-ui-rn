# @dung1128/components-ui-rn

Thư viện UI Components cho React Native được phát triển bởi Dung1128.

## Cài đặt

```bash
npm install @dung1128/components-ui-rn
# or
yarn add @dung1128/components-ui-rn
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
import { Button, Text } from '@dung1128/components-ui-rn';

function MyComponent() {
  return (
    <Button onPress={() => console.log('Pressed')}>
      <Text>Click me</Text>
    </Button>
  );
}
```

## Components

Thư viện bao gồm các components sau:

- Button
- Card
- Text
- TextInput
- ActivityIndicator
- Avatar
- Badge
- Banner
- BottomNavigation
- Checkbox
- Chip
- Dialog
- Divider
- FAB
- IconButton
- Menu
- Modal
- Portal
- ProgressBar
- RadioButton
- Searchbar
- Snackbar
- Surface
- Switch

## Đóng góp

Chúng tôi rất hoan nghênh mọi đóng góp! Vui lòng xem [hướng dẫn đóng góp](CONTRIBUTING.md) để biết thêm chi tiết.

## Giấy phép

MIT 