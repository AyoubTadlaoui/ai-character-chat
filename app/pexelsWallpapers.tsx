import React from "react";
import {
  View,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  Extrapolate,
} from "react-native-reanimated";

const uri =
  "https://api.pexels.com/v1/search?query=mobile+wallpaper&orientation=portrait";
const API_KEY =
  "WRQlwljauExAv5tRLsbmlxGNR3MJALFqyL5IJKrsjDwWdthw4jCqmzd3";

const { width } = Dimensions.get("screen");
const _imageWidth = width * 0.7;
const _imageHeight = _imageWidth * 1.76;
const _spacing = 12;

// ------ Types ------
type Photos = {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
};

type SearchPayload = {
  total_results: number;
  page: number;
  per_page: number;
  photos: Photos[];
};

// ------ BackdropPhoto Component ------
function BackdropPhoto({
  photo,
  index,
  scrollX,
}: {
  photo: Photos;
  index: number;
  scrollX: SharedValue<number>;
}) {
  const stylz = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,
        [index - 1, index, index + 1],
        [0, 1, 0]
      ),
    };
  });

  return (
    <Animated.Image
      source={{ uri: photo.src.large }}
      style={[StyleSheet.absoluteFillObject, stylz]}
      blurRadius={50}
    />
  );
}

// ------ Photo (Foreground) Component ------
function Photo({
  item,
  index,
  scrollX,
}: {
  item: Photos;
  index: number;
  scrollX: SharedValue<number>;
}) {
  const stylz = useAnimatedStyle(() => {
    // Interpolate scale and rotation based on current scroll position
    const scale = interpolate(
      scrollX.value,
      [index - 1, index, index + 1],
      [1.4, 1, 1.4],
      Extrapolate.CLAMP
    );
    const rotate = interpolate(
      scrollX.value,
      [index - 1, index, index + 1],
      [15, 0, -15],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { scale },
        { rotate: `${rotate}deg` },
      ],
    };
  });

  return (
    <View
      style={{
        width: _imageWidth,
        height: _imageHeight,
        overflow: "hidden",
        borderRadius: 16,
      }}
    >
      <Animated.Image
        source={{ uri: item.src.large }}
        style={[{ flex: 1 }, stylz]}
        resizeMode="cover"
      />
    </View>
  );
}

// ------ Main Component ------
export function PexelsWallpapers() {
  // -- React Query call --
  const { data, isLoading } = useQuery<SearchPayload>({
    queryKey: ["Wallpapers"],
    queryFn: async () => {
      const res = await fetch(uri, {
        headers: {
          Authorization: API_KEY,
        },
      });
      return res.json();
    },
  });

  // -- Reanimated shared value & scroll handler --
  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    // Convert scroll offset into a 'page' index
    scrollX.value = e.contentOffset.x / (_imageWidth + _spacing);
  });

  // -- Loading State --
  if (isLoading || !data) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // -- Render FlatList with Reanimated --
  return (
    <View style={styles.container}>
      {/* Backdrop Layer */}
      <View style={StyleSheet.absoluteFillObject}>
        {data.photos.map((photo, idx) => (
          <BackdropPhoto
            key={photo.id}
            photo={photo}
            index={idx}
            scrollX={scrollX}
          />
        ))}
      </View>

      {/* Foreground FlatList */}
      <Animated.FlatList
        data={data.photos}
        keyExtractor={(item) => String(item.id)}
        horizontal
        style={{ flexGrow: 0 }}
        // Animated scroll
        onScroll={onScroll}
        scrollEventThrottle={16}
        // Snap
        snapToInterval={_imageWidth + _spacing}
        decelerationRate="fast"
        contentContainerStyle={{
          gap: _spacing,
          paddingHorizontal: (width - _imageWidth) / 2,
        }}
        renderItem={({ item, index }) => (
          <Photo item={item} index={index} scrollX={scrollX} />
        )}
      />
    </View>
  );
}

// ------ Styles ------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
