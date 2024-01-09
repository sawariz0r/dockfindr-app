import { Pressable, Text, TextInput, View } from "react-native";
import { useSuggestStore } from "./_store";
import { ScrollView } from "react-native-gesture-handler";

export default function SetTypesScreen() {
  const { update, rampTypes, price } = useSuggestStore();

  const handleUploadImage = () => {
    console.log("upload image");
  };

  const handleUpdateRampTypes = (tag: string) => {
    const newRampTypes = rampTypes?.includes(
      tag as "naturramp" | "anlagd-ramp" | "annat"
    )
      ? rampTypes?.filter(
          (rampType) =>
            rampType !== (tag as "naturramp" | "anlagd-ramp" | "annat")
        )
      : [...(rampTypes || []), tag as "naturramp" | "anlagd-ramp" | "annat"];

    update({ rampTypes: newRampTypes });
  };

  const handlePriceChange = (price: string) => {
    // Make sure it doesnt become NaN
    if (price === "") {
      update({ price: 0 });
      return;
    }
    update({ price: parseInt(price) });
  };

  const rampNames: Record<string, string> = {
    naturramp: "Naturramp",
    "anlagd-ramp": "Anlagd ramp",
    annat: "Annat",
  };

  return (
    <ScrollView className="flex-1">
      <View className="flex-1 gap-y-2 pt-4 px-4">
        <Text>Ramptyp</Text>
        {["naturramp", "anlagd-ramp", "annat"].map((tag: string) => (
          <View key={tag}>
            <Pressable
              onPress={() =>
                handleUpdateRampTypes(
                  tag as "naturramp" | "anlagd-ramp" | "annat"
                )
              }
              className={`p-2 rounded-md ${
                rampTypes?.includes(
                  tag as "naturramp" | "anlagd-ramp" | "annat"
                )
                  ? "bg-blue-500"
                  : "bg-gray-200"
              }`}
            >
              <Text
                className={`text-center ${
                  rampTypes?.includes(
                    tag as "naturramp" | "anlagd-ramp" | "annat"
                  )
                    ? "text-white"
                    : "text-gray-500"
                }`}
              >
                {rampNames[tag]}
              </Text>
            </Pressable>
          </View>
        ))}

        <Text>Pris?</Text>
        <TextInput
          placeholder="Pris"
          className="border-2 border-gray-200 rounded-md p-2"
          onChangeText={handlePriceChange}
          keyboardType="numeric"
          value={price?.toString() || ""}
        />

        <Text>Bilder</Text>
        <View className="flex-1 gap-x-2">
          <View className="flex-1">
            <Pressable
              onPress={handleUploadImage}
              className="bg-blue-500 p-2 rounded-md"
            >
              <Text className="text-white text-center">Ladda upp</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
