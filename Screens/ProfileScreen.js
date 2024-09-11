import {  View ,TextInput , StyleSheet ,ImageBackground} from "react-native";


export default function FavouriteScreen() {
    return(
        <View>
          <ImageBackground
        source={require("../assets/m2.png")}
        style={styles.backgroundImage}
      >
            <TextInput style={styles.input} placeholder="User Profile"/>
          </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: "#f5f5f5",
      // paddingHorizontal: 20,
    },
    input: {
        height: 50,
        width: "90%",
        alignSelf: "center",
        alignContent:"center",
        justifyContent:"center",
        // borderColor: "#ddd",
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        marginVertical: "auto",
        borderRadius: 100,
      }, 
      backgroundImage: {
        height: "100%",
        width: "100%",
      },
    });
