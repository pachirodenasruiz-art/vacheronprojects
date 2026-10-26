# Vacheron Projects · Web

Web estática de Vacheron Projects (HTML, CSS y JS sin dependencias).

- Las páginas `*.html` se generan con `python3 _build/build.py`.
- Contenido y plantilla: `_build/build.py`, estilos en `_build/base.html` y `_build/extra.css`, scripts en `_build/site.js`.
- Trabajos importados de vacheronprojects.com en `_build/data/` y fotos en `assets/trabajos/`.
- Residencial Ifach: imágenes en `assets/ifach/`.

Despliegue: Vercel sirve la carpeta raíz tal cual (sin paso de build).
