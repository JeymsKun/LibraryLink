import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Text, Card } from "react-native-paper";
import { books } from "../data/booksData";

export default function LibraryScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <TouchableOpacity>
              <ImageBackground source={item.cover} style={styles.cover}>
                <View style={styles.overlay}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.author}>{item.author}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  flatListContainer: {
    justifyContent: "center",
  },
  card: {
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    width: "145",
  },
  cover: {
    flex: 1,
    height: 200,
    justifyContent: "flex-end",
  },
  overlay: {
    padding: 10,
    backgroundColor: "rgba(82, 82, 82, 0.5)",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  author: {
    fontSize: 14,
    color: "#ddd",
  },
});
