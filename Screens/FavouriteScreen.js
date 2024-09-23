import { View, TextInput, StyleSheet, ImageBackground } from "react-native";

export default function FavouriteScreen() {
  return (
    <View>
      <ImageBackground
        source={require("../assets/m2.png")}
        style={styles.backgroundImage}
      >
        <TextInput
          style={styles.input}
          placeholder="Favorites will be displayed here"
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    // paddingHorizontal: 20,
    justifyContent: "center",
  },
  input: {
    height: 50,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    // borderColor: "#ddd",
    backgroundColor: "#fff",
    borderRadius: 100,
    // marginBottom: 15,
    paddingHorizontal: 10,
    marginVertical: "auto",
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
  },
});
