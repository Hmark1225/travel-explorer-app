import React, { useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../../App";
import { useTravel } from "../state/TravelContext";
import { Button, s } from "../components/ui";
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
  return (
    <SafeAreaView style={s.screen} edges={["top"]}>
      <View style={{ padding: 24 }}>
        <Text style={s.eyebrow}>FOLLOW YOUR CURIOSITY</Text>
        <Text style={s.title}>A world of possibility.</Text>
        <Text style={s.subtitle}>
          Destination pins are overview points. Place pins appear only after
          coordinate review.
        </Text>
      </View>
      <MapView
        style={{ flex: 1, minHeight: 200 }}
        initialRegion={{
          latitude: 42,
          longitude: 20,
          latitudeDelta: 18,
          longitudeDelta: 22,
        }}
        accessibilityLabel="Destination map of Europe"
      >
        {destinations.map((d) => (
          <Marker
            key={d.id}
            coordinate={d.coordinates}
            title={d.name}
            description={`${d.country} · Destination overview (not an attraction entrance)`}
            pinColor="#167568"
            onPress={() => {
              setSelected(d.id);
              setSelectedAttraction(null);
            }}
          />
        ))}
        {places.map(({ destination, attraction, point }) => (
          <Marker
            key={`place:${attraction.id}`}
            coordinate={point}
            title={attraction.name}
            description={`${destination.name} · ${attraction.category}`}
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
          : `${places.length} reviewed place locations · Green: destinations · Amber: places`}
      </Text>
      {item && (
        <View style={{ padding: 20, backgroundColor: "#FFFEFA" }}>
          <Text style={s.eyebrow}>{item.country.toUpperCase()}</Text>
          <Text style={[s.cardTitle, { fontSize: 23 }]}>
            {attraction?.name ?? item.name}
          </Text>
          <Text style={s.body}>
            {attraction?.shortDescription ?? item.tagline}
          </Text>
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
        </View>
      )}
    </SafeAreaView>
  );
}
