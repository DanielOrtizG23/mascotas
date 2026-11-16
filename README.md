# Dispensario Mascotas

Tienda en línea pequeña y estática enfocada en **alimento para mascotas** (gatos y perros), construida con [Astro](https://astro.build) y TypeScript.

> **Estado:** en desarrollo. Actualmente solo existe una página base; el catálogo y el diseño se están construyendo.

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

## Estructura del proyecto

```text
/
├── public/              # Activos estáticos sin procesar (favicon, etc.)
├── src/
│   └── pages/
│       └── index.astro  # Página principal (enrutado por nombre de archivo)
├── AGENTS.md            # Guía para asistentes de IA
├── astro.config.mjs     # Configuración de Astro
├── package.json
└── tsconfig.json
```

Astro expone cada archivo de `src/pages/` como una ruta según su nombre. Los componentes reutilizables se colocarán en `src/components/` y los datos del catálogo en `src/data/`.

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
| `npm run astro -- check`  | Valida tipos y archivos `.astro`                    |
| `npm run astro -- --help` | Muestra la ayuda de la CLI de Astro                 |

## Documentación de referencia

- [Documentación de Astro](https://docs.astro.build)
- [Rutas y páginas](https://docs.astro.build/en/guides/routing/)
- [Componentes de Astro](https://docs.astro.build/en/basics/astro-components/)
- [Estilos](https://docs.astro.build/en/guides/styling/)
- [Colecciones de contenido](https://docs.astro.build/en/guides/content-collections/)
