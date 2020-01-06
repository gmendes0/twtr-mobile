import React, { useState } from "react";
import {
  StyleSheet,
  AsyncStorage,
  Keyboard,
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

import api from "../../services/api";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    Keyboard.dismiss();

    if (!email || !password) {
      Alert.alert(
        "Não foi possível enviar seus dados",
        "Verifique se os campos estão preenchidos corretamente."
      );

      return null;
    }

    setLoading(true);

    const response = await api.post("/login", { email, password });

    api.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401)
          Alert.alert("Dados incorretos", "Email ou senha incorreta");
      }
    );

    setLoading(false);

    if (!response) return null;

    if (!response.data || response.data.error) {
      Alert.alert("Falha ao fazer login", "Não foi possível fazer o login");

      return null;
    }

    const { token } = response.data;

    if (token) await AsyncStorage.setItem("token", token);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>EMAIL *</Text>
          <TextInput
            style={styles.input}
            placeholder="Seu email"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>SENHA *</Text>
          <TextInput
            style={styles.input}
            placeholder="Sua senha"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.btnLabel}>Login</Text>
        {loading && (
          <ActivityIndicator
            style={styles.loading}
            color="#FFF"
            animating={loading}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.linkText}>
          Não possui uma conta? Cadastre-se aqui.
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 50
  },
  form: {
    alignSelf: "stretch"
  },
  inputGroup: {
    marginBottom: 30
  },
  label: {
    marginBottom: 10,
    fontSize: 11,
    fontWeight: "bold",
    color: "#5C5C5C"
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#DDD",
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  button: {
    alignSelf: "stretch",
    justifyContent: "center",
    backgroundColor: "#1CA1EF",
    paddingVertical: 20,
    marginBottom: 10,
    flexDirection: "row"
  },
  btnLabel: {
    color: "#FFF"
  },
  link: {
    alignSelf: "center",
    paddingVertical: 3
  },
  linkText: {
    color: "#777"
  },
  loading: {
    marginLeft: 10
  }
});
