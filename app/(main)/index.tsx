import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useMemo, useRef, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import { usePointsStore } from "./_store";
import { Point } from "../../types/payload-types";

type Marker = {
  latitude: number;
  longitude: number;
};

export default function MainScreen() {
  const [region, setRegion] = useState({
    latitude: 63.36375662630915,
    longitude: 15.834190576035102,
    latitudeDelta: 18.582626925457674,
    longitudeDelta: 22.4085221170657,
  });
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const { points } = usePointsStore();
  const [selectedPointId, setSelectedPointId] = useState<string | null>(null);

  const markers = useMemo(() => {
    if (!points) return [];
    return points.map((point) => ({
      latitude: point.location && point.location[1],
      longitude: point.location && point.location[0],
      pointId: point.id,
    }));
  }, [points]);

  const selectedPoint = useMemo(() => {
    if (!points) return null;
    return points.find((point) => point.id === selectedPointId);
  }, [selectedPointId]);

  const mapRef = useRef<MapView>(null);

  const [currentSnapPoint, setCurrentSnapPoint] = useState(-1);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%", "85%"], []);
  const scrollEnabled = useMemo(
    () => currentSnapPoint === 2,
    [currentSnapPoint]
  );

  const handleOpenBottomSheet = (pointId: string) => {
    setSelectedPointId(pointId);
    bottomSheetRef.current?.snapToIndex(0);
    setCurrentSnapPoint(0);
  };

  const handleZoomIn = () => {
    mapRef.current?.animateToRegion({
      ...region,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    });
  };

  const handleZoomOut = () => {
    mapRef.current?.animateToRegion({
      ...region,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    });
  };

  const handleLocateMe = () => {
    mapRef.current?.animateToRegion({
      ...region,
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
  };

  const rampNames: Record<string, string> = {
    naturramp: "Naturramp",
    "anlagd-ramp": "Anlagd ramp",
    annat: "Annan ramp",
  };

  return (
    <View className="flex-1">
      <MapView
        ref={mapRef}
        zoomTapEnabled
        region={region}
        onRegionChangeComplete={setRegion}
        onUserLocationChange={(event) => {
          const latitude = event.nativeEvent.coordinate?.latitude || 0;
          const longitude = event.nativeEvent.coordinate?.longitude || 0;
          setUserLocation({ latitude, longitude });
        }}
        className="flex-1"
        showsUserLocation
      >
        {markers.map((marker, index) => (
          <Marker
            onPress={() => handleOpenBottomSheet(marker.pointId)}
            key={index}
            coordinate={{
              latitude: marker.latitude as NonNullable<Point["location"]>[1],
              longitude: marker.longitude as NonNullable<Point["location"]>[0],
            }}
            pinColor="#FF0000"
          />
        ))}
      </MapView>

      <View className="absolute right-0 top-[5%] mr-4 gap-y-4">
        {/*<Pressable onPress={() => {}} className="bg-white/80 rounded-md p-2">
          <Ionicons name="funnel" size={18} color="#3c3c3c" />
        </Pressable>*/}
        <View>
          <Pressable
            onPress={handleZoomIn}
            hitSlop={12}
            className="bg-white/80 rounded-md rounded-b-none p-2"
          >
            <Ionicons name="add" size={18} color="#3c3c3c" />
          </Pressable>
          <View className="h-[1px] bg-gray-200" />
          <Pressable
            hitSlop={12}
            onPress={handleZoomOut}
            className="bg-white/80 rounded-md rounded-t-none p-2"
          >
            <Ionicons name="remove" size={18} color="#3c3c3c" />
          </Pressable>
        </View>
        <Pressable
          onPress={handleLocateMe}
          hitSlop={12}
          className="bg-white/80 rounded-md p-2"
        >
          <Ionicons name="locate" size={18} color="#3c3c3c" />
        </Pressable>
      </View>

      <BottomSheet
        backgroundStyle={{ backgroundColor: "rgba(242, 243, 245, 0.9)" }}
        ref={bottomSheetRef}
        index={-1}
        enablePanDownToClose
        snapPoints={snapPoints}
        enableContentPanningGesture={!scrollEnabled}
        onChange={(index) => setCurrentSnapPoint(index)}
      >
        <BottomSheetScrollView
          contentContainerStyle={{
            backgroundColor: "transparent",
            gap: 8,
            paddingHorizontal: 8,
          }}
          scrollEnabled={scrollEnabled}
          className="flex-1"
        >
          <View className="px-4 py-3 bg-white rounded-md">
            <Text className="font-semibold text-lg">
              {selectedPoint?.title}
            </Text>
            <Text className="text-gray-500">
              {selectedPoint?.location && selectedPoint?.location[1].toFixed(4)}
              ,{" "}
              {selectedPoint?.location && selectedPoint?.location[0].toFixed(4)}
            </Text>
          </View>

          <View className="px-4 py-3 bg-white rounded-md">
            <Text className="font-semibold text-lg">På platsen</Text>
            <View className="flex gap-y-2 pt-1">
              <View className="flex-row gap-x-2 flex-wr">
                {selectedPoint?.rampType?.map((rampType, index) => (
                  <View
                    key={index}
                    className="bg-gray-100 rounded-md px-2 py-1 text-sm"
                  >
                    <Text>{rampNames[rampType]}</Text>
                  </View>
                ))}
              </View>
              <Text className="text-gray-600">
                Avgift:
                {selectedPoint?.price ? (
                  <Text> {selectedPoint?.price} kr</Text>
                ) : (
                  <Text> Ingen</Text>
                )}
              </Text>
              <Text className="text-gray-600">
                {selectedPoint?.locked ? (
                  <Text>Låst ramp</Text>
                ) : (
                  <Text>Olåst ramp</Text>
                )}
              </Text>
            </View>
          </View>

          {selectedPoint?.additionalInfo && (
            <View className="px-4 py-3 bg-white rounded-md">
              <Text className="font-semibold text-lg">Övrig info</Text>
              <Text className="text-gray-600">
                {selectedPoint?.additionalInfo}
              </Text>
            </View>
          )}

          <View className="py-3 bg-white rounded-md">
            <View className="px-4">
              <Text className="font-semibold text-lg">Bilder</Text>
            </View>
            {selectedPoint?.images?.length === 0 ? (
              <View className="flex justify-center items-center h-40">
                <Text className="text-gray-600">Inga bilder tillagda</Text>
              </View>
            ) : (
              <ScrollView
                horizontal
                contentContainerStyle={{
                  paddingHorizontal: 16,
                  paddingTop: 4,
                  gap: 16,
                }}
                className="flex w-full"
              >
                <Image
                  source={{
                    uri: "https://picsum.photos/200/300",
                  }}
                  style={{ width: 200, height: 160 }}
                  className="rounded-sm"
                />
                <Image
                  source={{
                    uri: "https://picsum.photos/200/300",
                  }}
                  style={{ width: 200, height: 160 }}
                  className="rounded-sm"
                />
                <Image
                  source={{
                    uri: "https://picsum.photos/200/300",
                  }}
                  style={{ width: 200, height: 160 }}
                  className="rounded-sm"
                />
              </ScrollView>
            )}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}
