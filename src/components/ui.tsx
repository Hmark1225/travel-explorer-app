import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ImageStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Destination, Photo } from "../data/destinations";
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
/** All current art is a locally rendered placeholder, never a location photograph. */
export function PlaceImage({
  photo,
  name,
  style,
}: {
  photo: Photo;
  name: string;
  style: StyleProp<ImageStyle>;
}) {
  if (isLicensedPhoto(photo) && photo.url) {
    return (
      <View>
        <Image
          source={{ uri: photo.url }}
          accessibilityLabel={name}
          style={style}
        />
        <Text style={[s.body, { fontSize: 11 }]}>
          {photo.attribution} · {photo.license}
        </Text>
      </View>
    );
  }
  return (
    <View
      accessibilityLabel={`Illustrated placeholder for ${name}; no location photo`}
      style={[
        style as StyleProp<import("react-native").ViewStyle>,
        {
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          padding: 20,
        },
      ]}
    >
      <Ionicons name="compass-outline" size={42} color={colors.green} />
      <Text style={s.eyebrow}>A PLACE TO DISCOVER</Text>
      <Text style={[s.body, { fontSize: 12, textAlign: "center" }]}>
        Illustration · Location photo pending
      </Text>
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
          photo={item.photo}
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
