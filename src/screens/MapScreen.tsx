import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../../App";
import { useTravel } from "../state/TravelContext";
import { Button, PlaceImage, SourceLink, s } from "../components/ui";
import { verifiedCoordinates } from "../data/placeActions";
export default function MapScreen() {
  const { destinations } = useTravel();
  const [selected, setSelected] = useState("rhodes");
  const [selectedAttraction, setSelectedAttraction] = useState<string | null>(
    null,
  );
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const item = destinations.find((d) => d.id === selected);
  const attraction = item?.attractions.find((a) => a.id === selectedAttraction);
  const places = destinations.flatMap((d) =>
    d.attractions.flatMap((a) => {
      const point = verifiedCoordinates(a);
      return point ? [{ destination: d, attraction: a, point }] : [];
    }),
  );
  // A town walk at the same point as a destination remains reachable in its guide;
  // do not stack two indistinguishable pins at exactly the same coordinates.
  const mapPlaces = places.filter(
    (p) =>
      !destinations.some(
        (d) =>
          d.coordinates.latitude === p.point.latitude &&
          d.coordinates.longitude === p.point.longitude,
      ),
  );
  return (
    <SafeAreaView style={s.screen} edges={["top"]}>
      <View style={{ padding: 16 }}>
        <Text style={s.eyebrow}>FOLLOW YOUR CURIOSITY</Text>
        <Text style={[s.title, { fontSize: 26, lineHeight: 32 }]}>
          A world of possibility.
        </Text>
        <Text style={[s.subtitle, { fontSize: 12, lineHeight: 18 }]}>
          Green: destination overviews. Amber: sourced town overviews, not
          verified venue entrances.
        </Text>
      </View>
      <MapView
        style={{ flex: 1, minHeight: 120 }}
        initialRegion={{
          latitude: 43,
          longitude: 10,
          latitudeDelta: 24,
          longitudeDelta: 48,
        }}
        accessibilityLabel="Destination map of Europe"
      >
        {destinations.map((d) => (
          <Marker
            key={d.id}
            coordinate={d.coordinates}
            title={d.name}
            description={d.coordinateLabel}
            pinColor="#167568"
            onPress={() => {
              setSelected(d.id);
              setSelectedAttraction(null);
            }}
          />
        ))}
        {mapPlaces.map(({ destination, attraction, point }) => (
          <Marker
            key={`place:${attraction.id}`}
            coordinate={point}
            title={attraction.name}
            description={`${destination.name} · Sourced town overview, not an entrance`}
            pinColor="#B66B35"
            onPress={() => {
              setSelected(destination.id);
              setSelectedAttraction(attraction.id);
            }}
          />
        ))}
      </MapView>
      <Text style={[s.body, { fontSize: 12, padding: 12 }]}>
        {places.length === 0
          ? "Attraction coordinates await review; no place pins are published yet."
          : `${places.length} sourced town overviews · No verified venue entrances`}
      </Text>
      {item && (
        <ScrollView
          style={{ maxHeight: 260, backgroundColor: "#FFFEFA" }}
          contentContainerStyle={{ padding: 16 }}
        >
          <View style={{ flexDirection: "row", gap: 14, alignItems: "center" }}>
            <View style={{ width: 96 }}>
              <PlaceImage
                photo={attraction?.heroImage ?? item.heroImage}
                name={attraction?.name ?? item.name}
                compact
                style={{ width: 96, height: 80, borderRadius: 14 }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.eyebrow}>{item.country.toUpperCase()}</Text>
              <Text numberOfLines={2} style={[s.cardTitle, { fontSize: 22 }]}>
                {attraction?.name ?? item.name}
              </Text>
              <Text
                numberOfLines={2}
                style={[s.body, { fontSize: 12, lineHeight: 18 }]}
              >
                {attraction?.shortDescription ?? item.tagline}
              </Text>
            </View>
          </View>
          <Text
            style={[s.body, { fontSize: 10, lineHeight: 14, marginTop: 8 }]}
          >
            {attraction?.coordinateAttribution ??
              item.coordinateAttribution ??
              "Legacy destination point: source review pending"}
          </Text>
          <SourceLink
            url={attraction?.coordinateSourceUrl ?? item.coordinateSourceUrl}
            label="Overview point source"
          />
          <SourceLink
            url={attraction?.coordinateLicenseUrl ?? item.coordinateLicenseUrl}
            label="Geographic data license"
          />
          <Button
            label={`Explore ${attraction?.name ?? item.name}`}
            onPress={() =>
              attraction
                ? navigation.navigate("Attraction", {
                    destinationId: item.id,
                    attractionId: attraction.id,
                  })
                : navigation.navigate("Destination", { id: item.id })
            }
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
