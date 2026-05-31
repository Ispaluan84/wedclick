# Wedclick — Actualización de diseño "Papel & Alma"

## Archivos modificados

Estos son los únicos archivos que tienes que reemplazar en tu proyecto.
El resto (panel, admin, checkout, contextos, hooks, supabase...) no se toca.

```
tailwind.config.js                          ← reemplazar
src/index.css                               ← reemplazar
src/pages/LandingPage.jsx                   ← reemplazar
src/components/layout/Navbar.jsx            ← reemplazar
src/components/layout/Footer.jsx            ← reemplazar
src/components/sections/Hero.jsx            ← reemplazar
src/components/sections/HowItWorks.jsx      ← reemplazar
src/components/sections/Features.jsx        ← reemplazar
src/components/sections/Testimonials.jsx    ← reemplazar
src/components/sections/Pricing.jsx         ← reemplazar
src/components/sections/FAQ.jsx             ← reemplazar
src/components/ui/Ticker.jsx                ← NUEVO (añadir)
src/components/ui/Cursor.jsx                ← NUEVO (añadir)
```

## Archivos que NO se modifican

```
src/App.jsx
src/main.jsx
src/lib/supabase.js
src/context/CookieContext.jsx
src/hooks/useTheme.js
src/components/SEO.jsx
src/components/analytics/Analytics.jsx
src/components/ui/WhatsAppButton.jsx
src/components/ui/CookieBanner.jsx
src/components/ui/Card.jsx
src/components/ui/SectionWrapper.jsx
src/components/ui/Buttom.jsx
src/components/panel/PanelLayout.jsx
src/components/sections/Demo.jsx
src/components/sections/DemoPreview.jsx
src/components/sections/Extras.jsx
src/components/sections/Contact.jsx
src/components/sections/CTAFinal.jsx
src/pages/admin/*
src/pages/panel/*
src/pages/Checkout.jsx
src/pages/CheckoutSuccess.jsx
src/pages/CheckoutCancel.jsx
src/pages/Privacy.jsx
src/pages/LegalNotice.jsx
src/pages/NotFound.jsx
src/pages/ComingSoon.jsx
```

## Dependencias — no necesitas instalar nada nuevo

El nuevo diseño usa framer-motion (ya tienes v12), lucide-react (ya tienes) y DM Sans (carga desde Google Fonts en el CSS). No hay dependencias nuevas.

## Fuentes

El CSS importa automáticamente desde Google Fonts:
- **Playfair Display** — ya la usabas, ampliamos los pesos
- **DM Sans** — nueva, reemplaza a Inter en la landing

El panel y admin seguirán usando Inter si lo defines en sus propias clases.
Si quieres que todo el sitio use DM Sans, puedes quitar la referencia a Inter
del tailwind.config.js (los alias de retrocompatibilidad lo mantienen funcionando).

## Retrocompatibilidad de colores

El nuevo tailwind.config.js mantiene TODOS los tokens de color anteriores como
aliases hacia los nuevos. Esto significa que el panel, admin y cualquier otro
componente que use clases como `bg-azul-oscuro`, `text-marron`, `bg-verde-oscuro`,
etc., seguirá funcionando exactamente igual.

## Verificación rápida post-deploy

1. `npm run dev` — arranca sin errores
2. Abre `/` — ves el nuevo diseño editorial
3. Abre `/panel` — el panel funciona igual
4. Abre `/admin` — el admin funciona igual
5. El cursor personalizado solo aparece en `/`
