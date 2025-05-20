# Estructura de Carpetas para FinanzasApp 📁

A continuación se presenta la estructura de carpetas propuesta para implementar el MVP de FinanzasApp, organizada para facilitar el desarrollo y mantenimiento del código.

## Estructura Base

```
finanzasApp/
├── app/                      # Directorio principal de la aplicación (Expo Router)
│   ├── (auth)/               # Rutas relacionadas con autenticación
│   │   ├── login.tsx         # Pantalla de inicio de sesión
│   │   ├── register.tsx      # Pantalla de registro
│   │   └── _layout.tsx       # Layout para rutas de autenticación
│   ├── (tabs)/               # Navegación principal por pestañas
│   │   ├── dashboard.tsx     # Pantalla principal/resumen
│   │   ├── transactions.tsx  # Lista de transacciones
│   │   ├── add.tsx           # Añadir nueva transacción
│   │   ├── budget.tsx        # Gestión de presupuestos
│   │   ├── profile.tsx       # Perfil y configuración
│   │   └── _layout.tsx       # Layout para pestañas
│   ├── transaction/          # Rutas para detalles de transacciones
│   │   ├── [id].tsx          # Detalle de transacción específica
│   │   └── edit.tsx          # Editar transacción
│   ├── budget/               # Rutas para presupuestos
│   │   ├── [category].tsx    # Detalle de presupuesto por categoría
│   │   └── create.tsx        # Crear nuevo presupuesto
│   ├── goals/                # Rutas para metas de ahorro
│   │   ├── [id].tsx          # Detalle de meta específica
│   │   └── create.tsx        # Crear nueva meta
│   ├── reports/              # Rutas para informes y análisis
│   │   ├── monthly.tsx       # Informe mensual
│   │   ├── category.tsx      # Análisis por categoría
│   │   └── trends.tsx        # Tendencias y proyecciones
│   ├── _layout.tsx           # Layout principal de la aplicación
│   └── index.tsx             # Punto de entrada (redirección)
├── assets/                   # Recursos estáticos
│   ├── fonts/                # Tipografías personalizadas
│   ├── images/               # Imágenes e iconos
│   └── animations/           # Archivos de animación (Lottie)
├── components/               # Componentes reutilizables
│   ├── ui/                   # Componentes de interfaz básicos
│   │   ├── Button.tsx        # Botones personalizados
│   │   ├── Card.tsx          # Tarjetas para mostrar información
│   │   ├── Input.tsx         # Campos de entrada personalizados
│   │   └── Modal.tsx         # Ventanas modales
│   ├── forms/                # Componentes de formularios
│   │   ├── TransactionForm.tsx  # Formulario de transacción
│   │   ├── BudgetForm.tsx    # Formulario de presupuesto
│   │   └── GoalForm.tsx      # Formulario de metas
│   ├── charts/               # Componentes de visualización
│   │   ├── PieChart.tsx      # Gráfico circular
│   │   ├── BarChart.tsx      # Gráfico de barras
│   │   ├── LineChart.tsx     # Gráfico de líneas
│   │   └── ProgressBar.tsx   # Barras de progreso
│   ├── gamification/         # Componentes de gamificación
│   │   ├── Achievement.tsx   # Componente de logros
│   │   ├── LevelIndicator.tsx # Indicador de nivel
│   │   └── Challenge.tsx     # Componente de desafíos
│   └── layout/               # Componentes de estructura
│       ├── Header.tsx        # Encabezado de pantalla
│       ├── TabBar.tsx        # Barra de navegación personalizada
│       └── Container.tsx     # Contenedor con estilos comunes
├── constants/                # Constantes y configuración
│   ├── Colors.ts             # Paleta de colores
│   ├── Categories.ts         # Categorías de transacciones
│   ├── Icons.ts              # Mapeo de iconos
│   └── Config.ts             # Configuración general
├── hooks/                    # Hooks personalizados
│   ├── useTransactions.ts    # Gestión de transacciones
│   ├── useBudgets.ts         # Gestión de presupuestos
│   ├── useGoals.ts           # Gestión de metas
│   └── useStats.ts           # Cálculos estadísticos
├── context/                  # Contextos de React
│   ├── AppContext.tsx        # Contexto global de la aplicación
│   ├── ThemeContext.tsx      # Gestión de temas (claro/oscuro)
│   └── AuthContext.tsx       # Gestión de autenticación
├── services/                 # Servicios y lógica de negocio
│   ├── storage/              # Almacenamiento local
│   │   ├── transactions.ts   # Operaciones CRUD para transacciones
│   │   ├── budgets.ts        # Operaciones CRUD para presupuestos
│   │   └── goals.ts          # Operaciones CRUD para metas
│   ├── ai/                   # Servicios de inteligencia artificial
│   │   ├── recommendations.ts # Recomendaciones personalizadas
│   │   └── predictions.ts    # Predicciones financieras
│   └── utils/                # Utilidades
│       ├── formatters.ts     # Formateo de fechas, monedas, etc.
│       ├── validators.ts     # Validación de datos
│       └── calculations.ts   # Cálculos financieros
├── types/                    # Definiciones de tipos TypeScript
│   ├── Transaction.ts        # Tipos para transacciones
│   ├── Budget.ts             # Tipos para presupuestos
│   ├── Goal.ts               # Tipos para metas
│   └── User.ts               # Tipos para usuarios
└── docs/                     # Documentación
    ├── MVP_PLAN.md           # Plan del MVP
    └── ESTRUCTURA_PROYECTO.md # Este documento
```

## Explicación de la Estructura

### Organización por Características

La estructura sigue un enfoque híbrido entre organización por tipo y por característica:

- **Rutas (app/)**: Organizadas por funcionalidad principal usando Expo Router
- **Componentes (components/)**: Organizados primero por tipo y luego por funcionalidad
- **Servicios (services/)**: Separados por dominio de negocio

### Principios de Diseño

1. **Modularidad**: Cada componente, hook o servicio tiene una responsabilidad única
2. **Escalabilidad**: La estructura permite añadir nuevas características sin modificar las existentes
3. **Reutilización**: Los componentes comunes están separados para facilitar su uso en múltiples pantallas
4. **Mantenibilidad**: La organización facilita encontrar y modificar código relacionado

### Consideraciones para el Desarrollo

- Comenzar implementando los servicios de almacenamiento local para transacciones
- Desarrollar los componentes UI básicos antes de las pantallas completas
- Implementar primero las funcionalidades esenciales (registro de transacciones, dashboard)
- Añadir elementos de gamificación e IA en fases posteriores

## Próximos Pasos

1. Configurar la navegación básica con Expo Router
2. Implementar el sistema de almacenamiento local
3. Desarrollar los componentes UI fundamentales
4. Crear las pantallas principales (dashboard, transacciones)
5. Implementar la lógica de presupuestos y categorización

---

Esta estructura proporciona un punto de partida sólido para el desarrollo del MVP, manteniendo la flexibilidad necesaria para incorporar nuevas características en el futuro. La organización facilita el trabajo en equipo y la escalabilidad del proyecto a medida que evolucione.