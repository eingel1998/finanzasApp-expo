import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SettingsItem } from "@/components/ui/SettingsItem";
import { SettingsSection } from "@/components/ui/SettingsSection";
import { BorderRadius, Colors, Spacing } from "@/constants/Theme";
import { useAuth } from "@/context/AuthContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Appearance, Image, Pressable, StyleSheet, Switch, View } from "react-native";

export default function ProfileScreen() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';

  const handleSetColorScheme = (value: boolean) => {
    Appearance.setColorScheme(value ? 'dark' : 'light');
  };

  const navigateToLogin = () => {
    router.push('/auth/login');
  };

  const navigateToRegister = () => {
    // Navega a /auth/login y pasa un parámetro para abrir el modo registro
    router.push({ pathname: '/auth/login', params: { mode: 'register' } });
  };

  if (isLoading) {
    return (
      <ThemedView style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={Colors.primary[colorScheme]} />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SettingsSection title="Cuenta">
        {user ? (
          <View style={styles.userContainer}>
            {/* Placeholder para la imagen de perfil */}
            <Image 
              source={{ uri: user.avatar || 'https://via.placeholder.com/80' }} // Corregido a user.avatar
              style={styles.profileImage} 
            />
            <View style={styles.userInfo}>
              <ThemedText style={styles.userName}>{user.name}</ThemedText>
              <ThemedText style={styles.userEmail}>{user.email}</ThemedText>
            </View>
            <Pressable onPress={logout} style={styles.button}>
              <ThemedText style={styles.buttonText}>Cerrar Sesión</ThemedText>
            </Pressable>
          </View>
        ) : (
          <View style={styles.authActions}>
            <Pressable onPress={navigateToLogin} style={styles.button}>
              <ThemedText style={styles.buttonText}>Iniciar Sesión</ThemedText>
            </Pressable>
            <Pressable onPress={navigateToRegister} style={[styles.button, styles.secondaryButton]}>
              <ThemedText style={[styles.buttonText, styles.secondaryButtonText]}>Crear Cuenta</ThemedText>
            </Pressable>
          </View>
        )}
      </SettingsSection>

      <SettingsSection title="Preferencias">
        <SettingsItem
          icon={isDark ? "moon.fill" : "sun.max.fill"}
          title="Tema Oscuro"
          rightElement={
            <Switch
              value={isDark}
              onValueChange={handleSetColorScheme}
              trackColor={{ false: Colors.border.light, true: Colors.primary[colorScheme] }}
              thumbColor={isDark ? Colors.background.light : Colors.background.dark}
            />
          }
        />
        {/* Aquí se pueden agregar más SettingsItem para futuras configuraciones */}
      </SettingsSection>
      
      <SettingsSection title="Información">
        {/* <SettingsItem icon="info.circle.fill" title="Acerca de FinanzasApp" onPress={() => router.push('/profile/about')} /> */}
        {/* <SettingsItem icon="shield.lefthalf.filled" title="Política de Privacidad" onPress={() => router.push('/profile/privacy')} /> */}
        {/* <SettingsItem icon="doc.text.fill" title="Términos de Servicio" onPress={() => router.push('/profile/terms')} /> */}
        <SettingsItem icon="info.circle.fill" title="Acerca de FinanzasApp" onPress={() => console.log('Navegar a Acerca de')}/>
        <SettingsItem icon="shield.lefthalf.filled" title="Política de Privacidad" onPress={() => console.log('Navegar a Política de Privacidad')}/>
        <SettingsItem icon="doc.text.fill" title="Términos de Servicio" onPress={() => console.log('Navegar a Términos de Servicio')}/>
      </SettingsSection>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.md,
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
  userContainer: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: Spacing.md,
    backgroundColor: Colors.border.light, // Color de fondo mientras carga la imagen
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: Spacing.xs,
  },
  userEmail: {
    fontSize: 16,
    color: Colors.text.secondaryLight, // Ajustar según el tema si es necesario
  },
  authActions: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  button: {
    backgroundColor: Colors.primary.light, // Ajustar según el tema
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    marginVertical: Spacing.xs,
    width: '80%',
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: Colors.background.light, // Ajustar según el tema
    borderColor: Colors.primary.light, // Ajustar según el tema
    borderWidth: 1,
  },
  buttonText: {
    color: Colors.background.light, // Ajustar según el tema
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: Colors.primary.light, // Ajustar según el tema
  },
});