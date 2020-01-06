import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Keyboard,
  Alert,
  AsyncStorage,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity
} from "react-native";

import api from "../../services/api";

export default function Register({ navigation }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [passwordConfirmation, setPassowrdConfirmation] = useState("");
  const [passwordError, setPassowrdError] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (passwordConfirmation && password && password !== passwordConfirmation) {
      setPassowrdError(true);
    } else {
      setPassowrdError(false);
    }
  }, [password, passwordConfirmation]);

  function validate() {
    if (!name || !username || !email || !password || !passwordConfirmation)
      return false;

    if (name.length < 3 || username.length < 1) return false;

    return true;
  }

  async function handleSubmit() {
    Keyboard.dismiss();

    if (password !== passwordConfirmation) {
      setPassowrdError(true);
    } else if (!validate()) {
      Alert.alert(
        "Erro ao enviar",
        "Verifique se os dados estão preenchidos corretamente."
      );
    } else {
      const response = await api.post("/register", {
        name,
        username,
        email,
        password
      });

      if (response.data && response.data.token) {
        await AsyncStorage.setItem("token", response.data.token);
        setToken(response.data.token);
      }

      if (response.data && response.data.error)
        Alert.alert("Error", "Não foi possível realizar o cadastro.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar</Text>
      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>NOME</Text>
          <TextInput
            style={styles.input}
            placeholder="seu nome completo"
            autoCapitalize="words"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>USERNAME</Text>
          <TextInput
            style={styles.input}
            placeholder="username"
            autoCapitalize="none"
            autoCorrect={false}
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            style={styles.input}
            placeholder="seu melhor email"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>SENHA</Text>
          <TextInput
            style={[
              styles.input,
              passwordError ? { borderColor: "#FF6B6B" } : {}
            ]}
            placeholder="senha"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onChangeText={setPassowrd}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>CONFIRMAR SENHA</Text>
          <TextInput
            style={[
              styles.input,
              passwordError ? { borderColor: "#FF6B6B" } : {}
            ]}
            placeholder="digite a mesma senha"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            value={passwordConfirmation}
            onChangeText={setPassowrdConfirmation}
          />
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.registerBtn} onPress={handleSubmit}>
        <Text style={styles.registerLabel}>Registrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginLink}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.loginLinkText}>
          Já possui uma conta? Faça login agora.
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 30
  },
  form: {
    alignSelf: "stretch"
  },
  inputContainer: {
    marginBottom: 25
  },
  label: {
    color: "#5C5C5C",
    fontWeight: "bold",
    fontSize: 11,
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#DDD",
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  registerBtn: {
    backgroundColor: "#1CA1EF",
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 10,
    alignSelf: "stretch"
  },
  registerLabel: {
    color: "#FFF"
  },
  loginLink: {
    alignSelf: "center",
    paddingVertical: 3
  },
  loginLinkText: {
    color: "#777"
  }
});
