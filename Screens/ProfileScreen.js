import {  View ,TextInput , StyleSheet } from "react-native";


export default function FavouriteScreen() {
    return(
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="User Profile"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
      paddingHorizontal: 20,
      justifyContent: "center",
    },
    input: {
        height: 50,
        width: "90%",
        alignSelf: "center",
        borderColor: "#ddd",
        backgroundColor: "rgb(220,220,220)",
        marginBottom: 15,
        paddingHorizontal: 10,
        marginVertical: 10,
        borderRadius: 100,
      },
    });
