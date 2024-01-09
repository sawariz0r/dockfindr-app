import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack, useRouter, usePathname } from "expo-router";
import { FetchResult, Pressable, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { getPoints } from "../../api/points";
import { useEffect } from "react";
import { usePointsStore } from "./_store";

export default function MainLayout() {
  const router = useRouter();
  const pathname = usePathname();

  const { update } = usePointsStore();

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const points = await getPoints();
        update({ points });
      } catch (e) {
        console.error(e);
      }
    };

    fetchPoints();
  }, []);

  return (
    <>
      <SafeAreaView className="h-[100px] bg-cyan-800">
        <View className="absolute w-full bottom-0 flex pb-3 flex-row px-4 justify-between">
          <View className="flex flex-row">
            <Ionicons name="boat" size={24} color="white" />

            <Text className="text-white text-xl ml-1 font-semibold">
              Dockfindr
            </Text>
          </View>

          <View className="flex flex-row items-center gap-x-2">
            {/*<Ionicons name="search" size={20} color="white" />*/}

            {pathname === "/menu" ? (
              <Pressable onPress={() => router.push("/(main)")}>
                <Ionicons name="close" size={28} color="white" />
              </Pressable>
            ) : (
              <Pressable onPress={() => router.push("/(main)/menu")}>
                <Ionicons name="menu" size={28} color="white" />
              </Pressable>
            )}
          </View>
        </View>
      </SafeAreaView>

      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Main",
          }}
        />
        <Stack.Screen
          name="menu"
          options={{
            title: "Menu",
          }}
        />
      </Stack>
    </>
  );
}
