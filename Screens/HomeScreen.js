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
        // resizeMode="repeat"
      >
        <View style={styles.header}>
          <Text style={styles.text}>Welcome!</Text>

          <View style={styles.ButtonView}>
            <TouchableOpacity>
              <Text
                style={styles.buttonText}
                onPress={() => navigation.navigate("Login")}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ButtonView}>
            <TouchableOpacity>
              <Text
                style={styles.buttonText}
                onPress={() => navigation.navigate("Sign Up")}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View> 

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
    // backgroundColor:"black",
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
    // resizeMode: "cover"
  },
  // textWelcome: {
  //   fontSize: 33,
  //   marginBottom: 40,
  //   textAlign: "center",
  //   color: "#fff",
  //   marginTop: 40,
  //   marginLeft: 20,
  // },

  text: {
    fontSize: 33,
    marginBottom: 10,
    textAlign: "center",
    color: "#fff",
    marginTop: 20,
    marginLeft: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
  },
  ButtonView: {
    marginHorizontal: "auto",
    // marginVertical: 5,
    paddingVertical: 20,
    width: 70,
    marginLeft: "auto",
  },
  // buttonTO: {
  //   // paddingVertical: 30,
  // },
  buttonText: {
    height: 45,
    width: "auto",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: 10,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  header2: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    marginTop: 18,
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
  movieItem: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    flexShrink: 1,
    color: "#fff",
  },
  heartIcon: {
    marginLeft: "auto",
  },
  profilePhoto: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginVertical: 15,
    marginLeft: 30,
    marginRight: 10,
    marginTop: 20,
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
    // elevation: 3,
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
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
});
