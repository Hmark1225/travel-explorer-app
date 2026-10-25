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
  DestinationCard,
  PlaceImage,
  s,
  colors,
} from "../components/ui";
import { admissionLabels } from "../data/attractions";
import {
  externalMapSearchUrl,
  externalMapUrl,
  officialWebsiteUrl,
} from "../data/placeActions";

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
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const items = filterDestinations(state.destinations, query, category);
  return (
    <Page>
      <View style={s.row}>
        <Text style={s.eyebrow}>TRAVEL EXPLORER</Text>
        <Ionicons name="earth-outline" color={colors.green} size={26} />
      </View>
      <Text style={s.title}>Find your next{"\n"}little escape.</Text>
      <Text style={s.subtitle}>
        Extraordinary places. Unforgettable moments.
      </Text>
      <View style={s.search}>
        <Ionicons name="search-outline" color={colors.muted} size={21} />
        <TextInput
          accessibilityLabel="Search destinations or attractions"
          placeholder="Where would you like to go?"
          placeholderTextColor={colors.muted}
          value={query}
          onChangeText={setQuery}
          style={s.input}
          autoCorrect={false}
        />
        {query !== "" && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Clear search"
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
        {(["All", "Coast", "Culture", "City breaks"] as Category[]).map((c) => (
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
            <Text style={[s.pillText, category === c && { color: "white" }]}>
              {c}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <View style={s.row}>
        <Text style={s.section}>
          {query ? "Search results" : "Places to fall in love with"}
        </Text>
        <Text style={s.body}>{items.length} places</Text>
      </View>
      {state.loading && (
        <ActivityIndicator
          accessibilityLabel="Loading destinations"
          color={colors.green}
        />
      )}
      {!!state.error && (
        <View style={s.notice}>
          <Text>{state.error}</Text>
          <Button label="Try again" onPress={state.retry} />
        </View>
      )}
      {!state.loading && items.length === 0 && (
        <View style={s.empty}>
          <Text style={s.cardTitle}>A new direction?</Text>
          <Text style={s.body}>
            Try another search or choose a different category.
          </Text>
          <Button
            label="Reset filters"
            onPress={() => {
              setQuery("");
              setCategory("All");
            }}
          />
        </View>
      )}
      {items.map((item) => (
        <DestinationCard
          key={item.id}
          item={item}
          saved={state.saved.includes(item.id)}
          onSave={() => state.toggleSaved(item.id)}
          onOpen={() => navigation.navigate("Destination", { id: item.id })}
        />
      ))}
      <Text style={[s.body, { textAlign: "center", fontSize: 12 }]}>
        36 curated ideas · Practical information awaiting review
      </Text>
    </Page>
  );
}
function Collection({ trips = false }: { trips?: boolean }) {
  const state = useTravel();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const ids = trips ? state.trips : state.saved;
  const items = state.destinations.filter((d) => ids.includes(d.id));
  return (
    <Page>
      <Text style={s.eyebrow}>
        {trips ? "MAKE ROOM FOR ADVENTURE" : "KEEP THE INSPIRATION"}
      </Text>
      <Text style={s.title}>
        {trips ? "Your next chapter." : "Places you love."}
      </Text>
      <Text style={s.subtitle}>
        {trips
          ? "A simple shortlist for your future journeys."
          : "All your someday places, together."}
      </Text>
      {items.length === 0 ? (
        <View style={s.empty}>
          <Ionicons
            name={trips ? "briefcase-outline" : "heart-outline"}
            size={32}
            color={colors.green}
          />
          <Text style={s.cardTitle}>
            {trips
              ? "Your journey starts here"
              : "Something will catch your eye"}
          </Text>
          <Text style={s.body}>
            {trips
              ? "Open a destination and tap “Add to trip plan” to start a shortlist."
              : "Tap the heart on a destination to save it for later."}
          </Text>
          <Button
            label="Explore destinations"
            onPress={() => navigation.navigate("Home", { screen: "Explore" })}
          />
        </View>
      ) : (
        <View style={{ marginTop: 24 }}>
          {items.map((item) => (
            <View key={item.id}>
              <DestinationCard
                item={item}
                saved={state.saved.includes(item.id)}
                onSave={() => state.toggleSaved(item.id)}
                onOpen={() =>
                  navigation.navigate("Destination", { id: item.id })
                }
              />
              {trips && (
                <View style={{ marginTop: -14, marginBottom: 20 }}>
                  <Button
                    secondary
                    label={`Remove ${item.name} from plan`}
                    onPress={() => state.toggleTrip(item.id)}
                  />
                </View>
              )}
            </View>
          ))}
        </View>
      )}
      {trips && (
        <Text style={[s.body, { marginTop: 20 }]}>
          Trip plans are local destination shortlists. Dates, bookings and
          shared itineraries will come later.
        </Text>
      )}
    </Page>
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
  return (
    <Page>
      <Text style={s.eyebrow}>YOUR TRAVEL STORY</Text>
      <Text style={s.title}>Hello, explorer.</Text>
      <Text style={s.subtitle}>Go somewhere that stays with you.</Text>
      <View style={s.empty}>
        <Ionicons name="person-circle-outline" size={64} color={colors.green} />
        <Text style={s.cardTitle}>The curious traveler</Text>
        <Text style={s.body}>Guest profile · Stored on this device</Text>
        <View style={[s.row, { marginTop: 24 }]}>
          <View>
            <Text style={s.cardTitle}>{saved.length}</Text>
            <Text style={s.body}>Saved places</Text>
          </View>
          <View>
            <Text style={s.cardTitle}>{trips.length}</Text>
            <Text style={s.body}>Planned stops</Text>
          </View>
        </View>
      </View>
      <Text style={s.section}>Made for discovery</Text>
      <Text style={s.body}>
        Travel Explorer is your starting point for a more memorable journey.
        This guide contains original editorial suggestions awaiting source
        review. Account sign-in and cloud sync are not connected yet.
      </Text>
      <Text style={s.section}>A thoughtful travel note</Text>
      <Text style={s.body}>
        Opening times, prices and access rules can change. Check official venue
        information before you travel. Location photos are pending licensing
        review; illustrations are placeholders.
      </Text>
    </Page>
  );
}
export function DestinationScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParams, "Destination">) {
  const state = useTravel();
  const item = state.destinations.find((d) => d.id === route.params.id);
  if (!item)
    return (
      <Page>
        <Text style={s.title}>Destination unavailable</Text>
      </Page>
    );
  return (
    <ScrollView style={s.screen} contentContainerStyle={s.content}>
      <PlaceImage photo={item.photo} name={item.name} style={s.hero} />
      <Text style={[s.eyebrow, { marginTop: 24 }]}>
        {item.country.toUpperCase()} · {item.category.toUpperCase()}
      </Text>
      <View style={s.row}>
        <Text style={s.title}>{item.name}</Text>
        {item.rating && <Text style={s.rating}>★ {item.rating}</Text>}
      </View>
      <Text style={s.subtitle}>{item.tagline}</Text>
      <Text style={[s.body, { marginTop: 20 }]}>{item.description}</Text>
      <Button
        label={
          state.saved.includes(item.id)
            ? "♥ Saved to your collection"
            : "♡ Save destination"
        }
        onPress={() => state.toggleSaved(item.id)}
      />
      <Button
        secondary
        label={
          state.trips.includes(item.id)
            ? "Remove from trip plan"
            : "Add to trip plan"
        }
        onPress={() => state.toggleTrip(item.id)}
      />
      <Text style={s.section}>{item.attractions.length} ways to explore</Text>
      <Text style={[s.body, { marginBottom: 18 }]}>
        Original guide suggestions. Durations are editorial estimates.
        Admission, access and place locations await source review.
      </Text>
      {item.attractions.map((a) => (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Discover ${a.name}`}
          key={a.id}
          style={s.attraction}
          onPress={() =>
            navigation.navigate("Attraction", {
              destinationId: item.id,
              attractionId: a.id,
            })
          }
        >
          <PlaceImage photo={a.photo} name={a.name} style={s.smallImage} />
          <Text style={s.eyebrow}>
            {a.category.toUpperCase()} · Est. {a.estimatedDuration}
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
  const d = destinations.find((d) => d.id === route.params.destinationId);
  const a = d?.attractions.find((a) => a.id === route.params.attractionId);
  if (!a)
    return (
      <Page>
        <Text style={s.title}>Attraction unavailable</Text>
      </Page>
    );
  const website = officialWebsiteUrl(a);
  const mapUrl = externalMapUrl(a, Platform.OS === "ios" ? "ios" : "android");
  const mapSearchUrl = d
    ? externalMapSearchUrl(a, d, Platform.OS === "ios" ? "ios" : "android")
    : null;
  const openUrl = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert(
        "Couldn’t open link",
        "Please check your connection and try again.",
      );
    }
  };
  return (
    <ScrollView style={s.screen} contentContainerStyle={s.content}>
      <PlaceImage photo={a.photo} name={a.name} style={s.hero} />
      <Text style={[s.eyebrow, { marginTop: 24 }]}>
        {d?.name.toUpperCase()} · {a.category.toUpperCase()}
      </Text>
      <Text style={s.title}>{a.name}</Text>
      <Text style={s.subtitle}>{a.shortDescription}</Text>
      <View style={[s.empty, { marginTop: 20 }]}>
        <Text style={s.body}>Estimated visit: {a.estimatedDuration}</Text>
        <Text style={[s.body, { fontSize: 12 }]}>
          Editorial planning estimate, not a venue guarantee.
        </Text>
        <Text style={[s.body, { marginTop: 10 }]}>
          {admissionLabels[a.admissionType]}
        </Text>
        <Text style={[s.body, { marginTop: 10 }]}>
          {a.kind === "experience"
            ? "Self-guided experience, not a bookable product."
            : "Individual place guide"}
        </Text>
      </View>
      <Text style={s.section}>A moment worth making</Text>
      <Text style={s.body}>{a.detailedDescription}</Text>
      <Text style={s.section}>Practical travel tips</Text>
      {a.usefulTips.map((tip, i) => (
        <Text key={i} style={[s.body, { marginBottom: 12 }]}>
          • {tip}
        </Text>
      ))}
      {website ? (
        <Button
          label="Open official website"
          onPress={() => void openUrl(website)}
        />
      ) : (
        <Text style={[s.body, { marginTop: 16 }]}>
          Official website link awaiting verification.
        </Text>
      )}
      {mapUrl ? (
        <Button
          secondary
          label="Open location in Maps"
          onPress={() => void openUrl(mapUrl)}
        />
      ) : (
        <Text style={[s.body, { marginTop: 16 }]}>
          Exact location awaiting verification. No unverified map pin is shown.
        </Text>
      )}
      {!mapUrl && mapSearchUrl && (
        <>
          <Button
            secondary
            label={
              a.kind === "place"
                ? "Search place in Maps"
                : "Search destination area in Maps"
            }
            onPress={() => void openUrl(mapSearchUrl)}
          />
          <Text style={[s.body, { fontSize: 12, marginTop: 8 }]}>
            Opens a name search, not a verified entrance or route. Check the
            provider’s result before travelling.
          </Text>
        </>
      )}
      <Text style={s.section}>About this information</Text>
      <Text style={s.body}>
        {a.lastVerifiedAt
          ? `Last source review: ${a.lastVerifiedAt}`
          : "Not live-verified. Official source access was unavailable during preparation."}
      </Text>
      <Text style={[s.body, { marginTop: 10 }]}>
        Confirm admission, opening arrangements, accessibility and availability
        before travelling. No current prices or opening hours are claimed.
      </Text>
      <Text style={[s.body, { marginTop: 10 }]}>
        {a.lastVerifiedAt
          ? "Sources reviewed:"
          : "Source review leads (not verified references):"}
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
