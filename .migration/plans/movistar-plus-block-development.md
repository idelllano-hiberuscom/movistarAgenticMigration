# Plan: Construir Página Completa con Bloques Granulares — Movistar Plus+

## Contexto

Se han creado 11 bloques granulares (`hero-carousel`, `card-list`, `pricing`, `feature-grid`, `logo-wall`, `mosaic`, `banner`, `carousel`, `gallery`, `cta`, `accordion`) con JS, CSS y el sistema de diseño de Movistar Plus+. Ahora hay que:

1. **Actualizar la infraestructura de importación** (page-templates.json, parsers, transformers) para usar los nuevos bloques
2. **Re-ejecutar la importación** para generar el HTML de la página con los bloques correctos
3. **Guardar el resultado** en la ruta `content/movistarplusagenticmigration/home-migrada`

## Proyecto

- **Tipo:** xwalk (Universal Editor)
- **Mountpoint AEM:** `author-p34633-e913315.adobeaemcloud.com`
- **Ruta destino:** `/content/movistarplusagenticmigration/home-migrada`

## Mapeo: 19 Secciones Originales → Bloques Granulares

| # | Sección Original | Bloque EDS | Selector DOM |
|---|---|---|---|
| 1 | Hero Banner Carousel | `hero-carousel` | `section.mplus-banner.mplus-banner--slider` |
| 2 | Featured Collection | `card-list` | `section.mplus-collection--highlight#m64ba…` |
| 3 | Subscription Plans | `pricing` | `section.mplus-tarifas` |
| 4 | Benefits | `feature-grid` | `section.mplus-benefits#m661d…` |
| 5 | Channel Logos | `logo-wall` | `section.mplus-collection__logos` |
| 6 | Mosaic - Series | `mosaic` | `section.mplus-mosaic#m64be9…` |
| 7 | Promo Banner 1 | `banner` | `section.mplus-cintillo#m65f8…` |
| 8 | Mosaic - Cinema | `mosaic` | `section.mplus-mosaic#m64bfe…` |
| 9 | Horizontal Collection | `carousel` | `section.mplus-collection__horizontal#m67ef…` |
| 10 | Mosaic - Sports | `mosaic` | `section.mplus-mosaic#m64bfe…` |
| 11 | Vertical Collection | `gallery` | `section.mplus-collection__vertical#m681c…` |
| 12 | Mosaic - More Series | `mosaic` | `section.mplus-mosaic#m654d1…` |
| 13 | Mosaic - Entertainment | `mosaic` | `section.mplus-mosaic#m654d1…` |
| 14 | Highlight Couped | `card-list` | `section.mplus-collection__couped-right#m661…` |
| 15 | Grid Collection | `carousel` | `section.mplus-collection__grid--type3#m693…` |
| 16 | Promo Banner 2 | `banner` | `section.mplus-cintillo#m66a8…` |
| 17 | Benefits - Bottom | `feature-grid` | `section.mplus-benefits#m660f…` |
| 18 | Pricing CTA | `cta` | `section.mplus-price` |
| 19 | FAQ Accordion | `accordion` | `section.mplus-accordion` |

## Checklist

- [ ] **Actualizar `page-templates.json`** — Reemplazar los 4 bloques antiguos (hero-carousel, cards, columns, hero) por los 11 nuevos con sus selectores
- [ ] **Crear parsers nuevos** — Generar `tools/importer/parsers/` para cada bloque nuevo (`card-list.js`, `pricing.js`, `feature-grid.js`, `logo-wall.js`, `mosaic.js`, `banner.js`, `carousel.js`, `gallery.js`, `cta.js`, `accordion.js`) + actualizar `hero-carousel.js`
- [ ] **Actualizar transformers** — Ajustar `movistarplus-sections.js` para las 19 secciones con nuevos nombres de bloque
- [ ] **Regenerar import script** — Crear `import-homepage-v2.js` que importa los nuevos parsers y orquesta la transformación
- [ ] **Bundlear import script** — Ejecutar bundle del nuevo script
- [ ] **Ejecutar importación** — Correr `run-bulk-import.js` con la URL `https://www.movistarplus.es` y path destino `/movistarplusagenticmigration/home-migrada`
- [ ] **Verificar resultado** — Confirmar que `content/movistarplusagenticmigration/home-migrada.plain.html` existe con las 19 secciones y los bloques correctos
- [ ] **Verificar preview** — Cargar la página en el preview para confirmar renderizado

## Enfoque Técnico

- Se usará la skill `excat-import-infrastructure` para regenerar parsers adaptados a los nuevos nombres de bloque
- Se usará la skill `excat-import-script` para regenerar el import script
- Se usará la skill `excat-content-import` para ejecutar la importación
- La ruta de salida del contenido se configurará como `content/movistarplusagenticmigration/home-migrada.plain.html`

## Ejecución

Para implementar este plan, cambiar a **modo Execute**. Se actualizará toda la infraestructura de importación y se re-ejecutará la importación con los nuevos bloques granulares.I need to reorder the functions so `goToSlide` and `resetAutoplay` are defined before they're used.# Plan: Construir Página Completa con Bloques Granulares — Movistar Plus+

## Pendiente Inmediato: Fix Lint Error

Antes de continuar con el plan principal, hay un error de lint en `blocks/hero-carousel/hero-carousel.js` que debe corregirse:

- **Línea 38:** `goToSlide` usado antes de su definición
- **Línea 54:** `resetAutoplay` usado antes de su definición
- **Fix:** Mover las declaraciones de `goToSlide` y `resetAutoplay` antes de su primer uso (antes del bloque de indicators)

## Contexto

Se han creado 11 bloques granulares con JS, CSS y el sistema de diseño de Movistar Plus+. Ahora hay que:

1. **Actualizar la infraestructura de importación** para usar los nuevos bloques
2. **Re-ejecutar la importación** para generar el HTML con los bloques correctos
3. **Guardar el resultado** en `content/movistarplusagenticmigration/home-migrada`

## Proyecto

- **Tipo:** xwalk (Universal Editor)
- **Mountpoint AEM:** `author-p34633-e913315.adobeaemcloud.com`
- **Ruta destino:** `/content/movistarplusagenticmigration/home-migrada`

## Mapeo: 19 Secciones Originales → Bloques Granulares

| # | Sección Original | Bloque EDS | Selector DOM |
|---|---|---|---|
| 1 | Hero Banner Carousel | `hero-carousel` | `section.mplus-banner.mplus-banner--slider` |
| 2 | Featured Collection | `card-list` | `section.mplus-collection--highlight#m64ba…` |
| 3 | Subscription Plans | `pricing` | `section.mplus-tarifas` |
| 4 | Benefits | `feature-grid` | `section.mplus-benefits#m661d…` |
| 5 | Channel Logos | `logo-wall` | `section.mplus-collection__logos` |
| 6 | Mosaic - Series | `mosaic` | `section.mplus-mosaic#m64be9…` |
| 7 | Promo Banner 1 | `banner` | `section.mplus-cintillo#m65f8…` |
| 8 | Mosaic - Cinema | `mosaic` | `section.mplus-mosaic#m64bfe…` |
| 9 | Horizontal Collection | `carousel` | `section.mplus-collection__horizontal#m67ef…` |
| 10 | Mosaic - Sports | `mosaic` | `section.mplus-mosaic#m64bfeb…` |
| 11 | Vertical Collection | `gallery` | `section.mplus-collection__vertical#m681c…` |
| 12 | Mosaic - More Series | `mosaic` | `section.mplus-mosaic#m654d15…` |
| 13 | Mosaic - Entertainment | `mosaic` | `section.mplus-mosaic#m654d13…` |
| 14 | Highlight Couped | `card-list` | `section.mplus-collection__couped-right#m661…` |
| 15 | Grid Collection | `carousel` | `section.mplus-collection__grid--type3#m693…` |
| 16 | Promo Banner 2 | `banner` | `section.mplus-cintillo#m66a8…` |
| 17 | Benefits - Bottom | `feature-grid` | `section.mplus-benefits#m660f…` |
| 18 | Pricing CTA | `cta` | `section.mplus-price` |
| 19 | FAQ Accordion | `accordion` | `section.mplus-accordion` |

## Checklist

- [ ] **Fix lint error** en `blocks/hero-carousel/hero-carousel.js` (mover `goToSlide` y `resetAutoplay` antes de su uso)
- [ ] **Actualizar `page-templates.json`** — Reemplazar los 4 bloques antiguos por los 11 nuevos con sus selectores
- [ ] **Crear parsers nuevos** — Generar `tools/importer/parsers/` para cada bloque nuevo (`card-list.js`, `pricing.js`, `feature-grid.js`, `logo-wall.js`, `mosaic.js`, `banner.js`, `carousel.js`, `gallery.js`, `cta.js`, `accordion.js`) + actualizar `hero-carousel.js`
- [ ] **Actualizar transformers** — Ajustar `movistarplus-sections.js` para las 19 secciones con nuevos nombres de bloque
- [ ] **Regenerar import script** — Crear `import-homepage-v2.js` que importa los nuevos parsers
- [ ] **Bundlear import script** — Ejecutar bundle del nuevo script
- [ ] **Ejecutar importación** — Correr `run-bulk-import.js` con la URL `https://www.movistarplus.es` y path destino `/movistarplusagenticmigration/home-migrada`
- [ ] **Verificar resultado** — Confirmar que `content/movistarplusagenticmigration/home-migrada.plain.html` existe con las 19 secciones y bloques correctos
- [ ] **Verificar preview** — Cargar la página en preview para confirmar renderizado

## Enfoque Técnico

- Se usará la skill `excat-import-infrastructure` para regenerar parsers adaptados a los nuevos nombres de bloque
- Se usará la skill `excat-import-script` para regenerar el import script
- Se usará la skill `excat-content-import` para ejecutar la importación
- La ruta de salida del contenido se configurará como `content/movistarplusagenticmigration/home-migrada.plain.html`

## Ejecución

Para implementar este plan, cambiar a **modo Execute**. Se corregirá el lint error, se actualizará toda la infraestructura de importación y se re-ejecutará la importación con los nuevos bloques granulares.
