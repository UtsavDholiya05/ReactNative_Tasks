
import React, { useContext } from 'react';
import { Button, View, Text } from 'react-native';
import { FavoritesContext } from '../context/FavoritesContext';

const MovieScreen = ({ movie }) => {
  const { addFavorite } = useContext(FavoritesContext);

  return (
    <View>
      <Text>{movie.title}</Text>
      <Button title="Add to Favorites" onPress={() => addFavorite(movie)} />
    </View>
  );
};

export default MovieScreen;
