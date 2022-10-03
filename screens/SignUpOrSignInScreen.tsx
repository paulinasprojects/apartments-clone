import { View, StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import LottieView from "lottie-react-native";
import { Screen } from "../components/Screen";
import { ModalHeader } from "../components/ModalHeader";
import { SignInAndSignUpButtons } from "../components/SignInAndSignUpButtons";

export const SignUpOrSignInScreen = () => {
  return (
    <Screen>
      <ModalHeader text="PDApartments" xShown />
      <View style={styles.container}>
        <Text category={"h5"} style={styles.header}>
          Add Properties
        </Text>
        <LottieView
          autoPlay
          style={styles.lottie}
          source={require("../assets/lotties/AddProperty.json")}
        />
        <Text category={"h6"} style={styles.text}>
          Create an Account or Sign In
        </Text>
        <Text appearance={"hint"} style={[styles.text, styles.bottomText]}>
          To add your properties, you must create an account or sign in.
        </Text>
        <SignInAndSignUpButtons />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  header: {
    marginVertical: 20,
    alignSelf: "center",
  },
  lottie: {
    marginBottom: 50,
    height: 250,
    width: 250,
    alignSelf: "center",
  },
  text: {
    textAlign: "center",
  },
  bottomText: {
    marginTop: 10,
    marginBottom: 30,
  },
});
