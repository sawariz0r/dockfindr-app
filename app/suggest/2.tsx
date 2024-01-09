import { Text, TextInput, View } from "react-native";
import { useSuggestStore } from "./_store";

export default function SetDockNameScreen() {
  const { update, title } = useSuggestStore();

  const handleNameChange = (name: string) => {
    update({ title: name });
  };

  return (
    <View className="flex-1">
      <View className="flex-1 gap-y-2 pt-4 px-4">
        <Text>Fyll i ett kort och lämpligt namn för platsen.</Text>

        <TextInput
          placeholder="Namn"
          className="border-2 border-gray-200 rounded-md p-2"
          onChangeText={handleNameChange}
          value={title || ""}
        />
      </View>
    </View>
  );
}
