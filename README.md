# Dispensario Mascotas

Tienda en línea pequeña y estática enfocada en **alimento para mascotas** (gatos y perros), construida con [Astro](https://astro.build) y TypeScript.

> **Estado:** tienda funcional con catálogo, carrito y cierre de compra por WhatsApp. Los productos son de ejemplo y deben reemplazarse con datos reales.

## Objetivos

- Catálogo de alimento para **perros** y **gatos** (alcance inicial: sólo alimento).
- Sitio **estático** (HTML generado en build, sin backend), con pocas imágenes de producto.
- Diseño profesional, moderno y con identidad visual propia.
- Código tipado en TypeScript estricto y siguiendo las buenas prácticas de Astro.

## Stack tecnológico

| Área            | Tecnología                                  |
| :-------------- | :------------------------------------------ |
| Framework       | Astro 7 (`astro@^7.4.12`)                   |
| Lenguaje        | TypeScript (configuración `astro/tsconfigs/strict`) |
| Imágenes        | `sharp` (optimización de imágenes en build) |
| Entorno         | Node.js `>=22.23.4`                         |

## Funcionalidades

- **Inicio** (`/`): hero, categorías (perros y gatos) y productos destacados.
- **Catálogo por especie** (`/perros`, `/gatos`).
- **Detalle de producto** (`/producto/<slug>`) con beneficios y productos relacionados.
- **Carrito** (`/carrito`): se guarda en `localStorage`, permite cambiar cantidades y eliminar productos.
- **Cierre de compra por WhatsApp**: el botón del carrito abre `wa.me` con el resumen del pedido. No hay backend ni pagos en línea.

## Estructura del proyecto

```text
/
├── public/
│   └── images/            # Imágenes de producto (placeholder SVG por ahora)
├── src/
│   ├── components/        # Header, Footer, ProductCard
│   ├── data/
│   │   ├── products.ts    # Catálogo, tipos Product y Species (fuente única de datos)
│   │   └── site.ts        # Nombre, moneda, locale y número de WhatsApp
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── lib/
│   │   ├── cart.ts        # Lógica pura del carrito y URL de WhatsApp
│   │   └── format.ts      # Formato de precios
│   ├── pages/
│   │   ├── index.astro
│   │   ├── [species].astro        # /perros y /gatos
│   │   ├── carrito.astro
│   │   ├── 404.astro
│   │   └── producto/[slug].astro
│   ├── scripts/
│   │   └── cart.ts        # Interacción del carrito en el navegador
│   └── styles/
│       └── global.css     # Tokens de diseño y estilos base
├── AGENTS.md
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Configuración antes de publicar

- **Número de WhatsApp:** cambia `whatsappNumber` en [src/data/site.ts](src/data/site.ts). Debe incluir el código de país sin `+` ni espacios (por ejemplo `573001234567`).
- **Productos:** edita el arreglo `products` en [src/data/products.ts](src/data/products.ts). Cada producto necesita un `slug` único, que define la URL.
- **Imágenes:** reemplaza `public/images/product-placeholder.svg` por fotos reales y actualiza `image` en cada producto.
- **Moneda:** `currency` y `locale` están en `src/data/site.ts` (actualmente `COP` y `es-CO`).

## Requisitos

- [Node.js](https://nodejs.org/) 22.23.4 o superior.
- npm (incluido con Node.js).

## Instalación y comandos

Ejecuta los comandos desde la raíz del proyecto:

| Comando                   | Acción                                              |
| :------------------------ | :-------------------------------------------------- |
| `npm install`             | Instala las dependencias                            |
| `npm run dev`             | Inicia el servidor de desarrollo en `localhost:4321` |
| `npm run build`           | Genera el sitio de producción en `./dist/`          |
| `npm run preview`         | Previsualiza el build de producción localmente      |
| `npm run astro -- check`  | Valida tipos y archivos `.astro` (requiere `@astrojs/check`) |
| `npm run astro -- --help` | Muestra la ayuda de la CLI de Astro                 |

## Documentación de referencia

- [Documentación de Astro](https://docs.astro.build)
- [Rutas y páginas](https://docs.astro.build/en/guides/routing/)
- [Componentes de Astro](https://docs.astro.build/en/basics/astro-components/)
- [Estilos](https://docs.astro.build/en/guides/styling/)
- [Colecciones de contenido](https://docs.astro.build/en/guides/content-collections/)
