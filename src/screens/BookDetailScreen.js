import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Pdf from "react-native-pdf";
import { Text } from "react-native-paper";

export default function BookDetailScreen({ route }) {
  const { book } = route.params;

  const localPdfPath = require(`../assets/pdf/${book.pdfName}`);

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>
        {book.title}
      </Text>
      <Text variant="titleMedium" style={styles.author}>
        {book.author}
      </Text>
      <Pdf
        source={localPdfPath}
        style={styles.pdf}
        onError={(error) => {
          console.error(error);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: 10,
  },
  author: {
    textAlign: "center",
    marginBottom: 20,
    fontStyle: "italic",
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
