#!/usr/bin/env python3
"""Genera la web de Vacheron Projects (páginas estáticas) en la carpeta web/.

Uso:  python3 web/_build/build.py
Fuentes: _build/base.html (estilos, iconos y bloques de la portada), extra.css, site.js,
         _build/data/ (trabajos y fotos importados de vacheronprojects.com) y el contenido de este archivo.
"""
import os, re, json, glob, html, shutil, unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.dirname(HERE)
SRC = open(os.path.join(HERE, 'base.html'), encoding='utf-8').read()

def between(s, a, b):
    i = s.index(a); j = s.index(b, i)
    return s[i:j]

BASE_CSS = between(SRC, '<style>', '</style>')[len('<style>'):]
ICONS = between(SRC, '<!-- Iconos de redes sociales -->', '<!-- Escenas ilustradas')
CSS = BASE_CSS + open(os.path.join(HERE, 'extra.css'), encoding='utf-8').read()
FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Raleway:wght@200;300;400;500;600&family=Mulish:wght@400;500;600;700&display=swap">'
PROTO = '<div class="proto"><p class="wrap">Prototipo de diseño · Las noticias, las ofertas de empleo y las cifras de ahorro energético son de ejemplo.</p></div>'

WA = 'https://wa.me/34628060560'

# ======================================================================
# DATOS: trabajos importados de vacheronprojects.com/trabajos
# ======================================================================
CATS = {
  'construccion': 'Construcción',
  'reforma-integral': 'Reforma integral',
  'piscinas': 'Piscinas',
  'locales-comerciales': 'Locales comerciales',
  'promocion-inmobiliaria': 'Promoción inmobiliaria',
  'proyectos': 'Gestión de proyectos',
}
CAT_SERVICE = {'construccion': 'construccion', 'reforma-integral': 'reforma-integral', 'piscinas': 'piscinas',
               'locales-comerciales': 'locales-comerciales', 'promocion-inmobiliaria': 'promocion-inmobiliaria', 'proyectos': 'gestion-proyectos'}

def slugify(t):
    t = unicodedata.normalize('NFKD', t).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+', '-', t).strip('-')

# Datos que la web actual no da de forma estructurada
META = {
  'casa-grades': dict(title='Casa Grades', loc='Alicante', year='2026'),
  'piscina-comunitaria-passivhaus': dict(title='Piscina comunitaria Passivhaus Imaginalia', loc='Albacete', year='2026'),
  'casa-llosa': dict(loc='Valencia', year='2026'),
  'libreria-popular': dict(loc='Albacete', year='2026'),
  'casa-nereida': dict(loc='Cabo de las Huertas, Alicante', year='2026'),
  'casa-llum': dict(loc='La Olla, Altea', year='2026'),
  'residencial-ifach': dict(loc='San Agustín, Alicante', year='En venta'),
  'casa-kimun': dict(loc='Barrio Medicina, Albacete', year='2025'),
  'casa-cordoba': dict(title='Casa Córdoba', loc='Pinares del Júcar, Albacete', year='2025'),
  'piscina-comunitaria-mirabueno-ii': dict(title='Piscina comunitaria Mirabueno II', loc='Córdoba', year='2025'),
  'aislamiento-termico-de-vivienda': dict(cats=['reforma-integral']),
  'piscina-municipal-de-el-bonillo': dict(cats=['construccion', 'piscinas']),
  'clinica-albamatrona': dict(cover=1),
  'peluqueria-azul-de-rizos': dict(cover=1),
  'cafeteria': dict(title='Proyecto de cafetería'),
  'piscina-comunidad': dict(title='Piscina comunitaria'),
  'rehabilitacion-piscina-privada-ml': dict(title='Rehabilitación piscina privada ML'),
}
FOTOS = json.load(open(os.path.join(HERE, 'data', 'fotos.json'), encoding='utf-8'))
RAW = json.load(open(os.path.join(HERE, 'data', 'trabajos-original.json'), encoding='utf-8'))

WORKS = []
for d in RAW:
    slug = slugify(d['title'].replace('Proyecto ', ''))
    m = META.get(slug, {})
    summ = d['summary'].replace('Casa Grado', 'Casa Grades')
    # quita el prefijo "Nombre del trabajo · " que repite el título
    summ = re.sub(r'^[^·]{3,70}·\s*', '', summ) if '·' in summ[:70] else summ
    summ = summ[0].upper() + summ[1:]
    w = dict(slug=slug, title=m.get('title', d['title']), summary=summ,
             cats=m.get('cats', d['cats']), loc=m.get('loc', ''), year=m.get('year', ''), size='')
    body = []
    for tag, t in d['blocks']:
        t = t.replace('Casa Grado ', 'Casa Grades ').replace('Casa Grado·', 'Casa Grades ·')
        mm = re.match(r'^Año\s*([^|]+?)\s*(?:\|\s*Lugar\s*([^|]+?))?\s*(?:\|\s*Superficie\s*(.+))?$', t)
        if mm:
            w['year'] = w['year'] or mm.group(1).strip()
            if mm.group(2): w['loc'] = w['loc'] or mm.group(2).strip()
            if mm.group(3): w['size'] = mm.group(3).strip().replace('m2', ' m²')
            continue
        if t in ('Solicitar más información', '.') or tag == 'li' or tag == 'h1':
            continue
        if tag == 'p' and t.startswith(w['title'] + ' ·') and not body:
            continue
        body.append(('h2' if tag in ('h2', 'h3') else 'p', t))
    # La ficha de "Piscina privada AN" repite el texto de otra piscina: usamos su resumen
    if slug == 'piscina-privada-an':
        body = [('p', w['summary'])]
    w['body'] = body
    fotos = FOTOS.get(slug, [])
    c = m.get('cover', 0)
    w['fotos'] = fotos
    w['cover'] = fotos[c] if fotos else None
    w['type'] = ' '.join(w['cats'])
    w['url'] = 'promocion-residencial-ifach.html' if slug == 'residencial-ifach' else f'trabajo-{slug}.html'
    WORKS.append(w)
BY = {w['slug']: w for w in WORKS}

def img(f, alt, cls='', lazy=True, sizes=None):
    """Etiqueta <img> para una foto del portafolio: f = [ruta, ancho, alto]."""
    l = ' loading="lazy" decoding="async"' if lazy else ''
    c = f' class="{cls}"' if cls else ''
    return f'<img src="assets/trabajos/{f[0]}" width="{f[1]}" height="{f[2]}" alt="{html.escape(alt)}"{c}{l}>'

def aimg(path, alt, w, h, cls='', lazy=True):
    l = ' loading="lazy" decoding="async"' if lazy else ''
    c = f' class="{cls}"' if cls else ''
    return f'<img src="{path}" width="{w}" height="{h}" alt="{html.escape(alt)}"{c}{l}>'

IF = 'assets/ifach/'
IFACH_IMG = {  # nombre: (ancho, alto)
  'fachada': (1800, 789), 'acceso': (1800, 2514), 'piscina': (1800, 1171), 'solarium': (1800, 1255),
  'salon': (1800, 1097), 'salon-2': (1800, 1021), 'dormitorio': (1800, 1397), 'bano': (1800, 2177),
  'cocina': (1800, 1969), 'zonas-comunes': (1800, 1157), 'mapa': (1800, 1292),
  'plano-vivienda-02': (1692, 1082), 'plano-vivienda-05': (1692, 1082),
}
def ifimg(n, alt, cls='', lazy=True):
    w, h = IFACH_IMG[n]
    return aimg(f'{IF}{n}.jpg', alt, w, h, cls, lazy)

# ======================================================================
# PLANTILLA
# ======================================================================
SERVICES = [
  ('construccion', 'Construcción', 'hogar', 'Viviendas unifamiliares llave en mano'),
  ('reforma-integral', 'Reforma integral', 'hogar', 'Tu casa de siempre, transformada'),
  ('piscinas', 'Piscinas', 'hogar', 'Privadas, comunitarias y municipales'),
  ('gestion-proyectos', 'Gestión de proyectos', 'hogar', 'Un responsable de principio a fin'),
  ('locales-comerciales', 'Locales comerciales', 'empresa', 'Tiendas, hostelería y franquicias'),
  ('promocion-inmobiliaria', 'Promoción inmobiliaria', 'empresa', 'Viviendas de obra nueva'),
]

def nav(active):
    def cur(k): return ' aria-current="page"' if active == k else ''
    hogar = ''.join(f'<a href="servicio-{s}.html"><b>{n}</b><span>{d}</span></a>' for s, n, g, d in SERVICES if g == 'hogar')
    empresa = ''.join(f'<a href="servicio-{s}.html"><b>{n}</b><span>{d}</span></a>' for s, n, g, d in SERVICES if g == 'empresa')
    empresa += '<a href="promocion-residencial-ifach.html"><b>Residencial Ifach</b><span>Promoción en venta · Alicante</span></a>'
    mob_svc = ''.join(f'<li class="sub"><a href="servicio-{s}.html">{n}</a></li>' for s, n, g, d in SERVICES)
    return f'''<header class="nav">
  <div class="wrap">
    <a href="index.html" class="brand" aria-label="Vacheron Projects, inicio">
      <img src="assets/mark.jpg" alt="" width="61" height="34">
      <span class="wm"><b>VACHERON</b><span>PROJECTS</span></span>
    </a>
    <nav aria-label="Principal">
      <ul class="nav-links">
        <li><a href="nosotros.html"{cur('nosotros')}>Nosotros</a></li>
        <li class="has-dd"><a href="servicios.html"{cur('servicios')}>Servicios<span class="car" aria-hidden="true">▾</span></a>
          <div class="dd"><div class="dd-box">
            <div class="dd-col"><p class="label">Para tu hogar</p>{hogar}</div>
            <div class="dd-col"><p class="label">Para empresas e inversores</p>{empresa}</div>
          </div></div>
        </li>
        <li><a href="trabajos.html"{cur('trabajos')}>Trabajos</a></li>
        <li><a href="noticias.html"{cur('noticias')}>Noticias</a></li>
        <li><a href="inversores.html"{cur('inversores')}>Inversores</a></li>
      </ul>
    </nav>
    <div class="nav-right">
      <a href="contacto.html" class="btn btn-primary nav-cta">Contacto</a>
      <button class="menu-btn" id="menu-btn" aria-expanded="false" aria-controls="mobile-menu">Menú</button>
    </div>
  </div>
  <div class="mobile-menu" id="mobile-menu" hidden>
    <ul class="wrap">
      <li><a href="index.html">Inicio</a></li>
      <li><a href="nosotros.html">Nosotros</a></li>
      <li><a href="servicios.html">Servicios</a></li>
      {mob_svc}
      <li><a href="trabajos.html">Trabajos</a></li>
      <li><a href="promocion-residencial-ifach.html">Residencial Ifach · en venta</a></li>
      <li><a href="noticias.html">Noticias</a></li>
      <li><a href="inversores.html">Inversores</a></li>
      <li><a href="contacto.html">Contacto</a></li>
    </ul>
  </div>
</header>'''

def footer():
    svc = ''.join(f'<li><a href="servicio-{s}.html">{n}</a></li>' for s, n, g, d in SERVICES)
    return f'''<footer>
  <div class="wrap">
    <div class="foot">
      <div>
        <a href="index.html" aria-label="Vacheron Projects, inicio"><img class="foot-logo" src="assets/lockup.jpg" alt="Vacheron Projects" width="190" height="123"></a>
        <p class="foot-claim">Diseñamos y construimos casas con nombre propio, en toda España.</p>
        <div class="socials" data-socials></div>
      </div>
      <div><p class="label">Servicios</p><ul>{svc}</ul></div>
      <div><p class="label">Empresa</p><ul><li><a href="nosotros.html">Nosotros</a></li><li><a href="trabajos.html">Trabajos</a></li><li><a href="promocion-residencial-ifach.html">Residencial Ifach</a></li><li><a href="noticias.html">Noticias</a></li><li><a href="inversores.html">Inversores</a></li><li><a href="empleo.html">Empleo</a></li><li><a href="contacto.html">Contacto</a></li></ul></div>
      <div><p class="label">Legal</p><ul><li><a href="aviso-legal.html">Aviso legal</a></li><li><a href="proteccion-datos.html">Protección de datos</a></li><li><a href="cookies.html">Política de cookies</a></li></ul>
        <p class="label" style="margin-top:28px">Contacto</p><ul><li>967 50 25 44</li><li><a href="{WA}" target="_blank" rel="noopener">WhatsApp 628 060 560</a></li><li>info@vacheronprojects.com</li><li>Marqués de Villores, 34 · 02003 Albacete</li><li>Colón, 21 · 03001 Alicante</li></ul></div>
    </div>
    <div class="legal"><span>© 2026 VACHERON PROJECTS S.L. · CIF B02209104 · Proyectos en toda España · Oficinas en Albacete y Alicante</span><span><a href="empleo.html">Empleo</a> · <a href="aviso-legal.html">Aviso legal</a> · <a href="proteccion-datos.html">Protección de datos</a> · <a href="cookies.html">Cookies</a></span></div>
  </div>
</footer>
<div class="sticky-cta">
  <a href="contacto.html" class="btn btn-primary">Empezar mi proyecto</a>
  <a href="{WA}" class="btn btn-ghost" target="_blank" rel="noopener" aria-label="Escribir por WhatsApp"><svg aria-hidden="true" style="width:18px;height:18px"><use href="#i-whatsapp"/></svg>WhatsApp</a>
</div>
<div class="lb" id="lb" hidden><button class="lb-x" id="lb-x" aria-label="Cerrar">×</button><button class="lb-p" id="lb-p" aria-label="Anterior">‹</button><img id="lb-img" alt=""><button class="lb-n" id="lb-n" aria-label="Siguiente">›</button><p id="lb-c"></p></div>'''

PAGES = []
def page(fname, title, desc, active, body, home=False):
    head_meta = f'<meta name="description" content="{html.escape(desc)}">\n{FONTS}\n<link rel="stylesheet" href="assets/styles.css">'
    full_title = title if home else f'{title} · Vacheron Projects'
    body_html = f'{ICONS}{PROTO}\n{nav(active)}\n<main id="top">\n{body}\n</main>\n{footer()}\n<script src="assets/site.js"></script>\n'
    if home:  # la página principal del artefacto se envuelve sola en un esqueleto HTML
        out = f'<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<title>{full_title}</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n{head_meta}\n{body_html}'
    else:
        out = f'<!doctype html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<title>{full_title}</title>\n{head_meta}\n</head>\n<body>\n{body_html}</body>\n</html>\n'
    open(os.path.join(OUT, fname), 'w', encoding='utf-8').write(out)
    PAGES.append(fname)

def crumbs_html(crumbs):
    return '<a href="index.html">Inicio</a>' + ''.join(
        '<span aria-hidden="true">/</span>' + (f'<a href="{u}">{t}</a>' if u else f'<span>{t}</span>') for t, u in crumbs)

def phero(crumbs, h1, lead, cta=None, image=None, label=None):
    c = ''
    if cta:
        c = '<div class="ctas">' + ''.join(f'<a href="{u}" class="btn {k}"{" target=\"_blank\" rel=\"noopener\"" if u.startswith("http") else ""}>{t}</a>' for t, u, k in cta) + '</div>'
    fig = f'<div class="wrap pfig">{image}</div>' if image else ''
    lab = f'<p class="label f" style="grid-column:1/-1">{label}</p>' if label else ''
    return f'''<section class="phero">
  <div class="wrap">
    <nav class="crumbs" aria-label="Ruta">{crumbs_html(crumbs)}</nav>
    <div class="phero-grid">{lab}<h1>{h1}</h1><p class="lead">{lead}</p>{c}</div>
  </div>
</section>
{fig}'''

def cta_band(h2, primary=('Empezar mi proyecto', 'contacto.html'), secondary=('Ver trabajos', 'trabajos.html')):
    sec = f'<a href="{secondary[1]}" class="btn btn-ghost">{secondary[0]}</a>' if secondary else ''
    return f'''<section class="cta-band"><div class="wrap"><h2>{h2}</h2><div class="ctas"><a href="{primary[1]}" class="btn btn-primary">{primary[0]} <span class="arr" aria-hidden="true">→</span></a>{sec}</div></div></section>'''

def head(label, h2, lead=''):
    l = f'<p class="lead">{lead}</p>' if lead else ''
    return f'<div class="head"><p class="label f">{label}</p><h2>{h2}</h2>{l}</div>'

def faq(items):
    return ''.join(f'<details><summary>{q}</summary><p>{a}</p></details>' for q, a in items)

def work_meta(w):
    return ' · '.join(x for x in [w['loc'], CATS.get(w['cats'][0], '') if w['cats'] else ''] if x)

def work_card(w, lazy=True):
    cover = img(w['cover'], w['title'], lazy=lazy) if w['cover'] else ''
    tag = '<span class="badge">En venta</span>' if w['slug'] == 'residencial-ifach' else ''
    return f'''<a class="proj" href="{w['url']}" data-type="{w['type']}"><div class="img">{cover}{tag}</div>
<div class="proj-head"><h3>{w['title']}</h3><span class="label">{work_meta(w)}</span></div><p>{w['summary']}</p></a>'''

def gallery(fotos, title):
    items = ''.join(f'<a href="assets/trabajos/{f[0]}" class="gi" data-lb="{html.escape(title)}">{img(f, f"{title}, foto {i + 1}")}</a>' for i, f in enumerate(fotos))
    return f'<div class="masonry">{items}</div>'

LEAD_FORM_SECTION = between(SRC, '<section class="section contact" id="contacto"', '</main>')
DIRECT_OLD = '<div><span class="label">Oficinas</span><span>Albacete · Alicante</span></div>'
DIRECT_NEW = '<div><span class="label">Email</span><b>info@vacheronprojects.com</b></div>\n          <div><span class="label">Oficinas</span><span>Marqués de Villores, 34 · 02003 Albacete<br>Colón, 21 · 03001 Alicante</span></div>'
assert DIRECT_OLD in LEAD_FORM_SECTION
CONTACT_SECTION = LEAD_FORM_SECTION.replace(DIRECT_OLD, DIRECT_NEW)

CREDS = '''<section aria-label="Datos de la empresa">
    <div class="wrap" style="margin-top:clamp(56px,7vw,96px)">
      <div class="creds">
        <div class="creds-grid">
          <div class="cred"><strong class="num">2004</strong><span>construyendo, reformando y promoviendo</span></div>
          <div class="cred"><strong class="num">38</strong><span>trabajos publicados en nuestro portafolio</span></div>
          <div class="cred"><strong class="num">6</strong><span>especialidades bajo un mismo equipo</span></div>
          <div class="cred"><strong class="num">2</strong><span>oficinas, Albacete y Alicante, y proyectos en toda España</span></div>
        </div>
        <div class="seals">
          <span>Promotora y constructora</span><span>Proyectos llave en mano</span><span>Experiencia Passivhaus</span><span>Seguro decenal</span>
        </div>
      </div>
    </div>
  </section>'''

# ======================================================================
# 1. INICIO
# ======================================================================
METODO = between(SRC, '<section class="band section" id="metodo"', '<section class="section" id="passivhaus"')
PH = between(SRC, '<section class="section" id="passivhaus"', '<section class="section" id="proyectos"')
PH = PH.replace('Passivhaus y eficiencia · Caso Imaginalia', 'Passivhaus y eficiencia')
PH = PH.replace('<p class="lead">Aislamiento continuo,', '<p class="lead">Hemos ejecutado la piscina comunitaria del primer edificio residencial Passivhaus de Castilla-La Mancha. Aislamiento continuo,')
SOCIAL = between(SRC, '<section class="section social-sec" id="redes"', '<section class="section" aria-labelledby="faq-h">')
FAQ_HOME = between(SRC, '<section class="section" aria-labelledby="faq-h">', '<section class="section contact" id="contacto"')

g = BY['casa-grades']
hero_w = BY['casa-kimun']
recent = [BY[s] for s in ['casa-grades', 'casa-llum', 'piscina-comunitaria-passivhaus', 'casa-kimun', 'libreria-popular', 'casa-nereida']]

home = f'''
  <section class="hero">
    <div class="wrap hero-grid">
      <h1>Tu casa, exactamente como la imaginas. <span class="l2"><em>Construida exactamente como te la prometimos.</em></span></h1>
      <div class="hero-meta">
        <p class="label f">Proyectos en toda España</p>
        <p class="note">Oficinas en Albacete y Alicante</p>
      </div>
      <div class="hero-side">
        <p class="lead">Diseñamos y construimos viviendas unifamiliares y reformas integrales con presupuesto cerrado, plazo por contrato y un único equipo de principio a fin.</p>
        <div class="ctas">
          <a href="#contacto" class="btn btn-primary">Empezar mi proyecto <span class="arr" aria-hidden="true">→</span></a>
          <a href="trabajos.html" class="btn btn-ghost">Ver trabajos</a>
        </div>
      </div>
    </div>
    <div class="wrap hero-figure hero-photo">
      {img(hero_w['fotos'][0], 'Casa Kimun, vivienda unifamiliar en Albacete', lazy=False)}
      <a class="figcap" href="{hero_w['url']}">CASA KIMUN · VIVIENDA UNIFAMILIAR · ALBACETE →</a>
    </div>
  </section>

  {CREDS}

  <section class="section" aria-labelledby="ifach-h">
    <div class="wrap promo-band">
      <a class="promo-img" href="promocion-residencial-ifach.html">{ifimg('fachada', 'Fachada de Residencial Ifach, calle Calpe 18, Alicante')}<span class="badge">En venta</span></a>
      <div class="promo-text">
        <p class="label f">Promoción en venta · San Agustín, Alicante</p>
        <h2 id="ifach-h">Residencial Ifach</h2>
        <p class="lead">Solo 12 viviendas en calle Calpe 18: estudios y pisos de 2 y 3 dormitorios con garaje, trastero, piscina, solárium y club social incluidos.</p>
        <p class="price"><span>Desde</span> 230.000 €</p>
        <div class="ctas"><a href="promocion-residencial-ifach.html" class="btn btn-primary">Ver viviendas disponibles <span class="arr" aria-hidden="true">→</span></a></div>
      </div>
    </div>
  </section>

  <section class="section" style="padding-top:0" aria-labelledby="feat-h">
    <div class="wrap">
      <div class="head">
        <p class="label f">Trabajo destacado · Casa Grades</p>
        <h2 id="feat-h">Reforma integral en uno de los edificios <em>más emblemáticos de Alicante.</em></h2>
        <p class="lead">Dos dormitorios, vestidor, dos baños y una gran terraza, renovados por completo con cocina nueva, climatización Airzone y carpinterías de altas prestaciones.</p>
      </div>
      <div class="feat-photos">
        <a href="{g['url']}" class="f1">{img(g['fotos'][1], 'Casa Grades, salón')}</a>
        <a href="{g['url']}" class="f2">{img(g['fotos'][2], 'Casa Grades, interior')}</a>
        <a href="{g['url']}" class="f3">{img(g['fotos'][4], 'Casa Grades, detalle')}</a>
      </div>
      <p style="margin-top:28px"><a href="{g['url']}" class="link">Ver el trabajo completo</a></p>
    </div>
  </section>

  <section class="section" id="servicios" aria-labelledby="serv-h" style="padding-top:0">
    <div class="wrap">
      {head('Qué hacemos', 'Cuatro formas de llegar a <em>la misma casa: la tuya.</em>', 'Un solo equipo diseña, calcula, construye y responde. Tú no coordinas gremios: decides cómo quieres vivir.')}
      <div class="services">
        <article class="service">
          <svg class="ico" viewBox="0 0 56 56" fill="none" stroke-width="1.6" aria-hidden="true"><path d="M6 48h44M10 48V26h22v22" stroke="#0B4A3D"/><path d="M32 48V16h14v32M14 32h6v6h-6zM36 22h6v6h-6z" stroke="#2A8F80"/></svg>
          <p class="label">Construcción</p><h3>De la parcela a la llave.</h3>
          <p>Estudiamos tu terreno, diseñamos contigo cada estancia y construimos tu casa con un único interlocutor y una fecha de entrega firmada, estés donde estés.</p>
          <a href="servicio-construccion.html" class="link">Construir mi casa</a>
        </article>
        <article class="service">
          <svg class="ico" viewBox="0 0 56 56" fill="none" stroke-width="1.6" aria-hidden="true"><path d="M8 48V20L28 8l20 12v28H8zM8 48h40" stroke="#0B4A3D"/><path d="M20 48V32h16v16M14 24h8v5h-8z" stroke="#2A8F80"/></svg>
          <p class="label">Reformas integrales</p><h3>Tu casa de siempre, como nunca la habías vivido.</h3>
          <p>Redistribuimos, iluminamos y renovamos hasta la última instalación. Sin gremios que coordinar y sin sorpresas en la factura.</p>
          <a href="servicio-reforma-integral.html" class="link">Reformar mi casa</a>
        </article>
        <article class="service">
          <svg class="ico" viewBox="0 0 56 56" fill="none" stroke-width="1.6" aria-hidden="true"><path d="M4 22h48v20H4z" stroke="#0B4A3D"/><path d="M10 31q4-3 8 0t8 0 8 0 8 0 8 0M40 22V10h6" stroke="#2A8F80"/></svg>
          <p class="label">Piscinas</p><h3>Agua como arquitectura.</h3>
          <p>Privadas, comunitarias y municipales. Más de una decena de piscinas construidas o rehabilitadas en nuestro portafolio.</p>
          <a href="servicio-piscinas.html" class="link">Diseñar mi piscina</a>
        </article>
        <article class="service">
          <svg class="ico" viewBox="0 0 56 56" fill="none" stroke-width="1.6" aria-hidden="true"><path d="M8 48V22L28 8l20 14v26H8zM8 48h40" stroke="#0B4A3D"/><circle cx="28" cy="31" r="8" stroke="#2A8F80"/><path d="M28 26v10M23 31h10" stroke="#2A8F80"/></svg>
          <p class="label">Gestión de proyectos y Passivhaus</p><h3>Una casa que te cuida sola.</h3>
          <p>Coordinamos técnicos, licencias y gremios, y aplicamos criterios de máxima eficiencia energética.</p>
          <a href="servicio-gestion-proyectos.html" class="link">Cómo trabajamos</a>
        </article>
      </div>
    </div>
  </section>

  <section class="b2b" aria-labelledby="b2b-h">
    <div class="wrap">
      <div class="t"><p class="label f">Para empresas e inversores</p><h2 id="b2b-h">También construimos para quien invierte.</h2><p class="lead">El mismo rigor de plazos y presupuesto, aplicado a locales y promociones de vivienda.</p></div>
      <div class="links">
        <a href="servicio-locales-comerciales.html"><b>Locales comerciales</b><span>Tiendas, hostelería y franquicias</span></a>
        <a href="servicio-promocion-inmobiliaria.html"><b>Promoción inmobiliaria</b><span>Viviendas de obra nueva</span></a>
        <a href="inversores.html"><b>Inversores</b><span>Coinvierte con nosotros</span></a>
      </div>
    </div>
  </section>

  {METODO.replace('<p class="pledges-note">El precio solo cambia si tú decides cambiar el proyecto, y siempre con un anexo firmado antes de ejecutarlo.</p>', '<p class="pledges-note">El precio solo cambia si tú decides cambiar el proyecto, y siempre con un anexo firmado antes de ejecutarlo. <a href="nosotros.html#metodo" style="color:#7FCDBE;font-weight:700">Conoce cómo trabajamos →</a></p>')}
  {PH}
  <section class="section" id="proyectos" aria-labelledby="proj-h" style="padding-top:0">
    <div class="wrap">
      {head('Trabajos recientes', 'Cada casa cuenta <em>su propia historia.</em>', 'Reformas, viviendas, piscinas y locales que ya hemos entregado.')}
      <div class="work-grid three">{''.join(work_card(w) for w in recent)}</div>
      <p style="margin-top:48px"><a href="trabajos.html" class="btn btn-ghost">Ver los {len(WORKS)} trabajos <span class="arr" aria-hidden="true">→</span></a></p>
    </div>
  </section>
  {SOCIAL}
  {FAQ_HOME}
  {CONTACT_SECTION}
'''
page('index.html', 'Vacheron Projects', 'Diseñamos y construimos viviendas unifamiliares, reformas integrales y piscinas en toda España. Oficinas en Albacete y Alicante.', 'inicio', home, home=True)

# ======================================================================
# 2. NOSOTROS
# ======================================================================
OFFICES = '''<div class="offices2">
    <article><p class="label">Sede central</p><h3>Albacete</h3><p>Marqués de Villores, 34<br>02003 Albacete</p></article>
    <article><p class="label">Oficina</p><h3>Alicante</h3><p>Colón, 21<br>03001 Alicante</p></article>
  </div>'''
body = phero([('Nosotros', None)], 'Pocas casas a la vez. <em>Todas con nombre propio.</em>',
  'Somos promotora y constructora. Desde Albacete y Alicante diseñamos, construimos y gestionamos proyectos en toda España.',
  cta=[('Empezar mi proyecto', 'contacto.html', 'btn-primary')], label='Nosotros')
body += CREDS
body += f'''<section class="section"><div class="wrap split">
  <div class="a"><p class="label f">Nuestra historia</p><h2>Construir como nos gustaría que construyeran <em>nuestra propia casa.</em></h2></div>
  <div class="b prose"><p>Desde 2004 hemos acondicionado tiendas para marcas como Apple Premium Reseller, BodyBell o Marvimundo, construido y rehabilitado decenas de piscinas, levantado viviendas unifamiliares como Casa Kimun o Casa Córdoba y reformado por completo hogares en Alicante, Altea, Valencia y Albacete.</p>
  <p>Hoy somos también promotores: desarrollamos residenciales como Santa Fiora en Albacete o Residencial Ifach en Alicante, y hemos participado en proyectos pioneros como la piscina comunitaria del primer edificio residencial Passivhaus de Castilla-La Mancha.</p>
  <p>Quien invierte en su casa merece saber qué va a pagar, cuándo la va a recibir y con quién tiene que hablar. Por eso diseñamos y construimos con el mismo equipo.</p></div>
</div></section>
<section class="band section" id="metodo" aria-labelledby="met-h">{METODO.split('>', 1)[1]}
<section class="section"><div class="wrap split">
  <div class="a"><p class="label f">Dónde estamos</p><h2>Dos oficinas. <em>Proyectos en toda España.</em></h2></div>
  <div class="b">{OFFICES}<p class="prose"><a href="empleo.html" class="link">¿Quieres trabajar con nosotros? Ver empleo</a></p></div>
</div></section>
{cta_band('¿Hablamos de <em>tu casa?</em>')}'''
page('nosotros.html', 'Nosotros', 'Promotora y constructora con oficinas en Albacete y Alicante y proyectos en toda España desde 2004.', 'nosotros', body)

# ======================================================================
# 3. SERVICIOS
# ======================================================================
SVC = {
 'construccion': dict(photo=('casa-cordoba', 0),
   h1='Tu casa, de la parcela <em>a la llave.</em>',
   lead='Diseñamos y construimos viviendas unifamiliares y chalets llave en mano, con presupuesto cerrado y fecha de entrega por contrato.',
   intro=('Construir una casa no debería ser una carrera de obstáculos.', ['Estudiamos tu parcela, su orientación y su normativa antes de dibujar una sola línea. Después diseñamos contigo cada estancia y te entregamos un precio cerrado partida a partida.', 'Durante la obra tienes un único responsable y un informe semanal con fotos. Al final recibes las llaves de una casa eficiente, con aerotermia, fotovoltaica y climatización de alta eficiencia si así lo quieres.']),
   benefits=[('Llave en mano', 'Proyecto, licencias, obra y legalización. Tú decides; nosotros coordinamos todo lo demás.'), ('Diseño a medida', 'Ninguna casa se repite. Partimos de cómo vives y de lo que ofrece tu parcela.'), ('Eficiencia real', 'Aislamiento de alto rendimiento, aerotermia y energía solar para un consumo mínimo.')],
   includes=['Estudio de parcela y viabilidad', 'Anteproyecto y proyecto de ejecución', 'Gestión de licencias', 'Presupuesto cerrado partida a partida', 'Dirección y ejecución de obra', 'Certificación energética', 'Seguro decenal', 'Servicio posventa'],
   faq=[('¿Cuánto cuesta construir un chalet?', 'Depende de la parcela, la superficie y los acabados. En la fase de estimación te damos una horquilla realista y en la de proyecto un precio cerrado.'), ('¿Construís fuera de Albacete y Alicante?', 'Sí. Trabajamos en toda España con el mismo equipo y el mismo método.')],
   hash='construccion'),
 'reforma-integral': dict(photo=('casa-llum', 0),
   h1='Tu casa de siempre, <em>como nunca la habías vivido.</em>',
   lead='Reformas integrales: redistribución, luz, instalaciones y eficiencia, con un solo equipo y sin sorpresas en la factura.',
   intro=('Una reforma integral es casi una casa nueva.', ['Por eso la tratamos como tal: revisamos la vivienda existente, detectamos lo que no se ve y proponemos una distribución pensada para tu forma de vivir.', 'Renovamos instalaciones eléctricas y de fontanería, cambiamos carpinterías y climatización, y ejecutamos cocinas y baños desde cero, como en Casa Grades, Casa Llosa o Casa Llum.']),
   benefits=[('Sin gremios que coordinar', 'Un único responsable organiza albañilería, instalaciones, carpintería y acabados.'), ('Precio cerrado', 'Revisión previa para que el presupuesto refleje la realidad de tu casa, no una suposición.'), ('Más confort, menos gasto', 'Ventanas de altas prestaciones y climatización por zonas para ganar confort y ahorrar.')],
   includes=['Revisión y diagnóstico de la vivienda', 'Diseño de distribución e interiorismo', 'Licencias y permisos', 'Instalaciones nuevas', 'Carpinterías y aislamiento', 'Cocinas y baños a medida', 'Limpieza final de obra', 'Garantía posventa'],
   faq=[('¿Puedo vivir en casa durante la obra?', 'En una reforma integral no es recomendable. Te ayudamos a planificar el calendario para que el tiempo fuera de casa sea el mínimo.'), ('¿Y si aparece algo inesperado?', 'La revisión previa reduce las sorpresas. Si aparece algo, te lo explicamos con su coste antes de ejecutarlo.')],
   hash='reforma'),
 'piscinas': dict(photo=('piscina-desbordante-con-spa-jf', 0),
   h1='Agua <em>como arquitectura.</em>',
   lead='Piscinas privadas, comunitarias y municipales: construcción nueva y rehabilitación integral.',
   intro=('Una piscina bien diseñada se integra, no se añade.', ['Construimos piscinas desbordantes, irregulares, ecológicas o con spa, y rehabilitamos vasos antiguos con hormigón gunitado, nuevos revestimientos y escaleras más accesibles.', 'También trabajamos para promotoras: hemos ejecutado piscinas comunitarias como Mirabueno II en Córdoba o la del primer residencial Passivhaus de Castilla-La Mancha, en Albacete.']),
   benefits=[('Diseño integrado', 'Formas, coronaciones y playas que continúan la arquitectura de la casa.'), ('Rehabilitación', 'Devolvemos la vida a piscinas antiguas: gunitado, gresite, iluminación LED y accesibilidad.'), ('Equipamiento eficiente', 'Filtración con vidrio reciclado, electrólisis salina e iluminación LED.')],
   includes=['Diseño y proyecto', 'Licencias', 'Excavación y vaso de hormigón gunitado', 'Revestimientos vítreos', 'Filtración y depuración', 'Iluminación LED', 'Coronación y playa', 'Puesta en marcha'],
   faq=[('¿Hacéis piscinas comunitarias?', 'Sí, para comunidades y promotoras, como Mirabueno II en Córdoba o Imaginalia en Albacete.'), ('¿Rehabilitáis piscinas antiguas?', 'Sí. Es uno de nuestros trabajos más habituales: gunitado, revestimiento, coronación, escaleras e iluminación.')],
   hash='piscina'),
 'gestion-proyectos': dict(photo=('piscina-comunitaria-passivhaus', 0),
   h1='Tú decides. <em>Nosotros nos ocupamos de todo lo demás.</em>',
   lead='Gestión integral de proyectos y estándar Passivhaus: arquitectura, licencias, gremios, calendario y control de calidad con un único responsable.',
   intro=('Un proyecto bien gestionado se nota en el resultado y en tu tranquilidad.', ['Coordinamos a todos los agentes que intervienen en una obra: arquitectura, ingenierías, administración, proveedores y gremios.', 'Trabajamos también para promotoras de ámbito nacional, con el nivel de organización, control de calidad y cumplimiento de plazos que exigen.']),
   benefits=[('Un solo interlocutor', 'Tu responsable de proyecto, con nombre y teléfono, de principio a fin.'), ('Obra a la vista', 'Informe semanal con fotos, avance de calendario y estado del presupuesto.'), ('Passivhaus', 'Experiencia en el primer edificio residencial Passivhaus de Castilla-La Mancha.')],
   includes=['Planificación y calendario', 'Coordinación de técnicos y gremios', 'Control de presupuesto', 'Control de calidad', 'Cálculo energético', 'Ensayos de hermeticidad', 'Informes semanales', 'Recepción de obra'],
   faq=[('¿Gestionáis proyectos de otros arquitectos?', 'Sí. Podemos gestionar y construir el proyecto de tu arquitecto manteniendo presupuesto cerrado y plazo por contrato.'), ('¿Qué es una casa Passivhaus?', 'Una vivienda que necesita muy poca energía para mantenerse confortable gracias al aislamiento, la hermeticidad y la ventilación con recuperación de calor.')],
   hash=''),
 'locales-comerciales': dict(photo=('tienda-apple-premium-reseller-benotac', 0),
   h1='Locales que <em>venden por sí solos.</em>',
   lead='Reforma y acondicionamiento de tiendas, hostelería, clínicas y franquicias, con plazos ajustados a tu apertura.',
   intro=('Cada día de obra es un día sin facturar.', ['Hemos acondicionado locales para marcas como Apple Premium Reseller, BodyBell, Marvimundo, NUX u Orange, siempre a partir de su identidad corporativa y en distintas ciudades de España.', 'Nos encargamos de albañilería, instalaciones, climatización, iluminación y revestimientos para que abras sin preocupaciones.']),
   benefits=[('Fecha de apertura', 'Calendario cerrado y coordinado con tu plan de lanzamiento.'), ('Identidad de marca', 'Aplicamos el manual de la marca y lo replicamos en cada local.'), ('Experiencia', 'Comercio, hostelería, farmacia, clínica, peluquería y cultura.')],
   includes=['Diseño de interiorismo comercial', 'Licencia de actividad', 'Instalaciones y climatización', 'Accesibilidad y normativa', 'Fachada y escaparate', 'Mobiliario a medida', 'Iluminación', 'Entrega lista para abrir'],
   faq=[('¿Trabajáis con franquicias?', 'Sí. Adaptamos el manual de la marca a cada local, como hicimos con BodyBell, NUX o Marvimundo.'), ('¿Trabajáis fuera de Albacete?', 'Sí, hemos acondicionado locales en Albacete, Alicante, Benidorm, Almansa, Cuenca, Murcia, Valencia y Granada.')],
   hash=''),
 'promocion-inmobiliaria': dict(photo=None,
   h1='Viviendas de obra nueva <em>para vivir y para invertir.</em>',
   lead='Promovemos y construimos residenciales de pocas viviendas, cuidados al detalle y en barrios con vida.',
   intro=('Promociones pequeñas, cuidadas y eficientes.', ['Buscamos suelo, diseñamos y construimos promociones de pocas viviendas, con la misma exigencia de calidad que una casa a medida, como Residencial Santa Fiora en Albacete.', 'Ahora mismo comercializamos Residencial Ifach, en el barrio de San Agustín de Alicante.']),
   benefits=[('Personalización', 'En Santa Fiora los propietarios eligieron todos los revestimientos; en Ifach, el programa Customize.'), ('Eficiencia energética', 'Aerotermia, aislamiento y carpinterías con rotura de puente térmico.'), ('Zonas comunes', 'Piscina, solárium, jardín y club social en nuestras promociones.')],
   includes=['Búsqueda y análisis de suelo', 'Estudio de viabilidad', 'Diseño y proyecto', 'Construcción', 'Comercialización', 'Personalización de acabados', 'Entrega y posventa', 'Información a inversores'],
   faq=[('¿Tenéis promociones a la venta?', 'Sí: Residencial Ifach, en calle Calpe 18, Alicante. Consulta las viviendas disponibles.'), ('¿Puedo invertir en una promoción?', 'Sí. Consulta la sección de inversores o contacta con nosotros.')],
   hash=''),
}

def svc_photo(slug, cls=''):
    d = SVC[slug]
    if d['photo'] is None:
        return ifimg('fachada', 'Residencial Ifach, Alicante', cls, lazy=False)
    w = BY[d['photo'][0]]
    return img(w['fotos'][d['photo'][1]], w['title'], cls, lazy=False)

def svc_works(slug):
    cat = {v: k for k, v in CAT_SERVICE.items()}[slug]
    return [w for w in WORKS if cat in w['cats']]

for slug, name, group, short in SERVICES:
    d = SVC[slug]
    body = phero([('Servicios', 'servicios.html'), (name, None)], d['h1'], d['lead'],
                 cta=[('Pedir información', 'contacto.html' + ('#' + d['hash'] if d['hash'] else ''), 'btn-primary')],
                 image=svc_photo(slug), label=name)
    t, ps = d['intro']
    body += f'''<section class="section"><div class="wrap split"><div class="a"><p class="label f">Cómo lo hacemos</p><h2>{t}</h2></div><div class="b prose">{''.join(f'<p>{p}</p>' for p in ps)}</div></div></section>'''
    if slug == 'promocion-inmobiliaria':
        body += f'''<section class="section" style="padding-top:0"><div class="wrap promo-band">
      <a class="promo-img" href="promocion-residencial-ifach.html">{ifimg('fachada', 'Residencial Ifach')}<span class="badge">En venta</span></a>
      <div class="promo-text"><p class="label f">En comercialización</p><h2>Residencial Ifach</h2><p class="lead">12 viviendas en San Agustín, Alicante. Estudios y pisos de 2 y 3 dormitorios con garaje y trastero.</p><p class="price"><span>Desde</span> 230.000 €</p><div class="ctas"><a href="promocion-residencial-ifach.html" class="btn btn-primary">Ver la promoción <span class="arr" aria-hidden="true">→</span></a></div></div>
    </div></section>'''
    body += f'''<section class="section" style="padding-top:0"><div class="wrap">{head('Lo que ganas', 'Por qué elegir <em>Vacheron.</em>')}
<div class="benefits">{''.join(f'<div class="benefit"><h3>{a}</h3><p>{b}</p></div>' for a, b in d['benefits'])}</div></div></section>
<section class="section" style="padding-top:0"><div class="wrap split"><div class="a"><p class="label f">Qué incluye</p><h2>Todo, <em>en un solo contrato.</em></h2><p class="lead">Sin partidas sorpresa ni gremios que coordinar por tu cuenta.</p></div>
<div class="b"><ul class="checklist">{''.join(f'<li>{i}</li>' for i in d['includes'])}</ul></div></div></section>'''
    ws = svc_works(slug)
    if ws:
        body += f'''<section class="section" style="padding-top:0"><div class="wrap">{head('Trabajos de ' + name.lower(), f'{len(ws)} proyectos <em>ya entregados.</em>')}
<div class="work-grid three">{''.join(work_card(w) for w in ws[:6])}</div>
<p style="margin-top:40px"><a href="trabajos.html#{[k for k, v in CAT_SERVICE.items() if v == slug][0]}" class="btn btn-ghost">Ver todos <span class="arr" aria-hidden="true">→</span></a></p></div></section>'''
    body += f'''<section class="section"><div class="wrap faq"><div class="faq-head"><p class="label f">Preguntas frecuentes</p><h2>Lo que nos <em>preguntan.</em></h2></div><div class="faq-list">{faq(d['faq'])}</div></div></section>'''
    if slug == 'promocion-inmobiliaria':
        body += cta_band('¿Buscas vivienda o <em>quieres invertir?</em>', ('Ver Residencial Ifach', 'promocion-residencial-ifach.html'), ('Área de inversores', 'inversores.html'))
    else:
        body += cta_band('Cuéntanos <em>qué imaginas.</em>', ('Empezar mi proyecto', 'contacto.html' + ('#' + d['hash'] if d['hash'] else '')), ('Ver trabajos', 'trabajos.html'))
    page(f'servicio-{slug}.html', name, d['lead'], 'servicios', body)

def svc_card(slug, name):
    d = SVC[slug]
    return f'<a class="svc-card" href="servicio-{slug}.html"><div class="img">{svc_photo(slug)}</div><h3>{name}</h3><p>{d["lead"]}</p><em>Ver servicio →</em></a>'

body = phero([('Servicios', None)], 'Un solo equipo para <em>todo tu proyecto.</em>',
  'Diseñamos, construimos y gestionamos. Para particulares que quieren la casa de su vida y para empresas e inversores que buscan rigor en plazo y presupuesto.',
  cta=[('Empezar mi proyecto', 'contacto.html', 'btn-primary')], label='Servicios')
body += f'''<section class="section" style="padding-top:clamp(24px,3vw,40px)"><div class="wrap">
<div class="svc-group">{head('Para tu hogar', 'La casa que <em>imaginas.</em>')}<div class="svc-cards two">{''.join(svc_card(s, n) for s, n, g_, d in SERVICES if g_ == 'hogar')}</div></div>
<div class="svc-group">{head('Para empresas e inversores', 'Espacios que <em>generan valor.</em>')}<div class="svc-cards two">{''.join(svc_card(s, n) for s, n, g_, d in SERVICES if g_ == 'empresa')}</div></div>
</div></section>
{cta_band('¿No sabes por dónde <em>empezar?</em>', ('Hablemos', 'contacto.html'), ('Ver trabajos', 'trabajos.html'))}'''
page('servicios.html', 'Servicios', 'Construcción, reformas integrales, piscinas, gestión de proyectos, locales comerciales y promoción inmobiliaria.', 'servicios', body)

# ======================================================================
# 4. TRABAJOS + FICHAS
# ======================================================================
counts = {k: sum(1 for w in WORKS if k in w['cats']) for k in CATS}
filters = f'<button aria-pressed="true" data-f="all">Todos <span>{len(WORKS)}</span></button>' + ''.join(
    f'<button aria-pressed="false" data-f="{k}">{v} <span>{counts[k]}</span></button>' for k, v in CATS.items() if counts[k])
body = phero([('Trabajos', None)], 'Cada proyecto cuenta <em>su propia historia.</em>',
  f'{len(WORKS)} trabajos desde 2004: viviendas, reformas integrales, piscinas, locales comerciales y promociones.', label='Trabajos')
body += f'''<section class="section" style="padding-top:clamp(16px,2vw,24px)"><div class="wrap">
<div class="filters" role="group" aria-label="Filtrar trabajos">{filters}</div>
<div class="work-grid three">{''.join(work_card(w, lazy=i > 5) for i, w in enumerate(WORKS))}</div>
</div></section>
{cta_band('¿Será tu casa <em>el próximo trabajo?</em>', ('Empezar mi proyecto', 'contacto.html'), None)}'''
page('trabajos.html', 'Trabajos', 'Portafolio de Vacheron Projects: viviendas, reformas integrales, piscinas, locales comerciales y promociones.', 'trabajos', body)

for w in WORKS:
    if w['slug'] == 'residencial-ifach':
        continue
    cat = w['cats'][0] if w['cats'] else None
    facts = [('Ubicación', w['loc']), ('Año', w['year']), ('Superficie', w['size']), ('Servicio', CATS.get(cat, ''))]
    facts = [(a, b) for a, b in facts if b]
    related = [o for o in WORKS if o is not w and cat in o['cats']][:3]
    text = ''.join(f'<h2>{t}</h2>' if k == 'h2' else f'<p>{t}</p>' for k, t in w['body'])
    svc_link = f'<p style="margin-top:28px"><a href="servicio-{CAT_SERVICE[cat]}.html" class="link">Ver el servicio de {CATS[cat].lower()}</a></p>' if cat else ''
    body = phero([('Trabajos', 'trabajos.html'), (w['title'], None)], w['title'], w['summary'], label=work_meta(w),
                 image=img(w['cover'], w['title'], 'pimg', lazy=False) if w['cover'] else None)
    body += f'''<section style="margin-top:clamp(32px,4vw,48px)"><div class="wrap"><dl class="facts n{len(facts)}">{''.join(f'<div><dt>{a}</dt><dd>{b}</dd></div>' for a, b in facts)}</dl></div></section>
<section class="section"><div class="wrap split"><div class="a"><p class="label f">El proyecto</p><h2>{w['title']}</h2>{svc_link}</div><div class="b prose article-body">{text}</div></div></section>'''
    rest = [f for f in w['fotos'] if f is not w['cover']]
    if rest:
        body += f'<section class="section" style="padding-top:0"><div class="wrap">{head("Galería", f"{len(rest)} fotos <em>del trabajo.</em>", "Pulsa en una foto para verla a pantalla completa.")}{gallery(rest, w["title"])}</div></section>'
    body += cta_band(f'¿Un proyecto como {w["title"]}? <em>Hablemos.</em>', ('Empezar mi proyecto', 'contacto.html'), None)
    if related:
        body += f'''<section class="section"><div class="wrap">{head('Otros trabajos', 'Sigue <em>explorando.</em>')}<div class="work-grid three">{''.join(work_card(o) for o in related)}</div></div></section>'''
    page(w['url'], w['title'], w['summary'], 'trabajos', body)

# ======================================================================
# 5. RESIDENCIAL IFACH (promoción en venta)
# ======================================================================
UNITS = [
  dict(n='02', planta='Planta baja', dorm=2, m2='65', util='44,55', constr='50,29', zz='64,63', precio='230.000 €', plano='plano-vivienda-02'),
  dict(n='05', planta='Planta primera', dorm=2, m2='69', util='46,65', constr='53,48', zz='68,73', precio='237.000 €', plano='plano-vivienda-05'),
]
CALIDADES = [
  ('Edificio y zonas comunes', ['Piscina, solárium, jardín y club social', 'Zonas exteriores con gres antideslizante', 'Alumbrado con detectores de presencia', 'Ascensor con acceso directo desde el garaje']),
  ('Vivienda', ['Tarima vinílica imitación madera', 'Pintura plástica lisa en tonos claros', 'Falso techo continuo en vestíbulo, salón y pasillo', 'Iluminación LED']),
  ('Cocina', ['Entregada amueblada, muebles altos y bajos', 'Placa de inducción, horno y microondas integrados', 'Encimera y frente de cuarzo compacto o similar', 'Fregadero bajo encimera de acero inoxidable']),
  ('Baños', ['Gres porcelánico en suelo y paredes', 'Mueble suspendido con seno integrado', 'Plato de ducha con grifería termostática', 'Sanitarios blancos de diseño contemporáneo']),
  ('Carpintería', ['Puerta de acceso blindada', 'Puertas interiores lacadas en blanco', 'Armarios empotrados con maletero y barra', 'Tabiquería seca sin puentes acústicos']),
  ('Instalaciones', ['Aerotermia para agua caliente sanitaria', 'Aire acondicionado frío-calor por conductos', 'Ventilación conforme al Código Técnico', 'Videoportero automático']),
  ('Envolvente', ['Fachada con cámara y aislamiento térmico y acústico', 'Carpintería de PVC o aluminio con rotura de puente térmico', 'Doble acristalamiento con cámara', 'Persianas de aluminio con aislamiento inyectado']),
  ('Garaje y trastero', ['Plaza de garaje y trastero incluidos', 'Puerta automática con mando a distancia', 'Preinstalación para recarga de vehículo eléctrico', 'Trasteros con puerta metálica']),
]
CUSTOMIZE = ['Ósmosis inversa', 'Bañera en lugar de ducha', 'Mamparas en ambos baños', 'Puerta acorazada', 'Cajoneras en armarios', 'Persianas motorizadas', 'Persianas autoblocantes']

units_html = ''.join(f'''<article class="unit">
  <a href="{IF}{u['plano']}.jpg" class="unit-plan" data-lb="Vivienda {u['n']} · plano">{ifimg(u['plano'], f"Plano de la vivienda {u['n']}")}</a>
  <div class="unit-info">
    <p class="label">{u['planta']} · Exterior</p>
    <h3>Vivienda {u['n']}</h3>
    <p class="price">{u['precio']}</p>
    <dl class="ficha"><div><dt>Dormitorios</dt><dd>{u['dorm']}</dd></div><div><dt>Superficie</dt><dd>{u['m2']} m²</dd></div><div><dt>Útil</dt><dd>{u['util']} m²</dd></div><div><dt>Construida</dt><dd>{u['constr']} m²</dd></div></dl>
    <p class="note">Construida con zonas comunes: {u['zz']} m². Garaje incluido en el precio.</p>
    <a href="#ifach-form" class="btn btn-primary" data-unit="Vivienda {u['n']}">Me interesa esta vivienda</a>
  </div>
</article>''' for u in UNITS)

ifach_gallery = ''.join(f'<a href="{IF}{n}.jpg" class="gi" data-lb="Residencial Ifach · {c}">{ifimg(n, f"Residencial Ifach, {c.lower()}")}</a>' for n, c in [
  ('acceso', 'Acceso y portal'), ('piscina', 'Piscina comunitaria'), ('salon', 'Salón comedor cocina'), ('solarium', 'Solárium'),
  ('dormitorio', 'Dormitorio principal'), ('cocina', 'Cocina'), ('salon-2', 'Salón'), ('bano', 'Baño principal'), ('zonas-comunes', 'Zonas comunes')])

body = phero([('Servicios', 'servicios.html'), ('Promoción inmobiliaria', 'servicio-promocion-inmobiliaria.html'), ('Residencial Ifach', None)],
  'Residencial Ifach', 'Solo 12 viviendas en el barrio de San Agustín, Alicante: estudios y pisos de 2 y 3 dormitorios, todos con plaza de garaje y trastero privado incluidos.',
  cta=[('Solicitar información', '#ifach-form', 'btn-primary'), ('WhatsApp', WA, 'btn-ghost')],
  image=ifimg('fachada', 'Fachada de Residencial Ifach, calle Calpe 18', 'pimg', lazy=False), label='Promoción en venta · Calle Calpe, 18 · Alicante')
body += f'''<section style="margin-top:clamp(32px,4vw,48px)"><div class="wrap"><dl class="facts n6">
<div><dt>Precio</dt><dd class="ok">Desde 230.000 €</dd></div><div><dt>Viviendas</dt><dd>12</dd></div><div><dt>Tipologías</dt><dd>Estudios, 2 y 3 dorm.</dd></div>
<div><dt>Incluido</dt><dd>Garaje y trastero</dd></div><div><dt>Zonas comunes</dt><dd>Piscina y club social</dd></div><div><dt>Energía</dt><dd>Aerotermia</dd></div></dl></div></section>
<section class="section"><div class="wrap split">
  <div class="a"><p class="label f">El proyecto</p><h2>Diseño contemporáneo <em>que enamora.</em></h2></div>
  <div class="b prose"><p>Inspirada en el emblemático Peñón de Ifach, la promoción refleja solidez, estilo y una forma de vida mediterránea. Las viviendas se han concebido para ofrecer el máximo confort y aprovechar cada metro cuadrado: espacios amplios, luminosos y bien distribuidos, con cocina, salón y comedor conectados.</p>
  <p>La fachada combina cerrajería metálica vertical y una paleta de tonos antracita, beige y blanco que se integra con el entorno urbano del barrio. Un residencial de tamaño perfecto, con comunidad reducida y servicios que realmente se usan.</p></div>
</div></section>
<section class="section" style="padding-top:0" id="viviendas"><div class="wrap">{head('Viviendas disponibles', 'Elige <em>tu vivienda.</em>', 'Precios con plaza de garaje incluida. Pulsa en el plano para ampliarlo.')}<div class="units">{units_html}</div>
<p class="note" style="margin-top:20px">Consulta también la disponibilidad de estudios y viviendas de 3 dormitorios.</p></div></section>
<section class="section" style="padding-top:0"><div class="wrap">{head('Galería', 'Así será <em>tu nuevo hogar.</em>')}<div class="masonry">{ifach_gallery}</div></div></section>
<section class="section" style="padding-top:0"><div class="wrap split">
  <div class="a"><p class="label f">Ubicación</p><h2>San Agustín: la calma de un barrio, <em>la comodidad de una ciudad.</em></h2>
  <p class="lead">Un barrio consolidado, bien comunicado con el centro de Alicante y con todos los servicios cerca.</p>
  <ul class="checklist" style="grid-template-columns:1fr"><li>Colegios públicos, concertados y privados</li><li>Centro Comercial Isla de Corfú: supermercados, restaurantes, tiendas y gimnasio</li><li>Centro de salud, parques e instalaciones deportivas</li><li>Tranvía y tren a pocos minutos</li><li>Playa y centro de Alicante muy cerca</li></ul></div>
  <div class="b"><a href="{IF}mapa.jpg" class="gi map" data-lb="Residencial Ifach · ubicación">{ifimg('mapa', 'Mapa de ubicación de Residencial Ifach y la oficina de venta')}</a><p class="note">Promoción: calle Calpe, 18 · Oficina de venta: calle Colón, 21.</p></div>
</div></section>
<section class="section" style="padding-top:0"><div class="wrap">{head('Memoria de calidades', 'Calidades pensadas <em>para el día a día.</em>')}
<div class="quals">{''.join(f'<div class="qual"><h3>{t}</h3><ul>{"".join(f"<li>{i}</li>" for i in items)}</ul></div>' for t, items in CALIDADES)}</div>
<div class="customize"><div><p class="label f">Programa Customize</p><h3>Hazla todavía más tuya.</h3><p>Mejoras y equipamientos opcionales para tu vivienda:</p></div><ul class="chips-list">{''.join(f'<li>{c}</li>' for c in CUSTOMIZE)}</ul></div>
</div></section>
<section class="section" style="padding-top:0"><div class="wrap split">
  <div class="a"><p class="label f">Equipo</p><h2>Quién está <em>detrás.</em></h2></div>
  <div class="b"><div class="offices2"><article><p class="label">Promotora y constructora</p><h3>Vacheron Projects</h3><p>Promotora con una sólida trayectoria, enfoque innovador y compromiso con la calidad en cada proyecto.</p></article>
  <article><p class="label">Arquitectura</p><h3>ARRB</h3><p>Estudio de arquitectura con visión contemporánea, capaz de integrar funcionalidad y diseño.</p></article></div></div>
</div></section>
<section class="section contact" id="ifach-form"><div class="wrap contact-grid">
  <div class="contact-intro"><p class="label f">Residencial Ifach</p><h2>Reserva tu <em>visita.</em></h2>
    <p class="lead">Ven a conocernos a la oficina de venta o pide información y te enviamos el dossier completo.</p>
    <div class="direct">
      <div><span class="label">Oficina de venta</span><b>Calle Colón, 21 · Alicante</b></div>
      <div><span class="label">Cita previa</span><b>628 06 05 60 · 608 58 37 66</b></div>
      <div><span class="label">Email</span><b>desarrollosinmobiliarios@vacheronprojects.com</b></div>
      <div><a class="link" style="justify-self:start;color:#7FCDBE;border-color:#7FCDBE" href="{WA}" target="_blank" rel="noopener">Escribir por WhatsApp →</a></div>
    </div>
  </div>
  <form class="form simple-form" data-simple novalidate style="background:var(--bg)">
    <legend style="margin-bottom:0">Quiero información de Residencial Ifach</legend>
    <div class="q"><span>¿Qué buscas?</span><div class="chips">
      <label class="chip"><input type="radio" name="tip" id="u02" value="Vivienda 02"><span>Vivienda 02 · 230.000 €</span></label>
      <label class="chip"><input type="radio" name="tip" id="u05" value="Vivienda 05"><span>Vivienda 05 · 237.000 €</span></label>
      <label class="chip"><input type="radio" name="tip" id="u-est" value="Estudio"><span>Estudio</span></label>
      <label class="chip"><input type="radio" name="tip" id="u-3d" value="3 dormitorios"><span>3 dormitorios</span></label></div></div>
    <div class="row2"><div class="field"><label for="if-nombre">Nombre</label><input id="if-nombre" data-req autocomplete="name"></div><div class="field"><label for="if-tel">Teléfono</label><input id="if-tel" data-req autocomplete="tel"></div></div>
    <div class="field"><label for="if-email">Email</label><input id="if-email" type="email" autocomplete="email"></div>
    <div class="field"><label for="if-msg">Mensaje (opcional)</label><textarea id="if-msg" placeholder="Por ejemplo: me gustaría visitar la oficina de venta el sábado"></textarea></div>
    <p class="err" hidden>Necesitamos tu nombre y un teléfono para llamarte.</p>
    <button type="submit" class="btn btn-primary" style="justify-self:start">Solicitar información <span class="arr" aria-hidden="true">→</span></button>
    <div class="ok-msg" hidden><p class="label f">Solicitud preparada</p><h3 style="font-size:1.8rem">Gracias.</h3><p style="color:var(--muted)">El equipo comercial te contactará para enviarte el dossier y concertar tu visita.</p><p class="note">Prototipo: en esta versión el formulario no envía datos.</p></div>
  </form>
</div></section>
<section><div class="wrap"><p class="disclaimer" style="margin-block:40px">Imágenes no contractuales y meramente ilustrativas, sujetas a modificaciones de orden técnico, jurídico o comercial de la dirección facultativa o autoridad competente. Las infografías de fachadas, elementos comunes y restantes espacios son orientativas. El mobiliario de las infografías interiores no está incluido y el equipamiento de las viviendas será el indicado en la memoria de calidades. Las superficies son aproximadas y pueden variar por razones técnicas, legales o administrativas.</p></div></section>'''
page('promocion-residencial-ifach.html', 'Residencial Ifach', 'Residencial Ifach, calle Calpe 18, San Agustín (Alicante): 12 viviendas con garaje, trastero y piscina desde 230.000 €.', 'servicios', body)

# ======================================================================
# 6. NOTICIAS
# ======================================================================
NEWS = [
  ('Cuánto cuesta construir una vivienda unifamiliar en 2026', 'Guías', 'Los factores que de verdad mueven el precio de una casa y cómo evitar sorpresas.', img(BY['casa-kimun']['fotos'][1], 'Casa Kimun')),
  ('Residencial Ifach: 12 viviendas en San Agustín, Alicante', 'Promociones', 'Abrimos la comercialización de nuestra nueva promoción en calle Calpe 18.', ifimg('piscina', 'Residencial Ifach, piscina')),
  ('Reforma integral: siete decisiones antes de empezar', 'Guías', 'Distribución, instalaciones, ventanas… lo que conviene decidir antes de pedir presupuesto.', img(BY['casa-llosa']['fotos'][0], 'Casa Llosa')),
  ('Passivhaus explicado sin tecnicismos', 'Eficiencia', 'Qué es, cuánto ahorra y por qué cada vez más familias lo eligen.', img(BY['piscina-comunitaria-passivhaus']['fotos'][1], 'Piscina comunitaria Passivhaus')),
]
cards = ''
for i, (t, cat, ex, im_) in enumerate(NEWS):
    link = 'promocion-residencial-ifach.html' if cat == 'Promociones' else 'noticia.html'
    if i == 0:
        cards += f'<a href="{link}" class="featured"><div class="img">{im_}</div><div><p class="label">{cat} · Ejemplo</p><h3>{t}</h3><p>{ex}</p><p class="meta">Lectura de 5 min</p></div></a>'
    else:
        cards += f'<a href="{link}"><div class="img">{im_}</div><p class="label">{cat}{"" if cat == "Promociones" else " · Ejemplo"}</p><h3>{t}</h3><p>{ex}</p><p class="meta">Lectura de 4 min</p></a>'
body = phero([('Noticias', None)], 'Obras, ideas <em>y eficiencia.</em>', 'Novedades del estudio, promociones y guías para decidir mejor antes de construir o reformar.', label='Noticias')
body += f'<section class="section" style="padding-top:clamp(16px,2vw,24px)"><div class="wrap"><div class="news">{cards}</div></div></section>'
body += '''<section class="section social-sec" style="padding-block:clamp(56px,7vw,96px)"><div class="wrap split"><div class="a"><p class="label f">Síguenos</p><h2>Cada semana, <em>en redes.</em></h2></div><div class="b"><p class="lead">Avances de obra, detalles constructivos y entregas de llaves.</p><div class="socials" data-socials></div></div></div></section>'''
page('noticias.html', 'Noticias', 'Novedades, promociones y guías sobre construcción, reformas y eficiencia energética.', 'noticias', body)

body = phero([('Noticias', 'noticias.html'), ('Guías', None)], 'Cuánto cuesta construir una vivienda unifamiliar <em>en 2026.</em>',
  'Los factores que de verdad mueven el precio de una casa y cómo llegar a un presupuesto cerrado sin sorpresas.', image=img(BY['casa-kimun']['fotos'][1], 'Casa Kimun', 'pimg', lazy=False), label='Guías · Ejemplo de artículo')
body += '''<section class="section"><div class="wrap"><article class="article prose">
<p>Es la primera pregunta que nos hace casi todo el mundo, y la respuesta honesta es que depende. Pero depende de factores concretos que se pueden conocer y controlar desde el principio.</p>
<h2>1. La parcela</h2><p>La topografía, el tipo de terreno y los accesos influyen en la cimentación y en los movimientos de tierra. Un estudio geotécnico al inicio evita sorpresas posteriores.</p>
<h2>2. La superficie y la forma</h2><p>No solo cuentan los metros cuadrados: una casa compacta es más eficiente y económica que una con muchos quiebros, voladizos o niveles.</p>
<h2>3. Los acabados</h2><p>Carpinterías, revestimientos, cocina y baños pueden hacer variar el presupuesto de forma importante. Por eso los elegimos contigo antes de cerrar el precio.</p>
<h2>4. La eficiencia energética</h2><p>Aerotermia, fotovoltaica y un buen aislamiento suponen una inversión inicial que se recupera en el uso, como en Casa Kimun.</p>
<h2>Cómo evitar sorpresas</h2><ul><li>Pide un presupuesto partida a partida, no una cifra por metro cuadrado.</li><li>Asegúrate de que el contrato fija precio y plazo.</li><li>Ten un único interlocutor responsable de la obra.</li></ul>
<p>Si quieres una horquilla realista para tu caso, cuéntanos tu proyecto y te la preparamos sin compromiso.</p>
<p><a href="contacto.html#construccion" class="btn btn-primary" style="margin-top:12px">Pedir una estimación <span class="arr" aria-hidden="true">→</span></a></p>
</article></div></section>'''
page('noticia.html', 'Cuánto cuesta construir una vivienda unifamiliar en 2026', 'Factores que determinan el precio de una vivienda unifamiliar y cómo conseguir un presupuesto cerrado.', 'noticias', body)

# ======================================================================
# 7. INVERSORES
# ======================================================================
body = phero([('Inversores', None)], 'Invertir en vivienda <em>bien construida.</em>',
  'Promovemos residenciales de pocas viviendas con control total del proceso: suelo, diseño, construcción y venta, bajo un mismo equipo.',
  cta=[('Contactar como inversor', '#inv-form', 'btn-primary')], image=ifimg('solarium', 'Residencial Ifach, solárium', 'pimg', lazy=False), label='Inversores')
body += f'''<section class="section"><div class="wrap">{head('Por qué Vacheron', 'Control del proceso, <em>de principio a fin.</em>', 'Como promotores y constructores a la vez, controlamos los dos riesgos que más afectan a una promoción: el coste y el plazo.')}
<div class="benefits"><div class="benefit"><h3>Promotor y constructor</h3><p>Sin márgenes intermedios ni dependencia de constructoras externas.</p></div><div class="benefit"><h3>Trayectoria</h3><p>Desde 2004 en construcción, y promociones como Santa Fiora (Albacete) y Residencial Ifach (Alicante).</p></div><div class="benefit"><h3>Transparencia</h3><p>Información periódica del avance de obra, costes y comercialización.</p></div></div></div></section>
<section class="section" style="padding-top:0"><div class="wrap promo-band">
  <a class="promo-img" href="promocion-residencial-ifach.html">{ifimg('fachada', 'Residencial Ifach')}<span class="badge">En venta</span></a>
  <div class="promo-text"><p class="label f">Promoción en curso</p><h2>Residencial Ifach</h2><p class="lead">12 viviendas en San Agustín, Alicante, con zonas comunes y aerotermia.</p><div class="ctas"><a href="promocion-residencial-ifach.html" class="btn btn-ghost">Ver la promoción <span class="arr" aria-hidden="true">→</span></a></div></div>
</div></section>
<section class="section" style="padding-top:0"><div class="wrap">{head('Cómo trabajamos con inversores', 'Un proceso claro <em>y documentado.</em>')}
<ol class="mini-steps"><li><span class="n">PASO 1</span><h3>Suelo</h3><p>Identificamos y analizamos suelos con potencial.</p></li><li><span class="n">PASO 2</span><h3>Viabilidad</h3><p>Estudio técnico, económico y comercial de cada promoción.</p></li><li><span class="n">PASO 3</span><h3>Estructura</h3><p>Vehículo de inversión y acuerdos definidos por escrito.</p></li><li><span class="n">PASO 4</span><h3>Seguimiento</h3><p>Informes periódicos hasta la venta de la última vivienda.</p></li></ol></div></section>
<section class="section" style="padding-top:0"><div class="wrap split" id="inv-form">
  <div class="a"><p class="label f">Área de inversores</p><h2>Hablemos de <em>la próxima promoción.</em></h2><p class="lead">Déjanos tus datos y te enviaremos información de las oportunidades en estudio.</p></div>
  <div class="b"><form class="simple-form" data-simple novalidate>
    <div class="row2"><div class="field"><label for="inv-nombre">Nombre</label><input id="inv-nombre" data-req autocomplete="name"></div><div class="field"><label for="inv-email">Email</label><input id="inv-email" type="email" data-req autocomplete="email"></div></div>
    <div class="field"><label for="inv-tel">Teléfono</label><input id="inv-tel" autocomplete="tel"></div>
    <div class="q"><span>Perfil</span><div class="chips"><label class="chip"><input type="radio" name="perfil" id="p1"><span>Particular</span></label><label class="chip"><input type="radio" name="perfil" id="p2"><span>Family office</span></label><label class="chip"><input type="radio" name="perfil" id="p3"><span>Empresa</span></label><label class="chip"><input type="radio" name="perfil" id="p4"><span>Propietario de suelo</span></label></div></div>
    <div class="field"><label for="inv-msg">Mensaje (opcional)</label><textarea id="inv-msg"></textarea></div>
    <p class="err" hidden>Necesitamos tu nombre y email.</p>
    <button type="submit" class="btn btn-primary" style="justify-self:start">Solicitar información <span class="arr" aria-hidden="true">→</span></button>
    <div class="ok-msg" hidden><p class="label f">Solicitud preparada</p><h3 style="font-size:1.8rem">Gracias.</h3><p style="color:var(--muted)">Te contactaremos para presentarte las oportunidades en estudio.</p><p class="note">Prototipo: en esta versión el formulario no envía datos.</p></div>
  </form></div>
</div>
<div class="wrap"><p class="disclaimer" style="margin-top:48px">La información de esta página tiene carácter informativo y no constituye una oferta de inversión ni una recomendación. Toda inversión inmobiliaria conlleva riesgos, incluida la posible pérdida del capital invertido. Las condiciones de cada operación se detallan en su documentación específica.</p></div>
</section>'''
page('inversores.html', 'Inversores', 'Coinversión en promociones residenciales con Vacheron Projects.', 'inversores', body)

# ======================================================================
# 8. CONTACTO
# ======================================================================
contact = CONTACT_SECTION.replace('aria-labelledby="ct-h"', 'aria-labelledby="ct-h" style="padding-top:clamp(56px,7vw,96px)"', 1)
contact = contact.replace('<h2 id="ct-h">Cuéntanos <em>qué imaginas.</em></h2>', '<h1 id="ct-h" style="font-size:var(--s-h2)">Cuéntanos <em>qué imaginas.</em></h1>')
contact = contact.replace('<p class="label f">Empezar mi proyecto</p>', '<nav class="crumbs" aria-label="Ruta" style="margin-bottom:0"><a href="index.html" style="color:var(--band-muted)">Inicio</a><span aria-hidden="true">/</span><span>Contacto</span></nav><p class="label f">Empezar mi proyecto</p>')
body = contact + f'''<section class="section"><div class="wrap split">
  <div class="a"><p class="label f">Oficinas</p><h2>Ven a <em>conocernos.</em></h2><p class="lead">Trabajamos en toda España. Si estás lejos, la primera conversación puede ser por videollamada.</p></div>
  <div class="b"><div class="offices2">
    <article><p class="label">Sede central</p><h3>Albacete</h3><p>Marqués de Villores, 34<br>02003 Albacete</p><p><b>967 50 25 44</b><br>Fax 967 50 30 69</p><p><b>info@vacheronprojects.com</b></p></article>
    <article><p class="label">Oficina y venta de Residencial Ifach</p><h3>Alicante</h3><p>Colón, 21<br>03001 Alicante</p><p><b>628 06 05 60 · 608 58 37 66</b></p><p><a class="link" href="{WA}" target="_blank" rel="noopener">Escribir por WhatsApp</a></p></article>
  </div><p class="note">Lunes a viernes · 9:00–19:00. Visitas con cita previa.</p></div>
</div></section>'''
page('contacto.html', 'Contacto', 'Cuéntanos tu proyecto. Oficinas en Albacete (Marqués de Villores, 34) y Alicante (Colón, 21).', 'contacto', body)

# ======================================================================
# 9. EMPLEO
# ======================================================================
JOBS = [('Jefe/a de obra', 'Albacete · Jornada completa', 'Dirección de obras de vivienda unifamiliar y reforma.'),
        ('Arquitecto/a técnico/a', 'Alicante · Jornada completa', 'Mediciones, presupuestos y control de calidad.'),
        ('Oficial de primera', 'Albacete y Alicante', 'Albañilería y acabados de calidad.')]
body = phero([('Empleo', None)], 'Construye casas <em>de las que estar orgulloso.</em>',
  'Buscamos personas exigentes con su trabajo, que disfruten haciendo las cosas bien y cuidando a cada cliente.', label='Empleo')
body += f'''<section class="section" style="padding-top:clamp(16px,2vw,24px)"><div class="wrap">{head('Por qué trabajar aquí', 'Pocos proyectos, <em>bien hechos.</em>')}
<div class="benefits"><div class="benefit"><h3>Proyectos con nombre</h3><p>Obras singulares y bien planificadas, sin prisas mal entendidas.</p></div><div class="benefit"><h3>Eficiencia energética</h3><p>Aprenderás a construir con aerotermia, fotovoltaica y criterios Passivhaus.</p></div><div class="benefit"><h3>Equipo estable</h3><p>Relaciones a largo plazo, con estabilidad y crecimiento.</p></div></div></div></section>
<section class="section" style="padding-top:0"><div class="wrap">{head('Ofertas abiertas', 'Posiciones <em>disponibles.</em>', 'Ofertas de ejemplo. Sustitúyelas por las vacantes reales.')}
<div class="jobs">{''.join(f'<div class="job"><div><h3>{t}</h3><p>{d}</p></div><p class="label">{l}</p><a href="#cv" class="link">Aplicar</a></div>' for t, l, d in JOBS)}</div></div></section>
<section class="section" style="padding-top:0"><div class="wrap split" id="cv">
  <div class="a"><p class="label f">Candidatura</p><h2>Envíanos <em>tu CV.</em></h2><p class="lead">Aunque no veas tu puesto, nos encantará conocerte.</p></div>
  <div class="b"><form class="simple-form" data-simple novalidate>
    <div class="row2"><div class="field"><label for="cv-nombre">Nombre</label><input id="cv-nombre" data-req autocomplete="name"></div><div class="field"><label for="cv-email">Email</label><input id="cv-email" type="email" data-req autocomplete="email"></div></div>
    <div class="field"><label for="cv-puesto">Puesto</label><select id="cv-puesto">{''.join(f'<option>{t}</option>' for t, l, d in JOBS)}<option>Candidatura espontánea</option></select></div>
    <div class="field"><label for="cv-file">CV (PDF)</label><input id="cv-file" type="file" accept=".pdf"></div>
    <div class="field"><label for="cv-msg">Mensaje (opcional)</label><textarea id="cv-msg"></textarea></div>
    <p class="err" hidden>Necesitamos tu nombre y email.</p>
    <button type="submit" class="btn btn-primary" style="justify-self:start">Enviar candidatura <span class="arr" aria-hidden="true">→</span></button>
    <div class="ok-msg" hidden><p class="label f">Candidatura preparada</p><h3 style="font-size:1.8rem">Gracias.</h3><p style="color:var(--muted)">Revisaremos tu candidatura y te contactaremos si encaja con alguna posición.</p><p class="note">Prototipo: en esta versión el formulario no envía datos.</p></div>
  </form></div>
</div></section>'''
page('empleo.html', 'Empleo', 'Trabaja en Vacheron Projects: ofertas de empleo en Albacete y Alicante.', 'empleo', body)

# ======================================================================
# 10. LEGALES
# ======================================================================
WARN = '<p class="warn">Textos con los datos reales de la empresa. Conviene que los revise un asesor legal antes de publicar la web.</p>'
def legal(fname, title, content):
    b = phero([(title, None)], title, 'Última actualización: 26 de octubre de 2026.', label='Legal')
    b += f'<section class="section" style="padding-top:0"><div class="wrap"><div class="legal-doc">{WARN}{content}</div></div></section>'
    page(fname, title, f'{title} de VACHERON PROJECTS S.L.', 'legal', b)

legal('aviso-legal.html', 'Aviso legal', '''
<h2>1. Titularidad del sitio web</h2><p>En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos del titular de este sitio web:</p>
<div class="tbl"><table><tbody>
<tr><th>Nombre</th><td>VACHERON PROJECTS S.L.</td></tr>
<tr><th>Domicilio social</th><td>Marqués de Villores, 34 · 02003 Albacete (Albacete)</td></tr>
<tr><th>CIF</th><td>B02209104</td></tr>
<tr><th>Teléfono</th><td>967 50 25 44</td></tr>
<tr><th>Fax</th><td>967 50 30 69</td></tr>
<tr><th>Correo electrónico</th><td>info@vacheronprojects.com</td></tr>
<tr><th>Datos registrales</th><td>Inscrita en el Registro Mercantil de Albacete, Tomo 548, Libro 312, Folio 90, Hoja AB-5389, Inscripción 3ª.</td></tr>
</tbody></table></div>
<h2>2. Objeto</h2><p>Este sitio web ofrece información sobre los servicios de construcción, reforma, piscinas, gestión de proyectos, locales comerciales y promoción inmobiliaria de VACHERON PROJECTS S.L.</p>
<h2>3. Condiciones de uso</h2><p>El acceso a la web es gratuito e implica la aceptación de estas condiciones. El usuario se compromete a hacer un uso adecuado de los contenidos y a no emplearlos para actividades ilícitas.</p>
<h2>4. Propiedad intelectual e industrial</h2><p>Los textos, imágenes, diseños, logotipos y demás contenidos de esta web son propiedad de VACHERON PROJECTS S.L. o de terceros que han autorizado su uso. Queda prohibida su reproducción sin autorización expresa.</p>
<h2>5. Responsabilidad</h2><p>VACHERON PROJECTS S.L. no se responsabiliza de los daños derivados del uso de la web ni de los contenidos de sitios de terceros enlazados desde ella. Las infografías de promociones tienen carácter ilustrativo y no contractual.</p>
<h2>6. Legislación aplicable</h2><p>Estas condiciones se rigen por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales que correspondan conforme a la legislación vigente.</p>''')

legal('proteccion-datos.html', 'Protección de datos', '''
<h2>1. Responsable del tratamiento</h2><p>VACHERON PROJECTS S.L., CIF B02209104, con domicilio en Marqués de Villores, 34, 02003 Albacete. Teléfono: 967 50 25 44. Correo electrónico: info@vacheronprojects.com.</p>
<h2>2. Finalidades</h2><ul><li>Atender las solicitudes de información y presupuesto enviadas a través de los formularios.</li><li>Informar sobre las promociones en venta a quienes lo soliciten.</li><li>Gestionar candidaturas de empleo.</li><li>Atender a inversores interesados en nuestras promociones.</li><li>Enviar comunicaciones comerciales, solo si nos has dado tu consentimiento.</li></ul>
<h2>3. Legitimación</h2><p>El consentimiento del interesado y, en su caso, la aplicación de medidas precontractuales a petición del interesado.</p>
<h2>4. Conservación</h2><p>Los datos se conservarán mientras sean necesarios para la finalidad para la que se recogieron y durante los plazos legalmente exigidos.</p>
<h2>5. Destinatarios</h2><p>No se cederán datos a terceros salvo obligación legal o proveedores necesarios para la prestación del servicio, con los que existe un contrato de encargo de tratamiento.</p>
<h2>6. Derechos</h2><p>Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a info@vacheronprojects.com o por correo postal a Marqués de Villores, 34, 02003 Albacete, adjuntando copia de tu documento de identidad. También puedes presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).</p>''')

legal('cookies.html', 'Política de cookies', '''
<h2>1. Qué son las cookies</h2><p>Las cookies son pequeños archivos que se guardan en tu dispositivo al visitar una web y permiten recordar información sobre tu navegación.</p>
<h2>2. Cookies que utilizamos</h2><div class="tbl"><table><thead><tr><th>Tipo</th><th>Finalidad</th><th>Duración</th></tr></thead><tbody>
<tr><td>Técnicas</td><td>Necesarias para el funcionamiento de la web.</td><td>Sesión</td></tr>
<tr><td>Preferencias</td><td>Recordar tu elección sobre las cookies.</td><td>1 año</td></tr>
<tr><td>Analíticas</td><td>Medir de forma agregada el uso de la web, solo con tu consentimiento.</td><td>2 años</td></tr>
<tr><td>Redes sociales</td><td>Contenidos de Instagram, Facebook, LinkedIn, X o Pinterest, solo con tu consentimiento.</td><td>Según cada red</td></tr>
</tbody></table></div>
<h2>3. Gestión del consentimiento</h2><p>Puedes aceptar, rechazar o configurar las cookies no necesarias desde el aviso que aparece en tu primera visita, y cambiar tu elección en cualquier momento.</p>
<h2>4. Cómo desactivarlas en el navegador</h2><p>También puedes bloquear o eliminar las cookies desde la configuración de tu navegador (Chrome, Safari, Firefox o Edge).</p>''')

# ======================================================================
# Recursos
# ======================================================================
for f in glob.glob(os.path.join(OUT, '*.html')):
    if os.path.basename(f) not in PAGES:
        os.remove(f)  # páginas antiguas que ya no se generan
os.makedirs(os.path.join(OUT, 'assets'), exist_ok=True)
open(os.path.join(OUT, 'assets', 'styles.css'), 'w', encoding='utf-8').write(CSS)
shutil.copy(os.path.join(HERE, 'site.js'), os.path.join(OUT, 'assets', 'site.js'))
print(len(PAGES), 'páginas ·', len(WORKS), 'trabajos')
