# Migración de Homepage — movistarplus.es

## Objetivo
Migrar la página principal de [movistarplus.es](https://www.movistarplus.es) a AEM Edge Delivery Services en modo **Single Page**, incluyendo la migración del **header** y **footer** para que repliquen la estructura y diseño del sitio original.

## Información del Proyecto
- **Tipo de proyecto:** Document-based (markup) — configurado en `fstab.yaml`
- **Mountpoint:** AEM Cloud (`author-p34633-e913315.adobeaemcloud.com`)
- **Bloques existentes:** hero, columns, cards, header, footer, fragment
- **Artefactos previos:** Ninguno (migración desde cero)

## Plan de Migración (9 pasos)

### Checklist

- [ ] **Paso 0 — Inicializar plan de migración**
  - Crear `migration-work/migration-plan.md` con modo Single Page y URL `https://www.movistarplus.es`
  - Configurar seguimiento de tareas

- [ ] **Paso 1 — Configuración del proyecto**
  - Ejecutar `excat-project-expert` para detectar tipo de proyecto y URL de librería de bloques
  - Generar `.migration/project.json`

- [ ] **Paso 2 — Análisis del sitio**
  - Ejecutar `excat-site-analysis` con la URL de la homepage
  - Crear `tools/importer/page-templates.json` con plantilla(s) skeleton
  - Revisar las plantillas generadas

- [ ] **Paso 3 — Análisis de la página**
  - Ejecutar `excat-page-analysis` sobre `https://www.movistarplus.es`
  - Identificar secciones, bloques y variantes en la homepage
  - Generar `migration-work/authoring-analysis.json` y `migration-work/cleaned.html`
  - Crear código de variantes de bloques necesarias en `blocks/`

- [ ] **Paso 4 — Análisis y migración del Header**
  - Analizar la estructura del header original de movistarplus.es (navegación, logo, menú, búsqueda, botones)
  - Comparar con el bloque `blocks/header/header.js` y `blocks/header/header.css` existentes
  - Modificar el JS de decoración del header para replicar la estructura del original
  - Modificar el CSS del header para replicar el diseño visual del original
  - Crear/actualizar `content/nav.html` con la estructura de navegación del sitio original
  - Verificar el resultado en preview

- [ ] **Paso 5 — Análisis y migración del Footer**
  - Analizar la estructura del footer original de movistarplus.es (enlaces, logos, legal, redes sociales)
  - Comparar con el bloque `blocks/footer/footer.js` y `blocks/footer/footer.css` existentes
  - Modificar el JS de decoración del footer para replicar la estructura del original
  - Modificar el CSS del footer para replicar el diseño visual del original
  - Crear/actualizar `content/footer.html` con el contenido del footer original
  - Verificar el resultado en preview

- [ ] **Paso 6 — Mapeo de bloques**
  - Ejecutar `block-mapping-manager` para popular los selectores DOM en `page-templates.json`
  - Vincular cada variante de bloque con su selector CSS/XPath en el DOM original

- [ ] **Paso 7 — Infraestructura de importación**
  - Ejecutar `excat-import-infrastructure` para generar:
    - Parsers por variante de bloque en `tools/importer/parsers/`
    - Transformers de limpieza en `tools/importer/transformers/`

- [ ] **Paso 8 — Importación de contenido**
  - Generar script de importación (`tools/importer/import-homepage.js`) vía `excat-import-script`
  - Ejecutar importación vía `excat-content-import`
  - Verificar contenido generado en `content/`
  - Revisar reporte en `tools/importer/reports/`

## Artefactos Esperados

| Artefacto | Ruta |
|---|---|
| Configuración del proyecto | `.migration/project.json` |
| Plan de migración | `migration-work/migration-plan.md` |
| Análisis de la página | `migration-work/authoring-analysis.json` |
| HTML limpio | `migration-work/cleaned.html` |
| Header JS (modificado) | `blocks/header/header.js` |
| Header CSS (modificado) | `blocks/header/header.css` |
| Navegación | `content/nav.html` |
| Footer JS (modificado) | `blocks/footer/footer.js` |
| Footer CSS (modificado) | `blocks/footer/footer.css` |
| Contenido footer | `content/footer.html` |
| Plantillas de página | `tools/importer/page-templates.json` |
| Parsers de bloques | `tools/importer/parsers/*.js` |
| Transformers | `tools/importer/transformers/*.js` |
| Script de importación | `tools/importer/import-*.js` |
| Contenido importado | `content/*.plain.html` |
| Reporte de importación | `tools/importer/reports/*.xlsx` |

## Riesgos y Consideraciones

- **Contenido dinámico:** La homepage de Movistar+ probablemente tiene carruseles, banners promocionales y contenido cargado dinámicamente (JS). El scraping puede capturar solo el estado inicial del DOM.
- **Bloques nuevos:** Es probable que se necesiten variantes nuevas más allá de los 6 bloques base existentes.
- **Header complejo:** El header de Movistar+ puede incluir mega-menús, buscador y navegación responsive que requerirán lógica JS avanzada.
- **Footer dinámico:** El footer puede contener acordeones o secciones colapsables en móvil.
- **Imágenes:** Las imágenes del sitio original se descargarán y referenciarán localmente.

## Siguiente Paso
Para ejecutar este plan, cambiar a modo Execute y se procederá con el Paso 0.
