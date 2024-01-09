import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Text, View } from "react-native";
import MapView, { Region } from "react-native-maps";
import { useSuggestStore } from "./_store";

export default function SuggestScreen() {
  const { update } = useSuggestStore();

  const handleRegionChange = (region: Region) => {
    update({
      location: [region.latitude, region.longitude],
      locationDelta: [region.latitudeDelta, region.longitudeDelta],
    });
  };

  return (
    <View className="flex-1 gap-y-2 px-4">
      <Text>Flytta kartan till den plats där du vill föreslå en ny plats.</Text>

      <View className="h-[300px] w-full relative">
        <MapView
          style={{ borderRadius: 8 }}
          rotateEnabled={false}
          pitchEnabled={false}
          className="flex-1 rounded-xl"
          maxZoomLevel={20}
          minZoomLevel={3}
          onRegionChangeComplete={handleRegionChange}
        />

        <View className="absolute top-1/2 left-1/2 ml-[-18px] mt-[-36px] pointer-events-none">
          <MaterialCommunityIcons
            className="pointer-events-none"
            name="map-marker"
            size={36}
            color="rgb(12, 107, 240)"
          />
        </View>
      </View>
    </View>
  );
}
