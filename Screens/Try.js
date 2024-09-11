import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const API_KEY = '4e5572039c914d1e01b8204518c64978'; 
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

const HomeScreen = () => {
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
      setError('Failed to fetch movies.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader1}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center1}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.movieItem1}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster1}
      />
      <Text style={styles.title1}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container1}>
      <Text style={styles.header1}>Popular Movies</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list1}
      />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  loader1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error1: {
    fontSize: 18,
    color: 'red',
  },
  header1: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  list1: {
    paddingBottom: 20,
  },
  movieItem1: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  poster1: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  title1: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    flexShrink: 1,
  },
});

export default HomeScreen;
