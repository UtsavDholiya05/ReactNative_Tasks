import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import { FavoritesContext } from "../Context/EditFavorite";
import Icon from "react-native-vector-icons/FontAwesome";

export default function FavoritesScreen() {
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../t/WhatsApp Image 2024-09-28 at 21.29.25_158d91f3.jpg")}
        style={styles.backgroundImage}
      >
        <Text style={styles.text}>Favorite Movies</Text>

        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.movieItem}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={styles.poster}
              />
              <View style={styles.titleContainer}>
                <Text style={styles.movieTitle}>{item.title}</Text>
                <Icon
                  name="heart"
                  size={24}
                  color="red"
                  style={styles.icon}
                  onPress={() => removeFromFavorites(item.id)}
                />
              </View>
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
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },
  movieItem: {
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "white",
    borderStyle: "solid",
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    alignSelf: "center",
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  titleContainer: {
    flex: 1,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
  },
  text: {
    color: "#fff",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 30,
    margin: 20,
  },
  icon: {
    marginLeft: 10,
  },
});
