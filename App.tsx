import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { TravelProvider } from "./src/state/TravelContext";
import {
  ExploreScreen,
  SavedScreen,
  TripsScreen,
  ProfileScreen,
  DestinationScreen,
  AttractionScreen,
} from "./src/screens/Screens";
import MapScreen from "./src/screens/MapScreen";
import { LanguageProvider, useLanguage } from "./src/i18n/LanguageProvider";
import type { TranslationKey } from "./src/i18n/core";
export type RootStackParams = {
  Home: { screen: "Explore" } | undefined;
  Destination: { id: string };
  Attraction: { destinationId: string; attractionId: string };
};
const Stack = createNativeStackNavigator<RootStackParams>();
const Tab = createBottomTabNavigator();
const icons: Record<string, React.ComponentProps<typeof Ionicons>["name"]> = {
  Explore: "compass-outline",
  Map: "map-outline",
  Saved: "heart-outline",
  Trips: "briefcase-outline",
  Profile: "person-outline",
};
function Tabs() {
  const { t } = useLanguage();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        title: t(`tabs.${route.name}` as TranslationKey),
        tabBarAccessibilityLabel: t(`tabs.${route.name}` as TranslationKey),
        tabBarActiveTintColor: "#167568",
        tabBarInactiveTintColor: "#7A8481",
        tabBarStyle: { backgroundColor: "#FFFEFA", borderTopColor: "#E8EBE5" },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={icons[route.name]} color={color} size={size} />
        ),
      })}
    >
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Trips" component={TripsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <LanguageProvider>
      <TravelProvider>
        <ApplicationNavigation />
      </TravelProvider>
    </LanguageProvider>
  );
}
function ApplicationNavigation() {
  const { t } = useLanguage();
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerBackTitle: t("nav.back"),
            headerTintColor: "#183D35",
            headerStyle: { backgroundColor: "#FAFAF5" },
            headerShadowVisible: false,
            contentStyle: { backgroundColor: "#FAFAF5" },
          }}
        >
          <Stack.Screen
            name="Home"
            component={Tabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Destination"
            component={DestinationScreen}
            options={{ title: t("nav.destination") }}
          />
          <Stack.Screen
            name="Attraction"
            component={AttractionScreen}
            options={{ title: t("nav.attraction") }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
