import { Stack } from "expo-router";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { View, Text, StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitle: () => (
          <View style={styles.header}>
            <FontAwesome6 name="money-bills" size={24} color="#324673" />
            <Text style={styles.title}>BANCO</Text>
          </View>
        )
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[details]" />
      <Stack.Screen name="add" />
    </Stack>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  title: {
    fontSize: 20,
    color: '#324673',
    fontWeight: 'bold',
  }
});
 