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
| `blocks`   | `login` · `reservas` · `ecommerce` · `galeria` (CSV, 0+) |
| `cliente`  | texto libre (URL-encoded) |

Cualquier valor fuera del enum cae a un default seguro (la página nunca se rompe).

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
├── data/templates.ts      # Copy de las 5 plantillas
├── components/            # Hero, Features, CTA, Footer
│   └── blocks/            # login, reservas, ecommerce, galeria (dinámicos)
└── App.tsx                # Orquesta: lee config → pinta plantilla + bloques
```
