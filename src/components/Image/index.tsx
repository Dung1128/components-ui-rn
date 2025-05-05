import React, { useState } from "react";
import {
  Image as RNImage,
  ImageBackground,
  ImageProps,
  View,
  StyleProp,
  ImageStyle,
} from "react-native";
import FastImage, { ResizeMode } from "@d11/react-native-fast-image";
import { memoDeepEqual } from "../../utils/function-utils";

interface PropsCustomImage extends ImageProps {
  useFastImage?: boolean;
  disableDefaultImage?: boolean;
  children?: React.ReactNode;
  resizeMode?: "cover" | "contain" | "stretch" | "center";
  source: any;
  style?: StyleProp<ImageStyle>;
  loadingColor?: string;
  showLoading?: boolean;
}

const getSource = (source: any) => {
  let newSource = source;
  if (typeof source === "string") {
    newSource = { uri: source };
  }
  return newSource;
};

const Image = (props: PropsCustomImage) => {
  const {
    children,
    source,
    useFastImage,
    disableDefaultImage,
    style,
    resizeMode = "contain",
  } = props;

  const [hasError, setHasError] = useState(false);

  const image = getSource(
    disableDefaultImage
      ? source
      : hasError
      ? require("./assets/images/image_default.png")
      : source || require("./assets/images/image_default.png")
  );
  const ImageComponent = children ? ImageBackground : RNImage;

  const getUriImage = (uri: string) => {
    return uri !== null &&
      uri !== undefined &&
      uri.includes("/") &&
      uri.includes(".")
      ? uri
      : "";
  };

  const handleError = () => {
    setHasError(true);
  };

  const getFastImageResizeMode = (mode: string): ResizeMode => {
    switch (mode) {
      case "cover":
        return FastImage.resizeMode.cover;
      case "contain":
        return FastImage.resizeMode.contain;
      case "stretch":
        return FastImage.resizeMode.stretch;
      case "center":
        return FastImage.resizeMode.center;
      default:
        return FastImage.resizeMode.contain;
    }
  };

  if (useFastImage && image?.uri) {
    const {
      defaultSource,
      onLoad,
      onLoadStart,
      onLoadEnd,
      onProgress,
      style: imageStyle,
      ...restProps
    } = props;

    return (
      <View style={style}>
        <FastImage
          resizeMode={getFastImageResizeMode(resizeMode)}
          {...restProps}
          onError={handleError}
          source={{
            uri: getUriImage(image.uri),
            cache: FastImage.cacheControl.immutable,
          }}
          style={imageStyle as any}
        />
      </View>
    );
  }

  if (!source && disableDefaultImage) {
    if (children) {
      return <View {...props}>{children}</View>;
    }
    return null;
  }

  return (
    <View style={style}>
      <ImageComponent
        resizeMode={resizeMode}
        {...props}
        source={image}
        onError={handleError}
      />
    </View>
  );
};

export default memoDeepEqual<PropsCustomImage>(Image);
