import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ImageBackground,
  TextInput,
} from "react-native";
import { FavoritesContext } from "../Context/EditFavorite";

export default function FavoritesScreen() {
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={require("../assets/m2.png")}
        style={styles.backgroundImage}
      >
        {/* Input field for design */}
        <TextInput
          style={styles.input}
          placeholder="Favorites will be displayed here"
          editable={false}
        />

        {/* FlatList to display favorite movies */}
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.movieItem}>
              <Text style={styles.movieTitle}>{item.title}</Text>
              <Button
                title="Remove"
                onPress={() => removeFavorite(item.id)}
                color="#ff6347"
              />
            </View>
          )}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  input: {
    height: 50,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 100,
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },
  movieItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 3, // shadow for Android
    shadowColor: "#000", // shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    alignSelf: "center",
    width: "90%",
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
