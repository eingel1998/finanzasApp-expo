# Diseño de UI/UX para FinanzasApp 🎨

## Visión General del Diseño

El diseño de FinanzasApp se enfoca en crear una experiencia visual atractiva, intuitiva y motivadora que haga que la gestión financiera sea accesible y hasta divertida para los usuarios. Seguiremos principios de diseño centrado en el usuario, con especial atención a la claridad visual, la accesibilidad y la retroalimentación positiva.

## Paleta de Colores

### Colores Principales

- **Principal**: `#6200EE` - Púrpura intenso que transmite confianza y creatividad
- **Secundario**: `#03DAC6` - Verde azulado vibrante para acentos y elementos interactivos
- **Fondo (Modo Claro)**: `#F8F9FA` - Gris muy claro, casi blanco, para una lectura cómoda
- **Fondo (Modo Oscuro)**: `#121212` - Negro suave para reducir la fatiga visual

### Colores Funcionales

- **Ingresos**: `#4CAF50` - Verde que representa crecimiento y prosperidad
- **Gastos**: `#F44336` - Rojo que indica precaución sin ser alarmante
- **Ahorros**: `#2196F3` - Azul que transmite seguridad y confianza
- **Metas**: `#FF9800` - Naranja que sugiere entusiasmo y motivación

### Colores de Categorías

Cada categoría de gastos tendrá un color distintivo pero armonioso dentro de la paleta general:

- Alimentación: `#8BC34A` (Verde claro)
- Transporte: `#00BCD4` (Cian)
- Vivienda: `#9C27B0` (Púrpura)
- Entretenimiento: `#FF5722` (Naranja rojizo)
- Salud: `#E91E63` (Rosa)
- Educación: `#3F51B5` (Índigo)
- Etc.

## Tipografía

- **Familia principal**: Roboto - Clara, moderna y altamente legible
- **Títulos**: Roboto Medium - Para jerarquía visual clara
- **Cuerpo de texto**: Roboto Regular - Para lectura cómoda
- **Datos numéricos**: Roboto Mono - Para alineación consistente de cifras

### Tamaños de Fuente

- Títulos principales: 24sp
- Subtítulos: 18sp
- Texto normal: 16sp
- Texto secundario: 14sp
- Etiquetas pequeñas: 12sp

## Componentes de UI

### 1. Tarjetas (Cards)

Las tarjetas serán un elemento fundamental para mostrar información agrupada:

- **Tarjeta de Resumen**: Muestra el balance actual, ingresos y gastos del período
- **Tarjeta de Transacción**: Muestra detalles de una transacción individual
- **Tarjeta de Presupuesto**: Visualiza el progreso de un presupuesto específico
- **Tarjeta de Meta**: Muestra el progreso hacia una meta de ahorro

Características de diseño:
- Esquinas redondeadas (8dp)
- Sombra sutil para elevación visual
- Padding interno consistente (16dp)
- Iconos representativos para categorías

### 2. Botones

- **Botón Primario**: Relleno de color principal, texto blanco
- **Botón Secundario**: Contorno de color principal, texto de color principal
- **Botón de Acción Flotante (FAB)**: Para acciones principales como añadir transacción
- **Botones de Iconos**: Para acciones contextuales en tarjetas y listas

### 3. Gráficos y Visualizaciones

- **Gráfico Circular**: Para distribución de gastos por categoría
- **Gráfico de Barras**: Para comparar gastos entre períodos
- **Gráfico de Líneas**: Para mostrar tendencias a lo largo del tiempo
- **Barras de Progreso**: Para visualizar avance en presupuestos y metas

Características de diseño:
- Colores distintivos pero armoniosos
- Leyendas claras y legibles
- Animaciones suaves al cargar o actualizar
- Interactividad táctil (tocar para ver detalles)

### 4. Navegación

- **Barra de Pestañas**: Navegación principal entre secciones clave
- **Menú Lateral**: Para acceso a configuraciones y funciones secundarias
- **Barra Superior**: Con título de sección y acciones contextuales
- **Navegación por Gestos**: Deslizar para acciones comunes (eliminar, editar)

### 5. Elementos de Gamificación

- **Insignias de Logros**: Diseños visuales atractivos para logros desbloqueados
- **Indicador de Nivel**: Visualización del nivel actual y progreso hacia el siguiente
- **Tarjetas de Desafíos**: Presentación visual de desafíos activos y completados
- **Animaciones de Celebración**: Para momentos de éxito (completar meta, mantener presupuesto)

## Pantallas Principales

### 1. Dashboard (Pantalla Principal)

![Dashboard Mockup](../assets/images/mockups/dashboard.png)

**Elementos clave:**
- Resumen financiero en la parte superior
- Gráfico circular de distribución de gastos
- Lista de transacciones recientes
- Progreso de presupuestos activos
- Acceso rápido a funciones principales

### 2. Registro de Transacción

![Add Transaction Mockup](../assets/images/mockups/add_transaction.png)

**Elementos clave:**
- Selector de tipo (ingreso/gasto/transferencia)
- Campo de monto con teclado numérico
- Selector de categoría con iconos
- Campo de descripción
- Opciones para añadir detalles adicionales (fecha, recurrencia, etc.)

### 3. Lista de Transacciones

![Transactions Mockup](../assets/images/mockups/transactions.png)

**Elementos clave:**
- Filtros en la parte superior
- Agrupación por fecha
- Tarjetas de transacción con información esencial
- Gestos para acciones rápidas
- Búsqueda y ordenación

### 4. Gestión de Presupuestos

![Budgets Mockup](../assets/images/mockups/budgets.png)

**Elementos clave:**
- Resumen de todos los presupuestos
- Barras de progreso visuales
- Indicadores de estado (normal, advertencia, excedido)
- Botón para crear nuevo presupuesto

### 5. Metas de Ahorro

![Goals Mockup](../assets/images/mockups/goals.png)

**Elementos clave:**
- Tarjetas visuales para cada meta
- Progreso visual con porcentaje
- Tiempo restante o proyección
- Botón para añadir contribución

## Flujos de Usuario

### 1. Onboarding

1. **Pantalla de Bienvenida**: Introducción a la app con ilustraciones atractivas
2. **Configuración Básica**: Selección de moneda y preferencias iniciales
3. **Añadir Saldo Inicial**: Configuración opcional de saldos iniciales
4. **Tutorial Interactivo**: Guía rápida de las funciones principales

### 2. Registro de Transacción

1. Pulsar FAB en dashboard
2. Seleccionar tipo de transacción
3. Ingresar monto
4. Seleccionar categoría
5. Añadir descripción
6. (Opcional) Añadir detalles adicionales
7. Guardar transacción
8. Ver confirmación animada

### 3. Creación de Presupuesto

1. Acceder a sección de presupuestos
2. Pulsar "Crear presupuesto"
3. Seleccionar categorías a incluir
4. Establecer monto límite
5. Definir período (mensual, semanal, etc.)
6. Configurar notificaciones
7. Guardar presupuesto

## Principios de Interacción

### 1. Feedback Inmediato

- Animaciones sutiles para confirmar acciones
- Vibraciones táctiles para momentos clave
- Mensajes de confirmación claros pero no intrusivos
- Indicadores visuales de éxito/error

### 2. Accesibilidad

- Alto contraste entre texto y fondo
- Tamaños de texto ajustables
- Compatibilidad con lectores de pantalla
- Alternativas textuales para información visual
- Navegación posible sin depender del color

### 3. Consistencia

- Patrones de interacción coherentes en toda la app
- Ubicación consistente de elementos comunes
- Terminología uniforme
- Comportamiento predecible de componentes similares

### 4. Eficiencia

- Acceso rápido a funciones frecuentes
- Atajos y gestos para usuarios avanzados
- Autocompletado basado en patrones anteriores
- Sugerencias contextuales inteligentes

## Animaciones y Microinteracciones

### 1. Transiciones entre Pantallas

- Transiciones fluidas que indican jerarquía y relación
- Animaciones de entrada/salida para elementos clave

### 2. Feedback de Estado

- Animación de "confeti" al completar una meta
- Ondas de pulso al añadir una transacción
- Cambios graduales de color en barras de progreso

### 3. Elementos de Gamificación

- Animación de "subida de nivel"
- Revelación progresiva de insignias
- Efectos visuales para celebrar logros

## Adaptabilidad

### 1. Modo Oscuro/Claro

- Transición suave entre modos
- Paletas optimizadas para cada modo
- Respeto a la configuración del sistema

### 2. Tamaños de Pantalla

- Diseño adaptable a diferentes dispositivos
- Reorganización de elementos según el espacio disponible
- Experiencia optimizada tanto para teléfonos como para tablets

### 3. Orientación

- Soporte para orientación vertical (principal)
- Adaptación a orientación horizontal para visualizaciones específicas (gráficos detallados)

## Próximos Pasos

1. Crear prototipos interactivos de las pantallas principales
2. Realizar pruebas de usabilidad con usuarios potenciales
3. Refinar el diseño basado en feedback
4. Desarrollar un sistema de componentes reutilizables
5. Implementar el diseño en código con React Native y Expo

---

Este documento establece las bases del diseño visual y la experiencia de usuario para FinanzasApp, proporcionando una guía clara para la implementación. El enfoque en una interfaz atractiva, intuitiva y motivadora ayudará a diferenciar la aplicación en el mercado y fomentará el uso consistente por parte de los usuarios.