# Plantillas Web Maestra — Factoría de Landings Dinámicas (Cuy Labs)

Una sola app React (Vite + TypeScript + Tailwind) que se **pinta sola** leyendo los
parámetros de la URL. No se programa una web por cliente: el Investigador de Prospectos
genera **URLs inteligentes** y esta factoría las renderiza en el navegador del prospecto.

> Costo: **$0** (Vercel Hobby + render dinámico en cliente).

## Contrato de URL

```
https://<factoria>.vercel.app/?cliente=<txt>&template=<t>&color=<c>&font=<f>&blocks=<csv>
```

Ejemplo:

```
https://plantillas-web-maestra.vercel.app/?cliente=Gimnasio%20Iron&template=gimnasios&color=red&font=poppins&blocks=reservas,galeria
```

### Enums válidos (idénticos al generador en `preparador.js`)

| Parámetro  | Valores |
|------------|---------|
| `template` | `clinicas` · `corporativo` · `gimnasios` · `colegios` · `tiendas` |
| `color`    | `blue` · `green` · `red` · `violet` · `orange` · `slate` |
| `font`     | `inter` · `roboto` · `poppins` · `montserrat` |
| `blocks`   | `login` · `reservas` · `ecommerce` · `galeria` (CSV, reservado para extensiones) |
| `cliente`  | texto libre (URL-encoded) |

Cualquier valor fuera del enum cae a un default seguro (la página nunca se rompe).

### Plantillas (cada una con identidad propia, no genérica)

| Template      | Inspiración        | Secciones |
|---------------|--------------------|-----------|
| `clinicas`    | Neomédica          | Hero salud · stats de confianza · especialidades · staff · reserva |
| `corporativo` | IBM                | Hero editorial · logos · soluciones · casos de éxito con métricas |
| `gimnasios`   | Fight Academy / Orangetheory | **Dark** · packs de precios · beneficios · FAQ · "Prueba 1 sesión" |
| `colegios`    | Colegio San Pedro  | Hero Open Day · ¿qué ofrecemos? · pilares · galería · admisión en 3 pasos |
| `tiendas`     | E-commerce         | Hero promo · categorías · grid de catálogo · ofertas · beneficios de compra |

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173/?cliente=Demo&template=clinicas&color=blue&font=inter&blocks=reservas
npm run build
npm run preview
```

## Deploy en Vercel

- **Framework Preset:** `Vite`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Root Directory:** `./`

## Arquitectura

```
src/
├── lib/params.ts          # Lee y valida el Contrato de URL + aplica tema (color/font)
├── components/site.tsx    # UI kit compartido (SiteNav, SiteFooter, Section, etc.)
├── templates/             # Una plantilla premium por rubro
│   ├── ClinicasTemplate.tsx
│   ├── CorporativoTemplate.tsx
│   ├── GimnasiosTemplate.tsx
│   ├── ColegiosTemplate.tsx
│   └── TiendasTemplate.tsx
└── App.tsx                # Lee config → enruta a la plantilla correcta
```
