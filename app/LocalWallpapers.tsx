// import React from "react";
// import {
//   View,
//   Dimensions,
//   StyleSheet,
// } from "react-native";
// import { useQuery } from "@tanstack/react-query"; // If still needed for your app
// import Animated, {
//   interpolate,
//   SharedValue,
//   useAnimatedScrollHandler,
//   useAnimatedStyle,
//   useSharedValue,
//   Extrapolate,
// } from "react-native-reanimated";
// import { ImageSourcePropType } from "react-native";

// // -------------- LOCAL IMAGES ARRAY --------------
// const LOCAL_IMAGES = [
//   {
//     id: 1,
//     source: require("../assets/images/wallpaper1.jpg"),
//   },
//   {
//     id: 2,
//     source: require("../assets/images/wallpaper2.jpg"),
//   },
//   {
//     id: 3,
//     source: require("../assets/images/wallpaper3.jpg"),
//   },
// ];

// // -------------- DIMENSIONS & CONSTANTS --------------
// const { width } = Dimensions.get("screen");
// const _imageWidth = width * 0.7; // 70% of screen width
// const _imageHeight = _imageWidth * 1.76; // ~9:16 ratio
// const _spacing = 12;

// // -------------- TYPES --------------
// type LocalPhoto = {
//   id: number;
//   source: ImageSourcePropType;
// };

// // -------------- BACKDROP COMPONENT --------------
// function BackdropPhoto({
//   photo,
//   index,
//   scrollX,
// }: {
//   photo: LocalPhoto;
//   index: number;
//   scrollX: SharedValue<number>;
// }) {
//   const stylz = useAnimatedStyle(() => {
//     return {
//       opacity: interpolate(
//         scrollX.value,
//         [index - 1, index, index + 1],
//         [0, 1, 0],
//         Extrapolate.CLAMP
//       ),
//     };
//   });

//   return (
//     <Animated.Image
//       source={photo.source}
//       style={[StyleSheet.absoluteFillObject, stylz]}
//       blurRadius={50} // if you'd like a blurred backdrop
//       resizeMode="cover"
//     />
//   );
// }

// // -------------- FOREGROUND PHOTO COMPONENT --------------
// function Photo({
//   item,
//   index,
//   scrollX,
// }: {
//   item: LocalPhoto;
//   index: number;
//   scrollX: SharedValue<number>;
// }) {
//   const stylz = useAnimatedStyle(() => {
//     const scale = interpolate(
//       scrollX.value,
//       [index - 1, index, index + 1],
//       [1.4, 1, 1.4],
//       Extrapolate.CLAMP
//     );
//     const rotate = interpolate(
//       scrollX.value,
//       [index - 1, index, index + 1],
//       [15, 0, -15],
//       Extrapolate.CLAMP
//     );

//     return {
//       transform: [
//         { scale },
//         { rotate: `${rotate}deg` },
//       ],
//     };
//   });

//   return (
//     <View
//       style={{
//         width: _imageWidth,
//         height: _imageHeight,
//         overflow: "hidden",
//         borderRadius: 16,
//       }}
//     >
//       <Animated.Image
//         source={item.source}
//         style={[{ flex: 1 }, stylz]}
//         resizeMode="cover"
//       />
//     </View>
//   );
// }

// // -------------- MAIN COMPONENT --------------
// export function LocalWallpapers() {
//   // Optional: If you need React Query for other parts of your app, keep this import.
//   // Otherwise, you can remove the import/useQuery lines entirely.

//   // Reanimated shared value & scroll handler
//   const scrollX = useSharedValue(0);
//   const onScroll = useAnimatedScrollHandler((e) => {
//     // Convert scroll offset into a page index
//     scrollX.value = e.contentOffset.x / (_imageWidth + _spacing);
//   });

//   return (
//     <View style={styles.container}>
//       {/* Backdrop layer */}
//       <View style={StyleSheet.absoluteFillObject}>
//         {LOCAL_IMAGES.map((photo, idx) => (
//           <BackdropPhoto
//             key={photo.id}
//             photo={photo}
//             index={idx}
//             scrollX={scrollX}
//           />
//         ))}
//       </View>

//       {/* Foreground FlatList */}
//       <Animated.FlatList
//         data={LOCAL_IMAGES}
//         keyExtractor={(item) => String(item.id)}
//         horizontal
//         style={{ flexGrow: 0 }}
//         onScroll={onScroll}
//         scrollEventThrottle={16}
//         snapToInterval={_imageWidth + _spacing}
//         decelerationRate="fast"
//         contentContainerStyle={{
//           gap: _spacing,
//           paddingHorizontal: (width - _imageWidth) / 2,
//         }}
//         renderItem={({ item, index }) => (
//           <Photo item={item} index={index} scrollX={scrollX} />
//         )}
//       />
//     </View>
//   );
// }

// // -------------- STYLES --------------
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
