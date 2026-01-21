# pruebaIoon: Sistema de Gestión de Productos con Importación Masiva

## 📝 Descripción del Proyecto

**pruebaIoon** es un sistema de gestión de productos (PMS) moderno y robusto, diseñado para manejar el catálogo de productos de manera eficiente, con un enfoque particular en la **importación masiva de datos** y el soporte para **detalles de productos multilingües**.

El proyecto está construido sobre una pila tecnológica moderna que combina la potencia de Laravel para el backend y la API, con la reactividad y la experiencia de usuario de React y TypeScript en el frontend, unidos por Inertia.js.

## ✨ Características Principales

*   **Gestión de Productos y Categorías:** Interfaz completa para la administración de productos y sus categorías asociadas.
*   **Importación Masiva de Productos:** Funcionalidad clave para cargar grandes volúmenes de datos de productos a través de un archivo TSV (valores separados por tabulaciones).
*   **Soporte Multilingüe:** Los detalles del producto (nombre y descripción) están separados para permitir la gestión de múltiples idiomas (inicialmente configurado para español).
*   **Autenticación Completa:** Sistema de autenticación robusto proporcionado por Laravel Fortify, incluyendo registro, inicio de sesión, restablecimiento de contraseña y autenticación de dos factores (2FA).
*   **Tecnología Moderna:** Uso de React 19 y TypeScript para un frontend escalable y mantenible.

## 🛠️ Tecnologías Utilizadas

Este proyecto utiliza una variante moderna del stack TALL (Tailwind, Alpine, Laravel, Livewire), sustituyendo Alpine y Livewire por React y TypeScript a través de Inertia.js.

| Componente | Tecnología | Versión Base |
| :--- | :--- | :--- |
| **Backend** | Laravel | ^12.0 |
| **Frontend** | React + TypeScript | ^19.2.0 |
| **Adaptador** | Inertia.js | ^2.0 |
| **Autenticación** | Laravel Fortify | ^1.30 |
| **Estilos** | Tailwind CSS | ^4.0.0 |
| **Base de Datos** | Migraciones de Laravel | N/A |

## 🚀 Instalación y Configuración

Sigue estos pasos para poner en marcha el proyecto en tu entorno local.

### Requisitos Previos

Asegúrate de tener instalado lo siguiente:

*   PHP (versión 8.2 o superior)
*   Composer
*   Node.js (versión 20 o superior)
*   npm o Yarn
*   Un servidor de base de datos (MySQL, PostgreSQL, SQLite, etc.)

### Pasos de Instalación

1.  **Clonar el Repositorio:**
    ```bash
    git clone https://github.com/CamachoMoises/pruebaIoon.git
    cd pruebaIoon
    ```

2.  **Configuración del Entorno:**
    Crea tu archivo de configuración de entorno copiando el ejemplo:
    ```bash
    cp .env.example .env
    ```
    Asegúrate de configurar las credenciales de tu base de datos en el archivo `.env`.

3.  **Ejecutar el Script de Configuración:**
    El proyecto incluye un script de `setup` en `composer.json` que automatiza la instalación de dependencias, la generación de la clave de aplicación y la migración de la base de datos.

    ```bash
    composer run setup
    ```
    Este comando realiza las siguientes acciones:
    *   Instala las dependencias de PHP (`composer install`).
    *   Genera la clave de aplicación (`php artisan key:generate`).
    *   Ejecuta las migraciones de la base de datos (`php artisan migrate --force`).
    *   Instala las dependencias de JavaScript (`npm install`).
    *   Compila los assets de frontend (`npm run build`).

### Ejecución del Proyecto

Para iniciar el servidor de desarrollo de Laravel y el servidor de Vite para el frontend, utiliza el script `dev`:

```bash
composer run dev
```

Este comando iniciará:
*   El servidor de Laravel (`php artisan serve`).
*   El *listener* de colas (si aplica).
*   El servidor de desarrollo de Vite para la recarga en caliente del frontend.

El proyecto estará accesible típicamente en `http://127.0.0.1:8000`.

## 📦 Funcionalidad de Importación de Productos

La característica central de este proyecto es la importación de productos a través de un archivo TSV.

### Formato del Archivo TSV

El archivo debe ser un archivo de texto plano donde los valores estén separados por tabulaciones (`\t`). El sistema utiliza un formato jerárquico para las categorías:

| Columna | Descripción | Ejemplo |
| :--- | :--- | :--- |
| `categoria` | Nombre de la categoría. Si la fila solo tiene este valor, crea la categoría. | `Electrónica` |
| `nombre` | Nombre del producto. | `Smartphone XYZ` |
| `descripcion` | Descripción detallada del producto. | `Teléfono inteligente con cámara de 48MP` |
| `precio` | Precio del producto (numérico). | `299.99` |
| `stock` | Cantidad en inventario (entero). | `50` |
| `fecha_ultima_venta` | Fecha de la última venta (opcional, formato `YYYY-MM-DD`). | `2026-01-15` |

### Ejemplo de Estructura del Archivo

```tsv
categoria	nombre	descripcion	precio	stock	fecha_ultima_venta
Electrónica				
Electrónica	Smartphone XYZ	Teléfono inteligente con cámara de 48MP	299.99	50	2026-01-15
Electrónica	Tablet ABC	Tablet de 10 pulgadas con stylus	199.99	30	2026-01-10
Ropa				
Ropa	Camiseta Deportiva	Camiseta de alto rendimiento	49.99	100	2026-01-18
```

El sistema procesa el archivo de la siguiente manera:
1.  Una fila con solo el valor en la columna `categoria` define la categoría actual para los productos siguientes.
2.  Las filas que contienen un valor en la columna `nombre` se importan como productos, asignándoles la última categoría definida.

## 🤝 Contribución

Las contribuciones son bienvenidas. Si deseas mejorar el proyecto, por favor sigue estos pasos:

1.  Haz un *fork* del repositorio.
2.  Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3.  Realiza tus cambios y haz *commit* (`git commit -am 'feat: Añadir nueva funcionalidad X'`).
4.  Sube la rama (`git push origin feature/nueva-funcionalidad`).
5.  Abre un *Pull Request*.

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.
