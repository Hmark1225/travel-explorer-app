import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import type { RootStackParams } from "../../App";
import { filterDestinations, type Category } from "../data/destinations";
import { useTravel } from "../state/TravelContext";
import {
  Button,
  PlaceImage,
  ImageGallery,
  SourceLink,
  s,
  colors,
} from "../components/ui";
import { DestinationFeed } from "../components/DestinationFeed";
import {
  externalMapSearchUrl,
  externalMapUrl,
  officialWebsiteUrl,
} from "../data/placeActions";
import { useLanguage } from "../i18n/LanguageProvider";
export function Page({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView style={s.screen} edges={["top"]}>
      <ScrollView
        contentContainerStyle={s.content}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
export function ExploreScreen() {
  const [query, setQuery] = useState(""),
    [category, setCategory] = useState<Category>("All");
  const state = useTravel();
  const { t, category: categoryName } = useLanguage();
  const items = filterDestinations(state.destinations, query, category);
  return (
    <DestinationFeed
      items={items}
      header={
        <>
          <View style={s.row}>
            <Text style={s.eyebrow}>{t("app.brand")}</Text>
            <Ionicons name="earth-outline" color={colors.green} size={26} />
          </View>
          <Text style={s.title}>{t("explore.title")}</Text>
          <Text style={s.subtitle}>{t("explore.subtitle")}</Text>
          <View style={s.search}>
            <Ionicons name="search-outline" color={colors.muted} size={21} />
            <TextInput
              accessibilityLabel={t("search.label")}
              placeholder={t("search.placeholder")}
              placeholderTextColor={colors.muted}
              value={query}
              onChangeText={setQuery}
              style={s.input}
              autoCorrect={false}
            />
            {query !== "" && (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={t("search.clear")}
                onPress={() => setQuery("")}
                hitSlop={12}
              >
                <Ionicons name="close-circle" size={20} color={colors.muted} />
              </Pressable>
            )}
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 4 }}
          >
            {(["All", "Coast", "Culture", "City breaks"] as Category[]).map(
              (c) => (
                <Pressable
                  key={c}
                  accessibilityRole="button"
                  accessibilityState={{ selected: category === c }}
                  onPress={() => setCategory(c)}
                  style={[
                    s.pill,
                    category === c && { backgroundColor: colors.green },
                  ]}
                >
                  <Text
                    style={[s.pillText, category === c && { color: "white" }]}
                  >
                    {categoryName(c)}
                  </Text>
                </Pressable>
              ),
            )}
          </ScrollView>
          <View style={s.row}>
            <Text style={[s.section, { flex: 1 }]}>
              {t(query ? "search.results" : "explore.places")}
            </Text>
            <Text style={s.body}>
              {t("search.count", { count: items.length })}
            </Text>
          </View>
          {state.loading && (
            <ActivityIndicator
              accessibilityLabel={t("loading.destinations")}
              color={colors.green}
            />
          )}
          {!!state.error && (
            <View style={s.notice}>
              <Text>{state.error}</Text>
              <Button label={t("common.retry")} onPress={state.retry} />
            </View>
          )}
        </>
      }
      empty={
        !state.loading ? (
          <View style={s.empty}>
            <Text style={s.cardTitle}>{t("empty.search.title")}</Text>
            <Text style={s.body}>{t("empty.search.body")}</Text>
            <Button
              label={t("search.reset")}
              onPress={() => {
                setQuery("");
                setCategory("All");
              }}
            />
          </View>
        ) : undefined
      }
      footer={
        <Text style={[s.body, { textAlign: "center", fontSize: 12 }]}>
          {t("explore.inventory", {
            destinations: state.destinations.length,
            entries: state.destinations.reduce(
              (n, d) => n + d.attractions.length,
              0,
            ),
          })}
        </Text>
      }
    />
  );
}
function Collection({ trips = false }: { trips?: boolean }) {
  const state = useTravel();
  const { t } = useLanguage();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const ids = trips ? state.trips : state.saved;
  const items = state.destinations.filter((d) => ids.includes(d.id));
  return (
    <DestinationFeed
      items={items}
      tripActions={trips}
      header={
        <View style={{ marginBottom: 24 }}>
          <Text style={s.eyebrow}>
            {t(trips ? "collection.trips.eyebrow" : "collection.saved.eyebrow")}
          </Text>
          <Text style={s.title}>
            {t(trips ? "collection.trips.title" : "collection.saved.title")}
          </Text>
          <Text style={s.subtitle}>
            {t(
              trips ? "collection.trips.subtitle" : "collection.saved.subtitle",
            )}
          </Text>
        </View>
      }
      empty={
        <View style={s.empty}>
          <Ionicons
            name={trips ? "briefcase-outline" : "heart-outline"}
            size={32}
            color={colors.green}
          />
          <Text style={s.cardTitle}>
            {t(trips ? "empty.trips.title" : "empty.saved.title")}
          </Text>
          <Text style={s.body}>
            {t(trips ? "empty.trips.body" : "empty.saved.body")}
          </Text>
          <Button
            label={t("common.explore")}
            onPress={() => navigation.navigate("Home", { screen: "Explore" })}
          />
        </View>
      }
      footer={
        trips ? (
          <Text style={[s.body, { marginTop: 20 }]}>{t("trips.note")}</Text>
        ) : undefined
      }
    />
  );
}
export function SavedScreen() {
  return <Collection />;
}
export function TripsScreen() {
  return <Collection trips />;
}
export function ProfileScreen() {
  const { saved, trips } = useTravel();
  const { t, language, setLanguage, error } = useLanguage();
  return (
    <Page>
      <Text style={s.eyebrow}>{t("profile.eyebrow")}</Text>
      <Text style={s.title}>{t("profile.title")}</Text>
      <Text style={s.subtitle}>{t("profile.subtitle")}</Text>
      <Text style={s.section}>{t("language.title")}</Text>
      <Text style={s.body}>{t("language.description")}</Text>
      <View
        accessibilityRole="radiogroup"
        accessibilityLabel={t("language.title")}
        style={{ gap: 10, marginTop: 14 }}
      >
        {(["en", "hu"] as const).map((code) => (
          <Pressable
            key={code}
            accessibilityRole="radio"
            accessibilityState={{ checked: language === code }}
            accessibilityLabel={t(
              language === code ? "language.selected" : "language.select",
              { language: t(`language.${code}`) },
            )}
            onPress={() => void setLanguage(code)}
            style={({ pressed }) => ({
              minHeight: 52,
              padding: 16,
              borderRadius: 14,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: language === code ? "#E0EEE7" : "#FFFFFF",
              borderWidth: 1,
              borderColor: language === code ? colors.green : "#E4E8DF",
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text style={[s.body, { color: colors.ink, fontWeight: "600" }]}>
              {t(`language.${code}`)}
            </Text>
            <Ionicons
              name={language === code ? "radio-button-on" : "radio-button-off"}
              size={22}
              color={colors.green}
            />
          </Pressable>
        ))}
      </View>
      {!!error && (
        <Text accessibilityRole="alert" style={[s.body, { marginTop: 12 }]}>
          {t(error)}
        </Text>
      )}
      <View style={s.empty}>
        <Ionicons name="person-circle-outline" size={64} color={colors.green} />
        <Text style={s.cardTitle}>{t("profile.guestName")}</Text>
        <Text style={s.body}>{t("profile.guest")}</Text>
        <View style={[s.row, { marginTop: 24 }]}>
          <View style={{ flex: 1 }}>
            <Text style={s.cardTitle}>{saved.length}</Text>
            <Text style={s.body}>{t("profile.saved")}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.cardTitle}>{trips.length}</Text>
            <Text style={s.body}>{t("profile.trips")}</Text>
          </View>
        </View>
      </View>
      <Text style={s.section}>{t("profile.aboutTitle")}</Text>
      <Text style={s.body}>{t("profile.about")}</Text>
      <Text style={s.section}>{t("profile.noteTitle")}</Text>
      <Text style={s.body}>{t("profile.note")}</Text>
    </Page>
  );
}
export function DestinationScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParams, "Destination">) {
  const state = useTravel();
  const { t, category } = useLanguage();
  const item = state.destinations.find((d) => d.id === route.params.id);
  if (!item)
    return (
      <Page>
        <Text style={s.title}>{t("destination.unavailable")}</Text>
      </Page>
    );
  return (
    <ScrollView style={s.screen} contentContainerStyle={s.content}>
      <PlaceImage photo={item.heroImage} name={item.name} style={s.hero} />
      <Text style={[s.eyebrow, { marginTop: 24 }]}>
        {item.country.toUpperCase()} · {category(item.category).toUpperCase()}
      </Text>
      <View style={s.row}>
        <Text style={[s.title, { flex: 1 }]}>{item.name}</Text>
        {item.rating && <Text style={s.rating}>★ {item.rating}</Text>}
      </View>
      <Text style={s.subtitle}>{item.tagline}</Text>
      <Text style={[s.body, { marginTop: 12 }]}>{item.region}</Text>
      <Text style={[s.body, { fontSize: 12, marginTop: 8 }]}>
        {item.coordinateLabel}.{" "}
        {t(
          item.coordinatesVerifiedAt
            ? "destination.sourced"
            : "destination.legacy",
        )}
      </Text>
      {item.coordinateAttribution && (
        <Text style={[s.body, { fontSize: 11 }]}>
          {item.coordinateAttribution} · {t("destination.pointNote")}
        </Text>
      )}
      <SourceLink
        url={item.coordinateSourceUrl}
        label={t("source.geography")}
      />
      <SourceLink
        url={item.coordinateLicenseUrl}
        label={t("source.geoLicense")}
      />
      <ImageGallery images={item.galleryImages} name={item.name} />
      <Text style={[s.body, { marginTop: 20 }]}>{item.description}</Text>
      <Button
        label={t(
          state.saved.includes(item.id)
            ? "destination.saved"
            : "destination.save",
        )}
        onPress={() => state.toggleSaved(item.id)}
      />
      <Button
        secondary
        label={t(
          state.trips.includes(item.id)
            ? "destination.removeTrip"
            : "destination.addTrip",
        )}
        onPress={() => state.toggleTrip(item.id)}
      />
      <Text style={s.section}>
        {t("destination.ways", { count: item.attractions.length })}
      </Text>
      <Text style={[s.body, { marginBottom: 18 }]}>
        {t("destination.review")}
      </Text>
      {item.attractions.map((a) => (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("accessibility.discover", { name: a.name })}
          key={a.id}
          style={s.attraction}
          onPress={() =>
            navigation.navigate("Attraction", {
              destinationId: item.id,
              attractionId: a.id,
            })
          }
        >
          <PlaceImage photo={a.heroImage} name={a.name} style={s.smallImage} />
          <Text style={s.eyebrow}>
            {category(a.category).toUpperCase()} ·{" "}
            {t("duration.short", { duration: a.estimatedDuration })}
          </Text>
          <Text style={[s.cardTitle, { fontSize: 21 }]}>{a.name} ↗</Text>
          <Text style={s.body}>{a.shortDescription}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
export function AttractionScreen({
  route,
}: NativeStackScreenProps<RootStackParams, "Attraction">) {
  const { destinations } = useTravel();
  const { t, category, date } = useLanguage();
  const d = destinations.find((d) => d.id === route.params.destinationId);
  const a = d?.attractions.find((a) => a.id === route.params.attractionId);
  if (!a)
    return (
      <Page>
        <Text style={s.title}>{t("attraction.unavailable")}</Text>
      </Page>
    );
  const website = officialWebsiteUrl(a),
    mapUrl = externalMapUrl(a, Platform.OS === "ios" ? "ios" : "android"),
    mapSearchUrl = d
      ? externalMapSearchUrl(a, d, Platform.OS === "ios" ? "ios" : "android")
      : null;
  const openUrl = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert(t("error.linkTitle"), t("error.linkBody"));
    }
  };
  return (
    <ScrollView style={s.screen} contentContainerStyle={s.content}>
      <PlaceImage photo={a.heroImage} name={a.name} style={s.hero} />
      <Text style={[s.eyebrow, { marginTop: 24 }]}>
        {d?.name.toUpperCase()} · {category(a.category).toUpperCase()}
      </Text>
      <Text style={s.title}>{a.name}</Text>
      <Text style={s.subtitle}>{a.shortDescription}</Text>
      <ImageGallery images={a.galleryImages} name={a.name} />
      <View style={[s.empty, { marginTop: 20 }]}>
        <Text style={s.body}>
          {t("attraction.visit", { duration: a.estimatedDuration })}
        </Text>
        <Text style={[s.body, { fontSize: 12 }]}>
          {t("attraction.estimate")}
        </Text>
        <Text style={[s.body, { marginTop: 10 }]}>
          {t(`admission.${a.admissionType}`)}
        </Text>
        <Text style={[s.body, { marginTop: 10 }]}>
          {t(
            a.kind === "experience"
              ? "attraction.experience"
              : "attraction.place",
          )}
        </Text>
      </View>
      <Text style={s.section}>{t("attraction.description")}</Text>
      <Text style={s.body}>{a.detailedDescription}</Text>
      <Text style={s.section}>{t("attraction.tips")}</Text>
      {a.usefulTips.map((tip, i) => (
        <Text key={i} style={[s.body, { marginBottom: 12 }]}>
          • {tip}
        </Text>
      ))}
      {website ? (
        <Button
          label={t("attraction.website")}
          onPress={() => void openUrl(website)}
        />
      ) : (
        <Text style={[s.body, { marginTop: 16 }]}>
          {t("attraction.websitePending")}
        </Text>
      )}
      {mapUrl ? (
        <Button
          secondary
          label={t(
            a.coordinatePrecision === "town-overview"
              ? "attraction.openTown"
              : "attraction.openLocation",
          )}
          onPress={() => void openUrl(mapUrl)}
        />
      ) : (
        <Text style={[s.body, { marginTop: 16 }]}>
          {t("attraction.locationPending")}
        </Text>
      )}
      {!mapUrl && mapSearchUrl && (
        <>
          <Button
            secondary
            label={t(
              a.kind === "place"
                ? "attraction.searchPlace"
                : "attraction.searchArea",
            )}
            onPress={() => void openUrl(mapSearchUrl)}
          />
          <Text style={[s.body, { fontSize: 12, marginTop: 8 }]}>
            {t("attraction.searchNote")}
          </Text>
        </>
      )}
      {a.coordinatesVerifiedAt && (
        <View style={{ marginTop: 16 }}>
          <Text style={s.body}>
            {t("attraction.townNote", { date: date(a.coordinatesVerifiedAt) })}
          </Text>
          <Text style={[s.body, { fontSize: 11 }]}>
            {a.coordinateAttribution}
          </Text>
          <SourceLink url={a.coordinateSourceUrl} label={t("source.town")} />
          <SourceLink
            url={a.coordinateLicenseUrl}
            label={t("source.townLicense")}
          />
        </View>
      )}
      <Text style={s.section}>{t("attraction.about")}</Text>
      <Text style={s.body}>
        {a.lastVerifiedAt
          ? t("attraction.lastReview", { date: date(a.lastVerifiedAt) })
          : t("attraction.notReviewed")}
      </Text>
      <Text style={[s.body, { marginTop: 10 }]}>{t("attraction.confirm")}</Text>
      <Text style={[s.body, { marginTop: 10 }]}>
        {t(a.lastVerifiedAt ? "source.reviewed" : "source.leads")}
      </Text>
      {a.sourceUrls.map((url) => (
        <Text
          selectable
          key={url}
          style={[s.body, { fontSize: 12, marginTop: 8 }]}
        >
          {url}
        </Text>
      ))}
    </ScrollView>
  );
}
