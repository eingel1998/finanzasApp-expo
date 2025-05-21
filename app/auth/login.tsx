import React, { useState, useContext } from 'react';
import { View, TextInput, StyleSheet, Alert, Pressable } from 'react-native';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authContext = useContext(AuthContext);
  const router = useRouter();

  if (!authContext) {
    // Context not yet available. You could show a loading spinner.
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Cargando...</ThemedText>
      </ThemedView>
    );
  }

  const { login } = authContext;

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Entrada Inválida', 'Por favor, ingresa tu correo electrónico y contraseña.');
      return;
    }

    // TODO: La implementación actual de login en AuthContext podría no verificar la contraseña
    // ya que el modelo User aún no incluye un campo para la contraseña hash.
    // Esto es temporal y deberá actualizarse cuando se implemente el almacenamiento seguro de contraseñas.
    try {
      const success = await login(email, password);
      if (success) {
        Alert.alert('Inicio de Sesión Exitoso', 'Has iniciado sesión correctamente.');
        // Navegar a la pantalla de perfil o a la pantalla principal después del inicio de sesión
        router.replace('/profile'); 
      } else {
        // La función login en AuthContext debería devolver false si las credenciales son incorrectas.
        Alert.alert('Error de Inicio de Sesión', 'Correo electrónico o contraseña incorrectos. Por favor, inténtalo de nuevo.');
      }
    } catch (error: any) {
      console.error("Login error:", error);
      Alert.alert('Error de Inicio de Sesión', error.message || 'Ocurrió un error inesperado durante el inicio de sesión.');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Iniciar Sesión</ThemedText>
      
      <TextInput
        style={[styles.input, { color: '#000' }]} // Ensuring text color is visible
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#888888" // Color del placeholder
      />
      <TextInput
        style={[styles.input, { color: '#000' }]} // Ensuring text color is visible
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#888888" // Color del placeholder
      />
      <Pressable 
        style={({ pressed }) => [styles.button, styles.loginButton, pressed && styles.buttonPressed]}
        onPress={handleLogin}
      >
        <ThemedText style={styles.buttonText}>Iniciar Sesión</ThemedText>
      </Pressable>

      <View style={styles.footer}>
        <ThemedText style={styles.footerText}>¿No tienes una cuenta? </ThemedText>
        <Pressable onPress={() => router.push('/auth/register')}>
          <ThemedText style={styles.linkText}>Regístrate aquí</ThemedText>
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
    // backgroundColor: '#f0f2f5', // Un color de fondo suave y moderno
  },
  title: {
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 32, // Ligeramente más grande
    fontWeight: 'bold',
    // color: '#333333', // Color de título oscuro
  },
  input: {
    height: 55, // Un poco más alto para mejor tacto
    // color: '#333', // Color del texto del input
    backgroundColor: 'rgba(255,255,255,0.7)', // Fondo para tema oscuro/claro
    borderColor: '#cccccc', // Borde sutil
    borderWidth: 1,
    marginBottom: 18,
    paddingHorizontal: 20,
    borderRadius: 10, // Bordes más redondeados
    fontSize: 17, // Tamaño de fuente ligeramente mayor
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    shadowColor: '#000', // Sombra para dar profundidad
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  loginButton: {
    backgroundColor: '#007AFF', // Azul vibrante de iOS
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }], // Efecto de presión sutil
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18, // Texto del botón más legible
    fontWeight: '600', // Semi-bold para mejor legibilidad
  },
  footer: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    // color: '#666666', // Texto del pie de página gris
  },
  linkText: {
    fontSize: 16,
    color: '#007AFF', // Color de enlace consistente con el botón
    fontWeight: 'bold',
    marginLeft: 5,
  },
});