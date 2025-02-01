import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  Extrapolate
} from "react-native-reanimated";

const uri = "https://api.pexels.com/v1/search?query=mobile+wallpaper&orientation=portrait";
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

// ------ Child Component ------
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
    return {
      transform: [
        {
          scale: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [1.4, 1, 1.4],
            Extrapolate.CLAMP
          ),
        },
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
          Authorization: "WRQlwljauExAv5tRLsbmlxGNR3MJALFqyL5IJKrsjDwWdthw4jCqmzd3",
        },
      });
      return res.json();
    },
  });

  // -- Reanimated shared value & scroll handler --
  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x / (_imageWidth + _spacing);
  });

  // -- Loading State --
  if (isLoading || !data) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // -- Render FlatList with Reanimated --
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Animated.FlatList
        data={data.photos}
        keyExtractor={(item) => String(item.id)}
        horizontal
        style={{ flexGrow: 0}}
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
