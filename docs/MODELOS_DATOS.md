# Modelos de Datos para FinanzasApp 📊

## Introducción

Este documento define los modelos de datos principales que se utilizarán en FinanzasApp. Estos modelos representan las entidades fundamentales que la aplicación necesita gestionar para proporcionar todas las funcionalidades descritas en el MVP.

## Modelos Principales

### 1. Usuario (User)

```typescript
interface User {
  id: string;                // Identificador único
  name: string;              // Nombre completo
  email: string;             // Correo electrónico (usado para autenticación)
  avatar?: string;           // URL o ruta a la imagen de perfil (opcional)
  createdAt: Date;           // Fecha de creación de la cuenta
  preferences: {
    currency: string;        // Moneda predeterminada (ej. "MXN", "USD")
    theme: "light" | "dark" | "system"; // Preferencia de tema
    notifications: boolean;  // Preferencia de notificaciones
    weekStartDay: 0-6;       // Día de inicio de semana (0: domingo, 1: lunes, etc.)
  };
  gamification: {
    level: number;           // Nivel actual del usuario
    experience: number;      // Puntos de experiencia acumulados
    achievements: string[];  // IDs de logros desbloqueados
    streakDays: number;      // Días consecutivos usando la app
    lastActiveDate: Date;    // Última fecha de actividad
  };
}
```

### 2. Transacción (Transaction)

```typescript
interface Transaction {
  id: string;                // Identificador único
  userId: string;            // ID del usuario propietario
  type: "income" | "expense" | "transfer"; // Tipo de transacción
  amount: number;            // Monto (positivo para ingresos, negativo para gastos)
  currency: string;          // Moneda (ej. "MXN", "USD")
  category: string;          // ID de la categoría
  subcategory?: string;      // ID de la subcategoría (opcional)
  description: string;       // Descripción breve
  notes?: string;            // Notas adicionales (opcional)
  date: Date;                // Fecha de la transacción
  createdAt: Date;           // Fecha de creación del registro
  updatedAt: Date;           // Fecha de última modificación
  isRecurring: boolean;      // Indica si es una transacción recurrente
  recurringDetails?: {
    frequency: "daily" | "weekly" | "monthly" | "yearly"; // Frecuencia
    interval: number;        // Intervalo (cada cuántos días/semanas/meses/años)
    endDate?: Date;          // Fecha de finalización (opcional)
  };
  attachments?: string[];    // URLs o rutas a imágenes/documentos adjuntos
  location?: {
    latitude: number;        // Latitud
    longitude: number;       // Longitud
    name?: string;           // Nombre del lugar (opcional)
  };
  tags?: string[];           // Etiquetas personalizadas
}
```

### 3. Categoría (Category)

```typescript
interface Category {
  id: string;                // Identificador único
  userId?: string;           // ID del usuario (null para categorías predeterminadas)
  name: string;              // Nombre de la categoría
  icon: string;              // Nombre o ID del icono
  color: string;             // Color en formato hexadecimal
  type: "income" | "expense" | "both"; // Tipo de transacciones aplicables
  isDefault: boolean;        // Indica si es una categoría predeterminada del sistema
  parentId?: string;         // ID de la categoría padre (para subcategorías)
  order: number;             // Orden de visualización
}
```

### 4. Presupuesto (Budget)

```typescript
interface Budget {
  id: string;                // Identificador único
  userId: string;            // ID del usuario propietario
  name: string;              // Nombre del presupuesto
  amount: number;            // Monto límite
  currency: string;          // Moneda
  period: "daily" | "weekly" | "monthly" | "yearly"; // Período del presupuesto
  startDate: Date;           // Fecha de inicio
  endDate?: Date;            // Fecha de finalización (opcional para presupuestos recurrentes)
  categories: string[];      // IDs de categorías incluidas
  excludedCategories?: string[]; // IDs de categorías excluidas
  isRecurring: boolean;      // Indica si el presupuesto se renueva automáticamente
  notifications: {
    enabled: boolean;        // Habilitar notificaciones
    thresholds: number[];    // Porcentajes para notificar (ej. [50, 75, 90, 100])
  };
  notes?: string;            // Notas adicionales
  createdAt: Date;           // Fecha de creación
  updatedAt: Date;           // Fecha de última modificación
}
```

### 5. Meta de Ahorro (Goal)

```typescript
interface Goal {
  id: string;                // Identificador único
  userId: string;            // ID del usuario propietario
  name: string;              // Nombre de la meta
  description?: string;      // Descripción detallada (opcional)
  targetAmount: number;      // Monto objetivo
  currentAmount: number;     // Monto actual ahorrado
  currency: string;          // Moneda
  startDate: Date;           // Fecha de inicio
  targetDate?: Date;         // Fecha objetivo (opcional)
  isCompleted: boolean;      // Indica si la meta ha sido alcanzada
  completedDate?: Date;      // Fecha de completado (opcional)
  category?: string;         // Categoría relacionada (opcional)
  icon?: string;             // Icono personalizado (opcional)
  color: string;             // Color en formato hexadecimal
  isShared: boolean;         // Indica si es una meta compartida
  sharedWith?: string[];     // IDs de usuarios con quienes se comparte
  contributions: {
    date: Date;              // Fecha de la contribución
    amount: number;          // Monto
    userId?: string;         // ID del usuario que contribuyó (para metas compartidas)
    transactionId?: string;  // ID de la transacción relacionada (opcional)
  }[];
  reminderFrequency?: "daily" | "weekly" | "monthly"; // Frecuencia de recordatorios
  notes?: string;            // Notas adicionales
  createdAt: Date;           // Fecha de creación
  updatedAt: Date;           // Fecha de última modificación
}
```

### 6. Desafío (Challenge)

```typescript
interface Challenge {
  id: string;                // Identificador único
  title: string;             // Título del desafío
  description: string;       // Descripción detallada
  type: "saving" | "spending" | "tracking" | "habit"; // Tipo de desafío
  difficulty: "easy" | "medium" | "hard"; // Nivel de dificultad
  duration: number;          // Duración en días
  rewardPoints: number;      // Puntos de experiencia al completar
  isDefault: boolean;        // Indica si es un desafío predeterminado
  conditions: {
    type: string;            // Tipo de condición
    target: any;             // Valor objetivo
    operator: string;        // Operador de comparación
  }[];
  icon: string;              // Icono representativo
  color: string;             // Color en formato hexadecimal
}
```

### 7. Desafío de Usuario (UserChallenge)

```typescript
interface UserChallenge {
  id: string;                // Identificador único
  userId: string;            // ID del usuario
  challengeId: string;       // ID del desafío
  startDate: Date;           // Fecha de inicio
  endDate: Date;             // Fecha de finalización
  progress: number;          // Progreso actual (0-100)
  status: "active" | "completed" | "failed" | "abandoned"; // Estado
  completedDate?: Date;      // Fecha de completado (opcional)
  transactions?: string[];   // IDs de transacciones relacionadas
}
```

### 8. Logro (Achievement)

```typescript
interface Achievement {
  id: string;                // Identificador único
  name: string;              // Nombre del logro
  description: string;       // Descripción
  icon: string;              // Icono representativo
  category: string;          // Categoría del logro
  conditions: any;           // Condiciones para desbloquear
  rewardPoints: number;      // Puntos de experiencia al desbloquear
  isSecret: boolean;         // Indica si es un logro secreto
  tier?: number;             // Nivel del logro (para logros con niveles)
}
```

### 9. Recomendación (Recommendation)

```typescript
interface Recommendation {
  id: string;                // Identificador único
  userId: string;            // ID del usuario
  type: string;              // Tipo de recomendación
  title: string;             // Título
  description: string;       // Descripción detallada
  createdAt: Date;           // Fecha de creación
  expiresAt?: Date;          // Fecha de expiración (opcional)
  priority: "low" | "medium" | "high"; // Prioridad
  status: "new" | "viewed" | "applied" | "dismissed"; // Estado
  relatedData?: any;         // Datos relacionados
  actionUrl?: string;        // URL o ruta para acción (opcional)
}
```

## Relaciones entre Modelos

- **Usuario** tiene muchas **Transacciones**
- **Usuario** tiene muchas **Categorías** personalizadas
- **Usuario** tiene muchos **Presupuestos**
- **Usuario** tiene muchas **Metas**
- **Usuario** participa en muchos **Desafíos** (a través de **UserChallenge**)
- **Usuario** desbloquea muchos **Logros**
- **Usuario** recibe muchas **Recomendaciones**
- **Transacción** pertenece a una **Categoría**
- **Presupuesto** incluye muchas **Categorías**
- **Meta** puede tener muchas **Contribuciones** (que pueden estar vinculadas a **Transacciones**)

## Consideraciones de Almacenamiento

Para el MVP, estos modelos se almacenarán localmente utilizando:

1. **AsyncStorage**: Para datos simples y configuraciones
2. **SQLite** (a través de expo-sqlite): Para el almacenamiento estructurado de transacciones, presupuestos, etc.

En versiones futuras, estos modelos podrían sincronizarse con un backend para permitir:
- Respaldo en la nube
- Sincronización entre dispositivos
- Funcionalidades sociales y compartidas

## Evolución de los Modelos

Estos modelos están diseñados para cubrir las necesidades del MVP, pero se espera que evolucionen con el tiempo para incorporar:

- Cuentas y métodos de pago múltiples
- Integración con servicios bancarios
- Funcionalidades avanzadas de planificación financiera
- Análisis predictivo más sofisticado

---

Los modelos definidos proporcionan una base sólida para implementar todas las funcionalidades descritas en el plan del MVP, manteniendo la flexibilidad necesaria para futuras expansiones y mejoras de la aplicación.