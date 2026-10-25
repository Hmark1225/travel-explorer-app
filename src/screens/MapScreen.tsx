import React, { useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../../App";
import { useTravel } from "../state/TravelContext";
import { Button, s } from "../components/ui";
export default function MapScreen() {
  const { destinations } = useTravel();
  const [selected, setSelected] = useState("rhodes");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const item = destinations.find((d) => d.id === selected);
  return (
    <SafeAreaView style={s.screen} edges={["top"]}>
      <View style={{ padding: 24 }}>
        <Text style={s.eyebrow}>FOLLOW YOUR CURIOSITY</Text>
        <Text style={s.title}>A world of possibility.</Text>
        <Text style={s.subtitle}>Tap a pin to find your next escape.</Text>
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
            description={d.country}
            pinColor="#167568"
            onPress={() => setSelected(d.id)}
          />
        ))}
      </MapView>
      {item && (
        <View style={{ padding: 20, backgroundColor: "#FFFEFA" }}>
          <Text style={s.eyebrow}>{item.country.toUpperCase()}</Text>
          <Text style={[s.cardTitle, { fontSize: 23 }]}>{item.name}</Text>
          <Text style={s.body}>{item.tagline}</Text>
          <Button
            label={`Explore ${item.name}`}
            onPress={() => navigation.navigate("Destination", { id: item.id })}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
