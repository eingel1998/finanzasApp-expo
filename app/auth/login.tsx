import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { BorderRadius, Colors, Shadows, Spacing } from '@/constants/Theme';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

export default function LoginScreen() {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      if (isLogin) {
        // Proceso de inicio de sesión
        if (!email || !password) {
          Alert.alert('Error', 'Por favor completa todos los campos');
          return;
        }

        const success = await login({ email, password });
        if (success) {
          router.replace('/(tabs)');
          Alert.alert('¡Bienvenido!', 'Has iniciado sesión correctamente');
        }
      } else {
        // Proceso de registro
        if (!name || !email || !password || !confirmPassword) {
          Alert.alert('Error', 'Por favor completa todos los campos');
          return;
        }

        if (password !== confirmPassword) {
          Alert.alert('Error', 'Las contraseñas no coinciden');
          return;
        }

        const success = await register({ name, email, password });
        if (success) {
          router.replace('/(tabs)');
          Alert.alert('¡Registro exitoso!', 'Tu cuenta ha sido creada correctamente');
        }
      }
    } catch (error) {
      console.error('Error en autenticación:', error);
      Alert.alert('Error', 'Ocurrió un error durante el proceso');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    // Limpiar campos al cambiar de modo
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedView style={styles.formContainer}>
          <ThemedText type="title" style={styles.title}>
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </ThemedText>
          
          {!isLogin && (
            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Nombre</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Tu nombre"
                placeholderTextColor="#9E9E9E"
                value={name}
                onChangeText={setName}
              />
            </View>
          )}
          
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Correo Electrónico</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="correo@ejemplo.com"
              placeholderTextColor="#9E9E9E"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Contraseña</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Tu contraseña"
              placeholderTextColor="#9E9E9E"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          
          {!isLogin && (
            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Confirmar Contraseña</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Confirma tu contraseña"
                placeholderTextColor="#9E9E9E"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
          )}
          
          <Pressable 
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            <ThemedText style={styles.buttonText}>
              {isLoading ? 'Procesando...' : isLogin ? 'Iniciar Sesión' : 'Registrarse'}
            </ThemedText>
          </Pressable>
          
          <Pressable onPress={toggleMode}>
            <ThemedText style={styles.toggleText}>
              {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
            </ThemedText>
          </Pressable>
          
          <Pressable onPress={() => router.replace('/(tabs)')}>
            <ThemedText style={styles.skipText}>
              Continuar sin iniciar sesión
            </ThemedText>
          </Pressable>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  formContainer: {
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    ...Shadows.light.medium,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: Spacing.md,
  },
  label: {
    marginBottom: Spacing.xs,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  button: {
    backgroundColor: Colors.primary.light,
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  toggleText: {
    textAlign: 'center',
    marginTop: Spacing.lg,
    color: Colors.primary.light,
  },
  skipText: {
    textAlign: 'center',
    marginTop: Spacing.md,
    color: Colors.text.secondaryLight,
  },
});