import { ExpoRouter } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <ExpoRouter />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
