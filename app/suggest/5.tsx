import { Text, View } from "react-native";
import MapView from "react-native-maps";
import { useSuggestStore } from "./_store";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ConfirmSuggestionScreen() {
  const store = useSuggestStore();

  return (
    <View className="flex-1">
      <View className="flex-1 gap-y-2 pt-4 px-4">
        <Text className="text-xl font-semibold">{store.title}</Text>

        <View className="h-[200px] w-full rounded-xl overflow-hidden relative">
          <MapView
            className="flex-1"
            initialRegion={{
              latitude: store.location?.[0] || 0,
              longitude: store.location?.[1] || 0,
              latitudeDelta: store.locationDelta?.[0] || 0.01,
              longitudeDelta: store.locationDelta?.[1] || 0.01,
            }}
            pointerEvents="none"
          />
          <View className="absolute top-1/2 left-1/2 ml-[-18px] mt-[-36px] pointer-events-none">
            <MaterialCommunityIcons
              name="map-marker"
              size={36}
              color="rgb(12, 107, 240)"
            />
          </View>
        </View>
        <View className="flex flex-row gap-x-2 items-center">
          {store.rampTypes.map((type) => (
            <View
              key={type}
              className="flex flex-row items-center justify-center bg-cyan-700 rounded-md px-2 py-2"
            >
              <Text className="text-white ml-1 font-medium">{type}</Text>
            </View>
          ))}
        </View>

        <Text className="text-gray-500 text-sm">
          Pris: {store.price} kr
          {store.price === 0 && " (gratis)"}
        </Text>
        {store.images.length > 0 && (
          <>
            <Text className="text-gray-500 text-sm">Bilder:</Text>

            <View className="flex flex-row gap-x-2">
              {["", ""].map((image) => (
                <View
                  key={image}
                  className="w-[100px] h-[100px] rounded-md bg-gray-200"
                />
              ))}
            </View>
          </>
        )}
      </View>
    </View>
  );
}
