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
import { useLanguage } from "../i18n/LanguageProvider";
export default function MapScreen() {
  const { destinations } = useTravel();
  const { t } = useLanguage();
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
        <Text style={s.eyebrow}>{t("map.eyebrow")}</Text>
        <Text style={[s.title, { fontSize: 26, lineHeight: 32 }]}>
          {t("map.title")}
        </Text>
        <Text style={[s.subtitle, { fontSize: 12, lineHeight: 18 }]}>
          {t("map.legend")}
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
        accessibilityLabel={t("map.accessibility")}
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
            description={t("map.townMarker", { name: destination.name })}
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
          ? t("map.noPoints")
          : t("map.pointCount", { count: places.length })}
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
              t("map.legacy")}
          </Text>
          <SourceLink
            url={attraction?.coordinateSourceUrl ?? item.coordinateSourceUrl}
            label={t("source.overview")}
          />
          <SourceLink
            url={attraction?.coordinateLicenseUrl ?? item.coordinateLicenseUrl}
            label={t("source.geoLicense")}
          />
          <Button
            label={t("map.explore", { name: attraction?.name ?? item.name })}
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
