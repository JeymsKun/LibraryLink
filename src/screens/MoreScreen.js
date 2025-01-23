import React from "react";
import { View, StyleSheet } from "react-native";
import { List, Text } from "react-native-paper";

export default function MoreScreen() {
  return (
    <View style={styles.container}>
      <List.Section>
        <List.Item title="Settings" left={() => <List.Icon icon="cog" />} />
        <List.Item title="Help" left={() => <List.Icon icon="help-circle" />} />
        <List.Item
          title="About"
          left={() => <List.Icon icon="information" />}
        />
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
