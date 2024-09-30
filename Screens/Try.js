import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Image,
  ActivityIndicator,
  Dimensions, // Import Dimensions for calculating width
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";
import { FavoritesContext } from "../Context/EditFavorite";
import { UserContext } from "../Context/Login";

const API_KEY = "4e5572039c914d1e01b8204518c64978";
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

export default function HomeScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, setUser } = useContext(UserContext);

  const { addToFavorites, removeFromFavorites, isFavorite } =
    useContext(FavoritesContext);

  const windowWidth = Dimensions.get("window").width; // Get the screen width
  const itemWidth = (windowWidth - 40) / 2; // Calculate width for each movie item with padding

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setMovies(response.data.results);
    } catch (err) {
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  const renderMovieItem = ({ item }) => {
    const favorite = isFavorite(item.id);
    return (
      <View style={[styles.movieItem, { width: itemWidth }]}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          }}
          style={styles.poster}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.movieTitle}>{item.title}</Text>
          <Icon
            name={favorite ? "heart" : "heart-outline"}
            size={25}
            color={favorite ? "red" : "white"}
            style={styles.icon}
            onPress={() =>
              favorite ? removeFromFavorites(item.id) : addToFavorites(item)
            }
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../t/WhatsApp Image 2024-09-28 at 21.29.25_158d91f3.jpg")}
        style={styles.backgroundImage}
      >
        <Text style={styles.header2}>Movie Recommendations</Text>

        {/* Loader and error handling */}
        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : error ? (
          <View style={styles.center}>
            <Text style={styles.error}>{error}</Text>
          </View>
        ) : (
          <FlatList
            data={movies}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2} 
            columnWrapperStyle={styles.columnWrapper}
            renderItem={renderMovieItem}
          />
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 10, // Add padding to avoid items touching the screen edge
  },
  header2: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#fff",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    fontSize: 18,
    color: "red",
  },
  poster: {
    width: "100%", // Make poster fill the width of its container
    height: 150,
    borderRadius: 8,
  },
  movieItem: {
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "white",
    borderStyle: "solid",
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    padding: 10,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Add background color for better visibility
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    flexShrink: 1,
  },
});

