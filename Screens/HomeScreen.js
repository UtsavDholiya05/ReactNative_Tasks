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
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = '4e5572039c914d1e01b8204518c64978'; 
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

export default function HomeScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const renderMovieItem = ({ item }) => (
    <View style={styles.movieItem}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/m2.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.h}>
            <Text style={styles.text}>Welcome!</Text>

            <View style={styles.viewButton}>
              <TouchableOpacity style={styles.buttonTO}>
                <Text
                  style={styles.buttonText}
                  onPress={() => navigation.navigate("Login")}
                >
                  Login
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.viewButton}>
              <TouchableOpacity style={styles.buttonTO}>
                <Text
                  style={styles.buttonText}
                  onPress={() => navigation.navigate("Sign Up")}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
        </View>

        <Text style={styles.header}>Movie Recommendations</Text>

        {loading ? (<View style={styles.loader}><ActivityIndicator size="large" color="#0000ff" /></View>) : error ? (<View style={styles.center}>
            <Text style={styles.error}>{error}</Text>
          </View>
        ) : (
          <FlatList 
            data={movies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderMovieItem}
            contentContainerStyle={styles.list}
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
  },
  text: {
    fontSize: 33,
    // fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: "#fff",
    marginTop: 30,
    marginLeft: 20,
  },
  viewButton: {
    // justifyContent: "center",
    // alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 5,
    height: 70,
    marginHorizontal: 20,
    width: 60,
  },
  buttonTO: {
    paddingVertical: 20,
  },
  buttonText: {
    height: 55,
    width: "130%",
    // alignSelf: "center",
    textAlign: "center",
    fontSize: 18,
    fontWeight:"bold",
    backgroundColor: "#fff",
    paddingTop: "25%",
    borderTopRightRadius: 15,
    borderBottomLeftRadius : 15,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    marginTop: 10,
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
  list: {
    paddingBottom: 20,
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
  h:{
    display:"flex",
    flexDirection:"row",
    // width:"100%"
  }
});
