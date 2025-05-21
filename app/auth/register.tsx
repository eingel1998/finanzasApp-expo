import React, { useState, useContext } from 'react';
import { View, TextInput, StyleSheet, Alert, Pressable } from 'react-native';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authContext = useContext(AuthContext);
  const router = useRouter();

  if (!authContext) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Cargando...</ThemedText>
      </ThemedView>
    );
  }

  const { register } = authContext;

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Entrada Inválida', 'Por favor, completa todos los campos.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Contraseña Débil', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // TODO: The current User model doesn't have a password field.
    // The register function in AuthContext will need to handle this.
    // It might store the user without a password or use a placeholder mechanism for now.
    // This needs to be addressed when password storage and hashing are implemented.
    try {
      const success = await register(name, email, password);
      if (success) {
        Alert.alert('Registro Exitoso', 'Tu cuenta ha sido creada y has iniciado sesión.');
        router.replace('/profile'); // Navigate to profile or home
      } else {
        // This part depends on how AuthContext's register function signals failure (e.g., email exists)
        Alert.alert('Error de Registro', 'No se pudo crear la cuenta. Es posible que el correo ya esté en uso.');
      }
    } catch (error: any) {
      console.error("Register error:", error);
      Alert.alert('Error de Registro', error.message || 'Ocurrió un error inesperado durante el registro.');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Crear Cuenta</ThemedText>
      
      <TextInput
        style={[styles.input, {color: '#000'}]}
        placeholder="Nombre Completo"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        placeholderTextColor="#888888"
      />
      <TextInput
        style={[styles.input, {color: '#000'}]}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#888888"
      />
      <TextInput
        style={[styles.input, {color: '#000'}]}
        placeholder="Contraseña (mín. 6 caracteres)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#888888"
      />
      <Pressable 
        style={({ pressed }) => [styles.button, styles.registerButton, pressed && styles.buttonPressed]}
        onPress={handleRegister}
      >
        <ThemedText style={styles.buttonText}>Registrarse</ThemedText>
      </Pressable>

      <View style={styles.footer}>
        <ThemedText style={styles.footerText}>¿Ya tienes una cuenta? </ThemedText>
        <Pressable onPress={() => router.push('/auth/login')}>
          <ThemedText style={styles.linkText}>Inicia sesión aquí</ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
  },
  input: {
    height: 55,
    backgroundColor: 'rgba(255,255,255,0.7)', 
    borderColor: '#cccccc',
    borderWidth: 1,
    marginBottom: 18,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontSize: 17,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  registerButton: {
    backgroundColor: '#28a745', // Un color verde para registro
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
  },
  linkText: {
    fontSize: 16,
    color: '#007AFF', // Azul para el enlace, consistente con la pantalla de login
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
