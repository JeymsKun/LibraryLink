import React, { useState } from "react";
import { BottomNavigation, Appbar, Menu } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, StyleSheet, StatusBar, Animated } from "react-native";
import LibraryScreen from "../screens/LibraryScreen";
import BrowseScreen from "../screens/BrowseScreen";
import MoreScreen from "../screens/MoreScreen";
import SortComponent from "../component/sort";

export default function Layout() {
  const [index, setIndex] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);
  const animatedValue = new Animated.Value(1);

  const routes = [
    {
      key: "library",
      title: "Library",
      icon: "book",
    },
    {
      key: "browse",
      title: "Browse",
      icon: "magnify",
    },
    {
      key: "more",
      title: "More",
      icon: "dots-horizontal",
    },
  ];

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const renderAppbarActions = () => {
    switch (routes[index].key) {
      case "library":
        return (
          <>
            <Appbar.Action
              icon="magnify"
              onPress={() => console.log("Search in Library")}
            />
            <Appbar.Action icon="sort" onPress={() => setSortVisible(true)} />
            <Appbar.Action
              icon="dots-vertical"
              onPress={() => console.log("Other Settings")}
            />
          </>
        );
      default:
        return null;
    }
  };

  const renderScene = BottomNavigation.SceneMap({
    library: () => (
      <View style={styles.screenContainer}>
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor="transparent"
          hidden={false}
        />
        <LibraryScreen />
      </View>
    ),
    browse: () => (
      <View style={styles.screenContainer}>
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor="transparent"
          hidden={false}
        />
        <BrowseScreen />
      </View>
    ),
    more: () => (
      <View style={styles.screenContainer}>
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor="transparent"
          hidden={false}
        />
        <MoreScreen />
      </View>
    ),
  });

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={styles.transparentAppBar}>
        <Appbar.Content title={routes[index].title} />
        {renderAppbarActions()}
      </Appbar.Header>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={(newIndex) => {
          setIndex(newIndex);
          startAnimation();
        }}
        renderScene={renderScene}
        renderIcon={({ route, focused, color }) => (
          <Animated.View
            style={{
              transform: [
                {
                  scale: focused ? animatedValue : 1,
                },
              ],
            }}
          >
            <MaterialCommunityIcons
              name={route.icon}
              size={24}
              color={focused ? "blue" : color}
            />
          </Animated.View>
        )}
      />
      <SortComponent
        visible={sortVisible}
        onClose={() => setSortVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  transparentAppBar: {
    backgroundColor: "white",
    elevation: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
});
