import React, { useState } from "react";
import {
  Image,
  ScrollView,
  useWindowDimensions,
  type ViewStyle,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ImageStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Destination, Photo } from "../data/destinations";
import { imageSources } from "../assets/imageSources";
import { atlasFrame, isBundledIllustration } from "../data/images";
import { isLicensedPhoto } from "../data/placeActions";
export const colors = {
  ink: "#183D35",
  muted: "#75817B",
  green: "#167568",
  paper: "#FAFAF5",
};
export function Button({
  label,
  onPress,
  secondary = false,
}: {
  label: string;
  onPress: () => void;
  secondary?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        s.button,
        secondary && { backgroundColor: "#E7EEE7" },
        pressed && { opacity: 0.7 },
      ]}
    >
      <Text style={[s.buttonText, secondary && { color: colors.ink }]}>
        {label}
      </Text>
    </Pressable>
  );
}
/** A keyed frame resets load failures when a map selection or URL changes. */
export function PlaceImage(props: {
  photo?: Photo | null;
  name: string;
  style: StyleProp<ImageStyle>;
  compact?: boolean;
}) {
  const identity = JSON.stringify([
    props.photo?.assetId,
    props.photo?.crop,
    props.photo?.url,
  ]);
  return <ImageFrame key={identity} {...props} />;
}
function ImageFrame({
  photo,
  name,
  style,
  compact = false,
}: {
  photo?: Photo | null;
  name: string;
  style: StyleProp<ImageStyle>;
  compact?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const illustration = !!photo && isBundledIllustration(photo);
  const source =
    illustration && photo?.assetId
      ? imageSources[photo.assetId]
      : photo && isLicensedPhoto(photo) && photo.url
        ? { uri: photo.url, cache: "force-cache" as const }
        : null;
  const available = source !== null && !failed;
  const resolved =
    typeof source === "number" ? Image.resolveAssetSource(source) : null;
  const frame =
    resolved?.width && resolved?.height && photo?.crop
      ? atlasFrame(
          size.width,
          size.height,
          resolved.width,
          resolved.height,
          photo.crop,
        )
      : null;
  return (
    <View>
      <View
        accessible
        accessibilityRole="image"
        accessibilityLabel={
          available ? photo?.altText || name : `Image unavailable for ${name}`
        }
        onLayout={({ nativeEvent: { layout } }) =>
          setSize((old) =>
            old.width === layout.width && old.height === layout.height
              ? old
              : { width: layout.width, height: layout.height },
          )
        }
        style={[
          style as StyleProp<ViewStyle>,
          { overflow: "hidden", backgroundColor: "#D8E4DD" },
        ]}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: 12,
          }}
        >
          <Ionicons
            name="image-outline"
            size={compact ? 26 : 38}
            color={colors.green}
          />
          {!compact && (
            <Text style={[s.body, { fontSize: 12, textAlign: "center" }]}>
              {failed ? "Image unavailable" : "A place to discover"}
            </Text>
          )}
        </View>
        {available &&
          source &&
          (!illustration || (size.width > 0 && frame !== null)) && (
            <Image
              source={source}
              accessible={false}
              resizeMode="cover"
              onError={() => setFailed(true)}
              style={
                frame
                  ? { position: "absolute", ...frame }
                  : {
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                    }
              }
            />
          )}
      </View>
      {available && photo?.attribution && (
        <Text
          numberOfLines={compact ? 2 : undefined}
          style={[
            s.body,
            {
              fontSize: 10,
              lineHeight: 15,
              marginTop: 5,
              marginHorizontal: compact ? 0 : 2,
            },
          ]}
        >
          {photo.kind === "illustration" ? "Illustration · " : ""}
          {photo.attribution}
          {photo.kind === "photo" && photo.license ? ` · ${photo.license}` : ""}
        </Text>
      )}
    </View>
  );
}
export function ImageGallery({
  images,
  name,
}: {
  images?: Photo[];
  name: string;
}) {
  const { width } = useWindowDimensions();
  if (!images?.length) return null;
  return (
    <View style={{ marginTop: 18 }}>
      <Text style={s.eyebrow}>MORE TO DISCOVER</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingVertical: 12 }}
      >
        {images.map((photo, index) => (
          <View
            key={`${photo.assetId ?? photo.url}:${index}`}
            style={{ width: Math.min(width - 72, 420) }}
          >
            <PlaceImage
              photo={photo}
              name={`${name}, gallery image ${index + 1}`}
              style={{ width: "100%", height: 180, borderRadius: 18 }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
export function DestinationCard({
  item,
  saved,
  onSave,
  onOpen,
}: {
  item: Destination;
  saved: boolean;
  onSave: () => void;
  onOpen: () => void;
}) {
  return (
    <View style={s.card}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Discover ${item.name}`}
        onPress={onOpen}
      >
        <PlaceImage
          photo={item.heroImage}
          name={`${item.name}, ${item.country}`}
          style={s.cardImage}
        />
        <View style={s.cardBody}>
          <View style={s.row}>
            <Text style={s.eyebrow}>
              {item.country.toUpperCase()} · {item.category.toUpperCase()}
            </Text>
            {item.rating && <Text style={s.rating}>★ {item.rating}</Text>}
          </View>
          <Text style={s.cardTitle}>{item.name}</Text>
          <Text style={s.body}>{item.tagline}</Text>
        </View>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${saved ? "Unsave" : "Save"} ${item.name}`}
        accessibilityState={{ selected: saved }}
        hitSlop={8}
        onPress={onSave}
        style={s.save}
      >
        <Ionicons
          name={saved ? "heart" : "heart-outline"}
          color={saved ? colors.green : colors.ink}
          size={22}
        />
      </Pressable>
    </View>
  );
}
export const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { padding: 24, paddingBottom: 36 },
  eyebrow: {
    fontSize: 10,
    letterSpacing: 1.8,
    fontWeight: "700",
    color: colors.green,
  },
  title: {
    fontSize: 36,
    lineHeight: 42,
    fontWeight: "700",
    letterSpacing: -1.4,
    color: colors.ink,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 23,
    color: colors.muted,
    marginTop: 10,
  },
  body: { fontSize: 14, lineHeight: 23, color: colors.muted },
  section: {
    fontSize: 23,
    fontWeight: "600",
    letterSpacing: -0.6,
    color: colors.ink,
    marginTop: 26,
    marginBottom: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E9ECE5",
  },
  cardImage: { height: 220, width: "100%", backgroundColor: "#D8E4DD" },
  cardBody: { padding: 18 },
  cardTitle: {
    fontSize: 27,
    fontWeight: "600",
    color: colors.ink,
    marginVertical: 7,
    letterSpacing: -0.6,
  },
  rating: { color: colors.ink, fontSize: 12, fontWeight: "600" },
  save: {
    position: "absolute",
    right: 14,
    top: 14,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFEFA",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: colors.green,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: { fontWeight: "600", fontSize: 15, color: "white" },
  empty: {
    padding: 28,
    marginTop: 24,
    borderRadius: 24,
    backgroundColor: "#EAF0E8",
  },
  hero: {
    height: 290,
    width: "100%",
    borderRadius: 24,
    backgroundColor: "#D8E4DD",
  },
  pill: {
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 24,
    backgroundColor: "#EDF0E9",
    marginRight: 8,
  },
  pillText: { color: colors.ink, fontWeight: "500", fontSize: 13 },
  input: { flex: 1, fontSize: 15, color: colors.ink, paddingVertical: 16 },
  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E4E8DF",
    borderRadius: 16,
    paddingHorizontal: 16,
    marginVertical: 22,
  },
  notice: {
    padding: 16,
    backgroundColor: "#FFF0D6",
    borderRadius: 12,
    marginBottom: 16,
  },
  attraction: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E9ECE5",
  },
  smallImage: {
    height: 150,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "#D8E4DD",
  },
});
