import { Text, TextInput, View } from "react-native";
import { useSuggestStore } from "./_store";

export default function SetAdditionalInfoScreen() {
  const { update, additionalInfo, createdBy } = useSuggestStore();

  const handleAdditionalInfoChange = (info: string) => {
    update({ additionalInfo: info });
  }

  const handleEmailChange = (email: string) => {
    update({ createdBy: email });
  };

  return (
    <View className="flex-1">
      <View className="flex-1 gap-y-2 pt-4 px-4">
        <Text>Övrig information</Text>
        <TextInput
          multiline
          placeholder="Information"
          className="border-2 border-gray-200 rounded-md p-2"
          onChangeText={handleAdditionalInfoChange}
          value={additionalInfo || ""}
        />
        
        <View className="gap-y-1">
          <Text>Din email</Text>

          <TextInput
            placeholder="Email (valfritt)"
            className="border-2 border-gray-200 rounded-md p-2"
            onChangeText={handleEmailChange}
            value={createdBy || ""}
          />

          <Text className="text-gray-500 text-xs">
            Vi kommer inte att dela din email med någon annan eller använda den
            för något annat än att kontakta dig om vi har frågor om din
            föreslagna plats.
          </Text>
        </View>

      </View>
    </View>
  );
}
