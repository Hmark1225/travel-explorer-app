import React, { useState } from "react";
import {
  Image,
  Alert,
  Linking,
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
import { isHttpsUrl, isLicensedPhoto } from "../data/placeActions";
import { useLanguage } from "../i18n/LanguageProvider";
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
/** Plain metadata links; nested card presses do not navigate away as well. */
export function SourceLink({
  url,
  label,
}: {
  url: string | null;
  label: string;
}) {
  const { t } = useLanguage();
  if (!isHttpsUrl(url)) return null;
  return (
    <Pressable
      accessibilityRole="link"
      onPress={(event) => {
        event.stopPropagation();
        void Linking.openURL(url).catch(() =>
          Alert.alert(t("error.sourceTitle"), t("error.sourceBody")),
        );
      }}
      style={{ paddingVertical: 8 }}
    >
      <Text
        style={[
          s.body,
          {
            fontSize: 12,
            color: colors.green,
            textDecorationLine: "underline",
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}
/** Only reviewed authentic photographs can render. Missing/failed photos stay neutral. */
export function PlaceImage(props: {
  photo?: Photo | null;
  name: string;
  style: StyleProp<ImageStyle>;
  compact?: boolean;
}) {
  return <ImageFrame key={props.photo?.url ?? "no-photo"} {...props} />;
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
  const { t } = useLanguage();
  const [failed, setFailed] = useState(false);
  const available = !!photo && isLicensedPhoto(photo) && !!photo.url && !failed;
  return (
    <View>
      <View
        accessible
        accessibilityRole="image"
        accessibilityLabel={
          available
            ? photo.altText || photo.subject || name
            : t("photo.none", { name })
        }
        style={[
          style as StyleProp<ViewStyle>,
          { overflow: "hidden", backgroundColor: "#E6EBE7" },
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
            color={colors.muted}
          />
          {!compact && (
            <Text style={[s.body, { fontSize: 12, textAlign: "center" }]}>
              {t(failed ? "photo.unavailable" : "photo.pending")}
            </Text>
          )}
        </View>
        {available && (
          <Image
            source={{ uri: photo.url!, cache: "force-cache" }}
            accessible={false}
            resizeMode="cover"
            onError={() => setFailed(true)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        )}
      </View>
      {available && (
        <View>
          <Text
            style={[s.body, { fontSize: 11, lineHeight: 16, marginTop: 6 }]}
          >
            {photo.attribution} · {photo.license}
          </Text>
          {!compact && (
            <Text style={[s.body, { fontSize: 11 }]}>
              {t("photo.author", { author: photo.author ?? "" })}
            </Text>
          )}
          {!compact && (
            <>
              <Text style={[s.body, { fontSize: 11 }]}>
                {t("photo.modifications", {
                  notes: photo.modificationNotes ?? "",
                })}
              </Text>
              <SourceLink url={photo.sourceUrl} label={t("photo.source")} />
              <SourceLink url={photo.originalUrl} label={t("photo.original")} />
              <SourceLink url={photo.licenseUrl} label={t("photo.license")} />
            </>
          )}
        </View>
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
  const { t } = useLanguage();
  const { width } = useWindowDimensions();
  if (!images?.length) return null;
  return (
    <View style={{ marginTop: 18 }}>
      <Text style={s.eyebrow}>{t("photo.more")}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingVertical: 12 }}
      >
        {images.map((photo, index) => (
          <View
            key={`${photo.url ?? photo.subject ?? "placeholder"}:${index}`}
            style={{ width: Math.min(width - 72, 420) }}
          >
            <PlaceImage
              photo={photo}
              name={t("photo.galleryAlt", { name, count: index + 1 })}
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
  const { t, category } = useLanguage();
  return (
    <View style={s.card}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t("accessibility.discover", { name: item.name })}
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
              {item.country.toUpperCase()} ·{" "}
              {category(item.category).toUpperCase()}
            </Text>
            {item.rating && <Text style={s.rating}>★ {item.rating}</Text>}
          </View>
          <Text style={s.cardTitle}>{item.name}</Text>
          <Text style={s.body}>{item.tagline}</Text>
        </View>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t(
          saved ? "accessibility.unsave" : "accessibility.save",
          { name: item.name },
        )}
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
