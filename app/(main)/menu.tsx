import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MenuScreen() {
  const router = useRouter();
  return (
    <View className="flex-1">
      <View className="flex-1 gap-y-2 pt-4">
        <Pressable
          onPress={() => router.push("/suggest")}
          className="flex flex-row gap-x-2 bg-white mx-2 rounded-md py-4 px-2 items-center"
        >
          <MaterialCommunityIcons
            name="thought-bubble"
            size={24}
            color="rgb(51,65,85)"
          />

          <Text className="text-slate-700 text-lg ml-1 font-medium">
            Föreslå plats
          </Text>
        </Pressable>

        <View className="flex-1" />

        <SafeAreaView className="gap-y-2">
          <Text className="text-slate-700/50 text-sm px-4">
            Built with ❤️ by Oscar Vale & Marco Witt
          </Text>

          <Text className="text-slate-700/50 text-sm px-4">
            Version 1.0.0 (build 1)
          </Text>
        </SafeAreaView>
      </View>
    </View>
  );
}
