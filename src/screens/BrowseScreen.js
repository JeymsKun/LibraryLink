import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Searchbar, Text, Card, Chip } from "react-native-paper";
import { books } from "../data/booksData";
import { useRouter } from "expo-router";

const genres = [
  "Fantasy",
  "Science",
  "Learning Programs",
  "Programming Languages",
  "Astronomy",
  "Mystery",
  "Horror",
  "Romance",
  "Thriller",
  "History",
  "Manga",
  "Manhua",
  "News",
  "Magazines",
  "Comic Books",
  "Dictionary",
  "Biography",
  "Cookbooks",
  "Travel",
  "Poetry",
  "Art",
  "Psychology",
  "Business",
  "Health",
  "Politics",
  "Science Fiction",
  "Non-fiction",
  "Sports",
  "Philosophy",
  "Music",
  "Children's Books",
  "Classic Literature",
  "Religion",
  "Spirituality",
];

export default function BrowseScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [showAllGenres, setShowAllGenres] = useState(false);

  const filteredBooks = books.filter(
    (book) =>
      (!selectedGenre || book.genre === selectedGenre) &&
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onChangeSearch = (query) => setSearchQuery(query);
  const onSelectGenre = (genre) => setSelectedGenre(genre);
  const toggleShowAllGenres = () => setShowAllGenres((prev) => !prev);

  const renderGenreChips = () => {
    const genresToDisplay = showAllGenres ? genres : genres.slice(0, 5);
    return genresToDisplay.map((genre) => (
      <TouchableOpacity
        key={genre}
        style={[
          styles.genreChip,
          selectedGenre === genre && styles.selectedGenre,
        ]}
        onPress={() => onSelectGenre(genre)}
      >
        <Text
          style={[
            selectedGenre === genre ? styles.selectedText : styles.genreText,
          ]}
        >
          {genre}
        </Text>
      </TouchableOpacity>
    ));
  };

  const numColumns = 2;

  const handleBookPress = (item) => {
    router.push({
      pathname: `/screens/BookDetailScreen/${item.id}`,
      params: { book: JSON.stringify(item) },
    });
  };

  return (
    <FlatList
      data={filteredBooks}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
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
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <>
          <Searchbar
            placeholder="Search books..."
            value={searchQuery}
            onChangeText={onChangeSearch}
            style={styles.searchbar}
          />

          <Text variant="headlineMedium">Genres</Text>
          <View style={styles.genreContainer}>
            {renderGenreChips()}
            <TouchableOpacity onPress={toggleShowAllGenres}>
              <Chip icon="dots-horizontal" style={styles.dotsChip} />
            </TouchableOpacity>
          </View>

          {selectedGenre && (
            <Text variant="headlineLarge">Books in "{selectedGenre}"</Text>
          )}
        </>
      }
      ListEmptyComponent={
        <Text style={styles.emptyMessage}>No books found in this genre!</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  searchbar: {
    marginBottom: 14,
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 14,
    alignItems: "flex-start",
    position: "relative",
  },
  genreChip: {
    marginRight: 8,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    width: "auto",
    borderWidth: 1,
  },
  selectedGenre: {
    backgroundColor: "#ffffff",
    borderColor: "#6200ee",
  },
  selectedText: {
    color: "#6200ee",
  },
  genreText: {
    color: "#000",
  },
  dotsChip: {
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    elevation: 0,
  },
  card: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  cover: {
    width: "100%",
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
  emptyMessage: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
});
