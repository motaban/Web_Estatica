Este repositorio contiene la página de máquinas profesionales para barberos de Wahl Professional, implementada con HTML, CSS y JavaScript puro.

🚀 Características principales
Catálogo de productos: Muestra todas las máquinas profesionales disponibles

Sistema de filtrado: Permite buscar por nombre, descripción o características técnicas

Comparador de productos: Selecciona hasta 3 máquinas para compararlas en una tabla detallada


🛠️ Estructura del código
HTML (machines.html)
Cabecera: Barra de navegación con logo y menú

Hero section: Imagen destacada con título

Filtros: Búsqueda y selección por categoría

Grid de productos: Muestra tarjetas con imágenes e información

Modal de comparación: Tabla con especificaciones técnicas

Pie de página: Información de contacto y enlaces

CSS (styles.css + estilos internos)
Diseño flexible: Grid y Flexbox para el layout

Efectos visuales: Transiciones y hover states

Categorías diferenciadas: Colores por tipo de máquina

Responsive design: Media queries para móviles

JavaScript
Carga de productos: Desde JSON o localStorage

Filtrado dinámico: Búsqueda en tiempo real

Sistema de comparación: Selección y visualización

Gestión de estado: Productos seleccionados

🔍 Funcionamiento detallado
Carga inicial:

Intenta cargar productos desde localStorage (más rápido)

Si no hay datos, carga desde products.json

Muestra spinner durante la carga

Filtrado:

El usuario puede:

Buscar por texto (nombre, descripción o specs)

Filtrar por categoría (inalámbricas, con cable, etc.)

Los resultados se actualizan instantáneamente

Comparación:

Selecciona hasta 3 productos con el botón "Comparar"

Al tener 2+ seleccionados, habilita el botón de comparación

Muestra modal con tabla comparativa de especificaciones

Experiencia de usuario:

Loading states durante carga

Mensajes de error si falla la carga

Efectos visuales al interactuar

![image](https://github.com/user-attachments/assets/1e52201c-64f3-45f4-a9ef-9e918080fc21)
