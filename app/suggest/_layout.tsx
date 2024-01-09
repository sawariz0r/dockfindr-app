import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, usePathname, useRouter } from "expo-router";
import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useSuggestStore } from "./_store";
import { sendPointSuggestion } from "../../api/points";

export default function SuggestLayout() {
  const router = useRouter();
  const pathName = usePathname();
  const store = useSuggestStore();

  const paths: Record<string, number> = {
    "/suggest": 1,
    "/suggest/1": 1,
    "/suggest/2": 2,
    "/suggest/3": 3,
    "/suggest/4": 4,
    "/suggest/5": 5,
  };

  const pathConditions: Record<string, boolean> = {
    "/suggest/1": store.location[0] !== 0 && store.location[1] !== 0,
    "/suggest/2": !!store.title && store.title !== "" && store.title.length > 1,
    "/suggest/3":
      !!store.rampTypes &&
      store.rampTypes.length > 0 &&
      store.rampTypes.length < 5,
    "/suggest/4": true,
  };

  const currentStep = paths[pathName];
  const currentPath: any = `/suggest/${currentStep}`;
  const nextPath: any = `/suggest/${currentStep + 1}`;
  const hasReachedEnd = currentStep === 5;

  const handleBack = () => {
    router.back();
  };

  const handleNext = async () => {
    if (hasReachedEnd) {
      //store.reset();
      await sendPointSuggestion();
      router.replace("/(main)/menu");
      Alert.alert("Förslag skickat!", "Ditt förslag har skickats in. Tack!");
      return;
    }

    if (pathConditions[currentPath]) {
      router.push(nextPath);
    } else {
      if (currentStep === 1) {
        Alert.alert("Plats ej vald", "Du måste välja en plats på kartan.");
      } else {
        Alert.alert("Ojsan!", "Det verkar som att du har missat något fält.");
      }
    }
  };

  const handleClose = () => {
    store.reset();
    router.replace("/(main)/menu");
  };

  return (
    <SafeAreaProvider className="flex-1">
      <SafeAreaView
        edges={["top", "left", "right"]}
        className="flex flex-row justify-between pb-4 px-4 bg-cyan-800"
      >
        <Text className="text-white text-xl ml-1 font-semibold">
          Föreslå en ny plats
        </Text>

        <Pressable onPress={handleClose}>
          <Ionicons name="close" size={28} color="white" />
        </Pressable>
      </SafeAreaView>

      <View className="pt-4 pb-4 flex-row gap-x-2">
        {[1, 2, 3, 4, 5].map((step) => (
          <View key={step} className={`flex-1 flex flex-col items-center`}>
            <View
              className={`rounded-full w-8 h-8 flex items-center justify-center ${
                step <= currentStep ? "bg-cyan-800" : "bg-cyan-800/20"
              }`}
            >
              <Text
                className={`text-white text-sm ${
                  step === 1 ? "font-bold" : ""
                }`}
              >
                {step}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <Stack
        initialRouteName="1"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="1"
          options={{
            title: "Main",
          }}
        />
        <Stack.Screen
          name="2"
          options={{
            title: "Change name",
            animation: "none",
          }}
        />
        <Stack.Screen
          name="3"
          options={{
            title: "Add information",
            animation: "none",
          }}
        />
        <Stack.Screen
          name="4"
          options={{
            title: "Add images",
            animation: "none",
          }}
        />
        <Stack.Screen
          name="5"
          options={{
            title: "Add location",
            animation: "none",
          }}
        />
      </Stack>

      <KeyboardAvoidingView behavior="position">
        <SafeAreaView
          edges={["bottom"]}
          className="flex px-4 flex-row justify-between"
        >
          {(currentStep !== 1 && pathName !== "/suggest" && (
            <Pressable
              onPress={handleBack}
              className="flex flex-row bg-cyan-800 mx-2 rounded-md py-2 px-4 items-center"
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={18}
                color="#ffffff"
              />
              <Text className="text-white ml-1 font-medium">Tillbaka</Text>
            </Pressable>
          )) || <View className="w-8" />}

          <Pressable
            onPress={handleNext}
            className="flex flex-row bg-cyan-800 mx-2 rounded-md py-2 px-4 items-center"
          >
            <Text className="text-white mr-1 font-medium">
              {hasReachedEnd ? "Skicka in" : "Nästa"}
            </Text>

            {hasReachedEnd ? (
              <MaterialCommunityIcons name="send" size={18} color="#ffffff" />
            ) : (
              <MaterialCommunityIcons
                name="arrow-right"
                size={18}
                color="#ffffff"
              />
            )}
          </Pressable>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}
