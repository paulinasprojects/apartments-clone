import {
  FlatList,
  Image,
  ImageStyle,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { WIDTH } from "../constants";
import { useRef, useState } from "react";
import { Text } from "@ui-kitten/components";
import { theme } from "../theme";

export const ImageCarousel = ({
  images,
  onImagePress,
  chevronsShown,
  indexShown,
  imageStyle,
  xShown,
  field,
  setImages,
  style,
}: {
  images: string[];
  onImagePress?: () => void;
  chevronsShown?: boolean;
  indexShown?: boolean;
  xShown?: boolean;
  field?: string;
  setImages?: (field: string, values: any) => void;
  style?: ViewStyle[] | ViewStyle;
  imageStyle?: ImageStyle;
}) => {
  const flatListRef = useRef<FlatList | null>(null);
  const viewConfig = { viewAreaCoveragePercentThreshold: 95 };
  const [activeIndex, setActiveIndex] = useState(0);
  const onViewRef = useRef(({ changed }: { changed: any }) => {
    if (changed[0].isViewable) {
      setActiveIndex(changed[0].index);
    }
  });

  const onXPress = (index: number) => {
    if (field && setImages) {
      const newImages = images.filter((i, idx) => index !== idx);
      setImages(field, newImages);
      if (
        index !== 0 &&
        index === images.length - 1 &&
        flatListRef &&
        flatListRef.current
      ) {
        flatListRef.current.scrollToIndex({ index: index - 1 });
      }
    }
  };

  const handlePressLeft = () => {
    if (activeIndex === 0)
      return flatListRef.current?.scrollToIndex({
        // animated: false,
        index: images.length - 1,
      });

    flatListRef.current?.scrollToIndex({
      index: activeIndex - 1,
    });
  };

  const handlePressRight = () => {
    if (activeIndex === images.length - 1)
      return flatListRef.current?.scrollToIndex({
        // animated: false,
        index: 0,
      });
    flatListRef.current?.scrollToIndex({
      index: activeIndex + 1,
    });
  };

  return (
    <View style={style}>
      {images && images.length > 0 ? (
        <FlatList
          ref={(ref) => (flatListRef.current = ref)}
          data={images}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          pagingEnabled
          viewabilityConfig={viewConfig}
          onViewableItemsChanged={onViewRef.current}
          renderItem={({ item, index }) => (
            <Pressable onPress={onImagePress}>
              <Image
                source={{
                  uri: item,
                }}
                style={[styles.image, imageStyle]}
              />
              {xShown ? (
                <MaterialCommunityIcons
                  onPress={() => onXPress(index)}
                  style={styles.x}
                  name="close"
                  color={theme["color-primary-500"]}
                  size={20}
                />
              ) : null}
            </Pressable>
          )}
          keyExtractor={(item, index) => item + index}
        />
      ) : (
        <Pressable onPress={onImagePress}>
          <Image
            source={require("../assets/images/NoImage.jpeg")}
            style={[styles.image, imageStyle]}
          />
        </Pressable>
      )}
      {chevronsShown && (
        <>
          <Pressable
            style={[styles.chevron, { left: 5 }]}
            onPress={handlePressLeft}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              color="white"
              size={45}
            />
          </Pressable>
          <Pressable
            style={[styles.chevron, { right: 5 }]}
            onPress={handlePressRight}
          >
            <MaterialCommunityIcons
              name="chevron-right"
              color="white"
              size={45}
            />
          </Pressable>
        </>
      )}
      {indexShown && (
        <View style={styles.index}>
          <Text category={"c2"} style={styles.indexText}>
            {activeIndex + 1} of {images.length} photos
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chevron: {
    top: 95,
    position: "absolute",
  },
  index: {
    position: "absolute",
    top: 20,
    left: 15,
    backgroundColor: "rgba(0,0,0, 0.7)",
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 30,
  },
  indexText: {
    color: "#fff",
  },
  image: {
    height: 200,
    width: WIDTH,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  x: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 10,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.24,
    elevation: 10,
  },
});
