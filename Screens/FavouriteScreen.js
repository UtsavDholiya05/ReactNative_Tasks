import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { FavoritesContext } from "../Context/EditFavorite";

export default function FavoritesScreen() {
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/m2.png")}
        style={styles.backgroundImage}
      >
        {/* <TextInput
          style={styles.input}
          placeholder="Favorites will be displayed here"
          editable={false}
        /> */}

        <Text style={styles.text}>Favorite Movies</Text>

        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.movieItem}>
              <Text style={styles.movieTitle}>{item.title}</Text>
              <Button
                title="Remove"
                onPress={() => removeFromFavorites(item.id)}
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
<<<<<<< HEAD
    elevation: 3, 
=======
    elevation: 3,
   
>>>>>>> f85b2a3a1ccb2043d03bf3501d11dd3ddf7d38d3
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
  text: {
    color: "black",
    alignSelf: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    margin: 20,
  },
});
