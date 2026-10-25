import React from "react";
import { FlatList, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../../App";
import type { Destination } from "../data/models";
import { useTravel } from "../state/TravelContext";
import { Button, DestinationCard, s } from "./ui";
/** One virtualized vertical scroller: do not nest this inside Page/ScrollView. */
export function DestinationFeed({
  items,
  header,
  empty,
  footer,
  tripActions = false,
}: {
  items: Destination[];
  header: React.ReactElement;
  empty?: React.ReactElement;
  footer?: React.ReactElement;
  tripActions?: boolean;
}) {
  const state = useTravel();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <SafeAreaView edges={["top"]} style={s.screen}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={s.content}
        keyboardShouldPersistTaps="handled"
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={5}
        removeClippedSubviews={Platform.OS === "android"}
        ListHeaderComponent={header}
        ListEmptyComponent={empty}
        ListFooterComponent={footer}
        extraData={[state.saved, state.trips]}
        renderItem={({ item }) => (
          <View>
            <DestinationCard
              item={item}
              saved={state.saved.includes(item.id)}
              onSave={() => state.toggleSaved(item.id)}
              onOpen={() => navigation.navigate("Destination", { id: item.id })}
            />
            {tripActions && (
              <View style={{ marginTop: -14, marginBottom: 20 }}>
                <Button
                  secondary
                  label={`Remove ${item.name} from plan`}
                  onPress={() => state.toggleTrip(item.id)}
                />
              </View>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
}
