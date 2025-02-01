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
import { Text } from 'react-native';  // Add Text import

// Replace with your own key
const API_KEY = "WRQlwljauExAv5tRLsbmlxGNR3MJALFqyL5IJKrsjDwWdthw4jCqmzd3";

const { width } = Dimensions.get("screen");
const _imageWidth = width * 0.8;
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

type ThreePhotosPayload = {
  photos: Photos[];
};

// ---------- A. Photo IDs you want precisely ----------
const chefIDs = [1267320, 2977514, 5779787];   // “chef” images
const spaceIDs = [586031, 586071, 586030];    // “SpaceX” images

// ---------- B. Helper: Fetch single photo by ID ----------
async function fetchPhotoByID(photoID: number): Promise<Photos> {
  // Example: GET /v1/photos/586031
  const url = `https://api.pexels.com/v1/photos/${photoID}`;
  const res = await fetch(url, {
    headers: { Authorization: API_KEY },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch photo ID: ${photoID}`);
  }
  const data = await res.json();
  // data is a single photo object
  return data; // matches the Photos type
}

// ---------- C. Helper: Fetch one random "luxury" image ----------
async function fetchRandomLuxury(): Promise<Photos> {
  // We fetch 5 "luxury" images, pick one
  const url = `https://api.pexels.com/v1/search?query=luxury&orientation=portrait&per_page=5`;
  const res = await fetch(url, {
    headers: { Authorization: API_KEY },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch 'luxury' photos");
  }
  const result = await res.json(); // {photos: Photos[]}
  const randomIndex = Math.floor(Math.random() * result.photos.length);
  return result.photos[randomIndex]; // Return 1 random photo
}

// ---------- D. Main fetch function ----------
async function fetchThreePhotos(): Promise<ThreePhotosPayload> {
  // 1) Randomly pick from chefIDs
  const randomChefID = chefIDs[Math.floor(Math.random() * chefIDs.length)];
  // 2) Fetch one random "luxury" from the search
  // 3) Randomly pick from spaceIDs
  const randomSpaceID = spaceIDs[Math.floor(Math.random() * spaceIDs.length)];

  // Perform these in parallel if you like:
  const [chefPhoto, luxuryPhoto, spacePhoto] = await Promise.all([
    fetchPhotoByID(randomChefID),
    fetchRandomLuxury(),
    fetchPhotoByID(randomSpaceID),
  ]);

  // Return them in that specific order [chef, luxury, space]
  return { photos: [chefPhoto, luxuryPhoto, spacePhoto] };
}

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
        [0, 1, 0],
        Extrapolate.CLAMP
      ),
    };
  });

  return (
    <Animated.Image
      source={{ uri: photo.src.large }}
      style={[StyleSheet.absoluteFillObject, stylz]}
      blurRadius={10}
      resizeMode="cover"
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
      transform: [{ scale }, { rotate: `${rotate}deg` }],
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
      <View style={{
        position: 'absolute',
        top: 0, // Overlay from the top
        left: 0,
        right: 0,
        padding: 80,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        borderBottomLeftRadius: 30, // Increased border radius for a more curved effect
        borderBottomRightRadius: 30, 
      }}>
        <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>
          {item.photographer}
        </Text>
        <Text style={{ color: '#666', fontSize: 14, marginTop: 4 }}>
          {item.alt || 'Beautiful photograph'}
        </Text>
      </View>
    </View>
  );
}

// ------ Main Component ------
export function PexelsWallpapers() {
  const { data, isLoading, isError, refetch } = useQuery<ThreePhotosPayload>({
    queryKey: ["Wallpapers", "chef-luxury-space"],
    queryFn: fetchThreePhotos,
    // You can disable caching if you want a brand-new set every time
    // staleTime: 0,
    // cacheTime: 0,
  });

  // Reanimated shared value & scroll handler
  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x / (_imageWidth + _spacing);
  });

  // Loading / Error
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  // data.photos => [ chefPhoto, luxuryPhoto, spacePhoto ]
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
        onScroll={onScroll}
        scrollEventThrottle={16}
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
