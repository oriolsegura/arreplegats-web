#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const buildDir = path.join(rootDir, "build");
const indexHtmlPath = path.join(buildDir, "index.html");
const castellsTopPath = path.join(rootDir, "src", "data", "castells-top.json");
const sitemapPath = path.join(buildDir, "sitemap.xml");
const siteUrl = "https://arreplegats.cat";
const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;
const homeHeroSizes = "(max-width: 576px) 576px, (max-width: 768px) 768px, (max-width: 992px) 992px, (max-width: 1200px) 1200px, 1600px";
const homeHeroWebpImages = [
  { width: 576, url: "/images/optimized/2d8fm-arreplegats-2016-576_x_384.webp" },
  { width: 768, url: "/images/optimized/2d8fm-arreplegats-2016-768_x_512.webp" },
  { width: 992, url: "/images/optimized/2d8fm-arreplegats-2016-992_x_661.webp" },
  { width: 1200, url: "/images/optimized/2d8fm-arreplegats-2016-1200_x_800.webp" },
  { width: 1600, url: "/images/optimized/2d8fm-arreplegats-2016-1600_x_1067.webp" },
];

const sharedLinks = [
  { href: "/", label: "Inici" },
  { href: "/qui-som/", label: "Qui som" },
  { href: "/assajos/", label: "Assajos" },
  { href: "/historia-de-la-colla/", label: "Història de la colla" },
  { href: "/millors-castells/", label: "Millors castells" },
  { href: "/contactar/", label: "Contactar" },
];

const staticRouteMetadata = {
  "/qui-som": {
    title: "Qui som | Arreplegats de la Zona Universitària",
    description: "Coneix els Arreplegats de la Zona Universitària, colla castellera universitària de Barcelona fundada el 1995.",
    h1: "Qui som",
    schemaType: "AboutPage",
    paragraphs: [
      "Els Arreplegats de la Zona Universitària som una colla castellera universitària de Barcelona fundada el 1995. Alcem castells amb estudiants universitaris adults i combinem cultura popular, assajos, actuacions i vida associativa.",
      "La colla és coneguda per haver assolit alguns dels grans castells del món universitari, com el 4 de 8, el 3 de 8 amb folre i el pilar de 7 amb folre i manilles.",
    ],
  },
  "/agenda": {
    title: "Agenda | Arreplegats",
    description: "Consulta l'agenda d'assajos, actuacions i activitats dels Arreplegats de la Zona Universitària.",
    h1: "Agenda",
    schemaType: "CollectionPage",
    paragraphs: [
      "L'agenda dels Arreplegats recull assajos, actuacions, diades, activitats socials i cites importants de la temporada castellera universitària.",
      "Segueix aquesta pàgina i les xarxes de la colla per confirmar horaris, ubicacions i possibles canvis de calendari.",
    ],
  },
  "/assajos": {
    title: "Assajos i calendari | Arreplegats",
    description: "Horaris i informació per venir a assajar amb els Arreplegats de la Zona Universitària.",
    h1: "Assajos",
    schemaType: "WebPage",
    paragraphs: [
      "Assagem dimarts i dijous al migdia, de 14:00 a 16:00, al pati d'Industrials (ETSEIB), i dijous al vespre, de 20:00 a 22:00, al gimnàs d'assaig dels Castellers de Sants.",
      "No cal experiència prèvia per venir a fer castells. L'equip d'acollida acompanya les persones noves i ajuda cadascú a trobar el seu lloc a la colla.",
    ],
  },
  "/gralles-i-tabals": {
    title: "Gralles i tabals | Arreplegats",
    description: "Informació sobre el grup de gralles i tabals dels Arreplegats.",
    h1: "Gralles i tabals",
    schemaType: "WebPage",
    paragraphs: [
      "Les gralles i els tabals acompanyen els castells dels Arreplegats i formen part essencial de les actuacions, cercaviles i activitats de la colla.",
    ],
  },
  "/vida-universitaria": {
    title: "Vida universitària | Arreplegats",
    description: "Activitats, comunitat i vida universitària al voltant dels Arreplegats.",
    h1: "Vida universitària",
    schemaType: "WebPage",
    paragraphs: [
      "A més dels assajos i actuacions, els Arreplegats són un espai de trobada universitària amb activitats socials, música, cultura popular i vida de colla.",
    ],
  },
  "/historia-de-la-colla": {
    title: "Història de la colla | Arreplegats",
    description: "Història i fites dels Arreplegats de la Zona Universitària des de la seva fundació el 1995.",
    h1: "Història de la colla",
    schemaType: "Article",
    paragraphs: [
      "Els Arreplegats vam néixer la primavera de 1995 i vam ser la segona colla castellera universitària. Des d'aleshores hem contribuït a fer créixer els castells universitaris a Barcelona i Catalunya.",
      "Entre les fites destacades hi ha el primer 4 de 8 universitari descarregat el 2009, el pilar de 7 amb folre i manilles i el primer 3 de 8 amb folre del món universitari.",
    ],
  },
  "/llista-de-caps-de-colla": {
    title: "Llista de caps de colla | Arreplegats",
    description: "Relació històrica dels caps de colla dels Arreplegats de la Zona Universitària.",
    h1: "Llista de caps de colla",
    schemaType: "CollectionPage",
    paragraphs: [
      "Consulta la llista històrica de caps de colla que han liderat la tècnica dels Arreplegats al llarg de les temporades.",
    ],
  },
  "/llista-de-presidents": {
    title: "Llista de presidents | Arreplegats",
    description: "Relació històrica de presidents dels Arreplegats de la Zona Universitària.",
    h1: "Llista de presidents",
    schemaType: "CollectionPage",
    paragraphs: [
      "Consulta la llista històrica de presidents que han encapçalat la junta dels Arreplegats al llarg de la història de la colla.",
    ],
  },
  "/els-castells-universitaris": {
    title: "Els castells universitaris | Arreplegats",
    description: "Context sobre els castells universitaris i el paper dels Arreplegats en aquest àmbit casteller.",
    h1: "Els castells universitaris",
    schemaType: "Article",
    paragraphs: [
      "Els castells universitaris són construccions fetes per colles formades per estudiants universitaris adults. Els Arreplegats han estat una de les colles de referència d'aquest àmbit.",
    ],
  },
  "/millors-castells": {
    title: "Millors castells | Arreplegats",
    description: "Recull dels millors castells assolits pels Arreplegats de la Zona Universitària.",
    h1: "Millors castells",
    schemaType: "CollectionPage",
    paragraphs: [
      "Entre els millors castells dels Arreplegats hi ha la torre de 8 amb folre i manilles, el pilar de 7 amb folre i manilles, el 4 de 8, el 3 de 8 amb folre, el 9 de 7 i altres construccions destacades.",
    ],
  },
  "/millors-diades": {
    title: "Millors diades | Arreplegats",
    description: "Rànquing i resum de les millors diades dels Arreplegats.",
    h1: "Millors diades",
    schemaType: "CollectionPage",
    paragraphs: [
      "Consulta les diades més destacades dels Arreplegats segons els castells assolits i el valor històric de cada actuació.",
    ],
  },
  "/resum-historic": {
    title: "Resum històric | Arreplegats",
    description: "Resum històric dels castells i temporades dels Arreplegats de la Zona Universitària.",
    h1: "Resum històric",
    schemaType: "CollectionPage",
    paragraphs: [
      "El resum històric recull l'evolució castellera dels Arreplegats i ajuda a entendre les principals fites de cada temporada.",
    ],
  },
  "/llista-de-diades": {
    title: "Llista de diades | Arreplegats",
    description: "Llista de diades i actuacions dels Arreplegats de la Zona Universitària.",
    h1: "Llista de diades",
    schemaType: "CollectionPage",
    paragraphs: [
      "Consulta la llista de diades i actuacions que formen part de l'historial casteller dels Arreplegats.",
    ],
  },
  "/junta-directiva": {
    title: "Junta directiva | Arreplegats",
    description: "Informació sobre la junta directiva dels Arreplegats de la Zona Universitària.",
    h1: "Junta directiva",
    schemaType: "ProfilePage",
    paragraphs: [
      "La junta directiva coordina l'activitat social, institucional i organitzativa dels Arreplegats.",
    ],
  },
  "/junta-tecnica": {
    title: "Junta tècnica | Arreplegats",
    description: "Informació sobre la junta tècnica dels Arreplegats de la Zona Universitària.",
    h1: "Junta tècnica",
    schemaType: "ProfilePage",
    paragraphs: [
      "La junta tècnica planifica els assajos, els objectius castellers i el treball de pinyes, troncs i canalla universitària de la colla.",
    ],
  },
  "/comissio-genere-grup-treball": {
    title: "Comissió de gènere i grup de treball | Arreplegats",
    description: "Informació sobre la comissió de gènere i grup de treball dels Arreplegats.",
    h1: "Comissió de gènere i grup de treball",
    schemaType: "ProfilePage",
    paragraphs: [
      "La comissió de gènere i grup de treball impulsa espais de cura, prevenció i millora de la convivència dins la colla.",
    ],
  },
  "/patrocinadors": {
    title: "Patrocinadors | Arreplegats",
    description: "Patrocinadors i col·laboradors dels Arreplegats de la Zona Universitària.",
    h1: "Patrocinadors",
    schemaType: "CollectionPage",
    paragraphs: [
      "Els patrocinadors i col·laboradors ajuden a sostenir l'activitat castellera, cultural i associativa dels Arreplegats.",
    ],
  },
  "/fotografies": {
    title: "Fotografies | Arreplegats",
    description: "Galeria de fotografies dels Arreplegats de la Zona Universitària.",
    h1: "Fotografies",
    schemaType: "ImageGallery",
    paragraphs: [
      "La galeria de fotografies recull imatges d'assajos, actuacions, diades i moments de vida de colla dels Arreplegats.",
    ],
  },
  "/videos": {
    title: "Vídeos | Arreplegats",
    description: "Vídeos d'actuacions, castells i activitats dels Arreplegats.",
    h1: "Vídeos",
    schemaType: "VideoGallery",
    paragraphs: [
      "Els vídeos dels Arreplegats documenten castells, actuacions i activitats destacades de la colla universitària.",
    ],
  },
  "/musica": {
    title: "Música | Arreplegats",
    description: "Música i recursos sonors relacionats amb els Arreplegats.",
    h1: "Música",
    schemaType: "CollectionPage",
    paragraphs: [
      "La música forma part de la cultura castellera i acompanya els castells i activitats dels Arreplegats.",
    ],
  },
  "/estatuts": {
    title: "Estatuts | Arreplegats",
    description: "Estatuts dels Arreplegats de la Zona Universitària.",
    h1: "Estatuts",
    schemaType: "WebPage",
    paragraphs: [
      "Els estatuts recullen el marc associatiu, organitzatiu i de funcionament dels Arreplegats de la Zona Universitària.",
    ],
  },
  "/reglament-regim-intern": {
    title: "Reglament de règim intern | Arreplegats",
    description: "Reglament de règim intern dels Arreplegats de la Zona Universitària.",
    h1: "Reglament de règim intern",
    schemaType: "WebPage",
    paragraphs: [
      "El reglament de règim intern desenvolupa normes de funcionament, organització i convivència de la colla.",
    ],
  },
  "/protocol-agressions": {
    title: "Protocol d'agressions | Arreplegats",
    description: "Protocol d'agressions dels Arreplegats de la Zona Universitària.",
    h1: "Protocol d'agressions",
    schemaType: "WebPage",
    paragraphs: [
      "El protocol d'agressions estableix criteris i procediments per prevenir, detectar i actuar davant situacions d'agressió o vulneració de drets.",
    ],
  },
  "/jocs": {
    title: "Jocs | Arreplegats",
    description: "Jocs i activitats interactives dels Arreplegats.",
    h1: "Jocs",
    schemaType: "CollectionPage",
    paragraphs: [
      "La secció de jocs reuneix activitats interactives relacionades amb els Arreplegats, els castells i la vida de colla.",
    ],
  },
  "/joc-castells": {
    title: "Joc Castells | Arreplegats",
    description: "Joc interactiu de castells dels Arreplegats.",
    h1: "Joc Castells",
    schemaType: "WebApplication",
    paragraphs: [
      "Joc interactiu per explorar castells i decisions relacionades amb el món casteller universitari.",
    ],
  },
  "/sopa-de-lletres": {
    title: "Sopa de lletres | Arreplegats",
    description: "Sopa de lletres dels Arreplegats amb vocabulari casteller.",
    h1: "Sopa de lletres",
    schemaType: "WebApplication",
    paragraphs: [
      "Sopa de lletres amb paraules i vocabulari vinculats als Arreplegats i als castells.",
    ],
  },
  "/mots-encreuats": {
    title: "Mots encreuats | Arreplegats",
    description: "Mots encreuats dels Arreplegats amb vocabulari casteller.",
    h1: "Mots encreuats",
    schemaType: "WebApplication",
    paragraphs: [
      "Mots encreuats amb pistes i paraules relacionades amb els Arreplegats i la cultura castellera.",
    ],
  },
  "/memory": {
    title: "Memory | Arreplegats",
    description: "Joc de memory dels Arreplegats.",
    h1: "Memory",
    schemaType: "WebApplication",
    paragraphs: [
      "Joc de memory dels Arreplegats amb elements visuals de la colla i el món casteller.",
    ],
  },
  "/penjat": {
    title: "Penjat | Arreplegats",
    description: "Joc del penjat dels Arreplegats amb vocabulari casteller.",
    h1: "Penjat",
    schemaType: "WebApplication",
    paragraphs: [
      "Joc del penjat amb paraules vinculades als castells, la colla i la cultura universitària.",
    ],
  },
  "/contactar": {
    title: "Contactar amb Arreplegats",
    description: "Contacta amb els Arreplegats de la Zona Universitària per informació, assajos, activitats o contractacions.",
    h1: "Contactar amb Arreplegats",
    schemaType: "ContactPage",
    paragraphs: [
      "Pots contactar amb els Arreplegats per demanar informació sobre assajos, activitats, actuacions o vida de colla.",
      "Escriu a junta.arreplegats@gmail.com o segueix @arreplegats a les xarxes socials per estar al dia de les novetats.",
    ],
  },
  "/parts-castell": {
    title: "Parts del castell | Arreplegats",
    description: "Explicació de les parts d'un castell i vocabulari bàsic dels castells.",
    h1: "Parts del castell",
    schemaType: "Article",
    paragraphs: [
      "Coneix les parts principals d'un castell, les posicions i el vocabulari bàsic que es fa servir als assajos i actuacions.",
    ],
  },
};

const sitemapStaticRoutes = [
  "/qui-som",
  "/agenda",
  "/assajos",
  "/gralles-i-tabals",
  "/vida-universitaria",
  "/historia-de-la-colla",
  "/llista-de-caps-de-colla",
  "/llista-de-presidents",
  "/els-castells-universitaris",
  "/millors-castells",
  "/millors-diades",
  "/resum-historic",
  "/llista-de-diades",
  "/junta-directiva",
  "/junta-tecnica",
  "/comissio-genere-grup-treball",
  "/patrocinadors",
  "/fotografies",
  "/videos",
  "/musica",
  "/estatuts",
  "/reglament-regim-intern",
  "/protocol-agressions",
  "/jocs",
  "/contactar",
];

function getCastellsTop() {
  return JSON.parse(fs.readFileSync(castellsTopPath, "utf8"));
}

function getCastellRoutes(castellsTop) {
  return Object.keys(castellsTop).map((slug) => `/castells/${slug}`);
}

function getRouteMetadata(route, castellsTop) {
  if (route.startsWith("/castells/")) {
    const slug = route.split("/")[2];
    const castell = castellsTop[slug];

    if (!castell) {
      throw new Error(`Missing castell metadata for route: ${route}`);
    }

    const title = `${castell.name} | Arreplegats`;
    const fallbackText = `Informació sobre ${castell.name}, un dels castells destacats dels Arreplegats de la Zona Universitària.`;

    return {
      title,
      description: `${castell.name}: fitxa, història i imatges d'aquest castell dels Arreplegats de la Zona Universitària.`,
      h1: castell.name,
      schemaType: "Article",
      paragraphs: [fallbackText, ...(castell.text || []).filter(Boolean)],
    };
  }

  const metadata = staticRouteMetadata[route];

  if (!metadata) {
    throw new Error(`Missing SEO metadata for route: ${route}`);
  }

  return metadata;
}

function getRoutes(castellsTop) {
  return [...Object.keys(staticRouteMetadata), ...getCastellRoutes(castellsTop)];
}

function getSitemapRoutes(castellsTop) {
  const castellsIndex = sitemapStaticRoutes.indexOf("/millors-castells") + 1;

  return [
    "/",
    ...sitemapStaticRoutes.slice(0, castellsIndex),
    ...getCastellRoutes(castellsTop),
    ...sitemapStaticRoutes.slice(castellsIndex),
  ];
}

function getCanonicalUrl(route) {
  if (route === "/") {
    return `${siteUrl}/`;
  }

  return `${siteUrl}${route}/`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeXml(value) {
  return escapeHtml(value).replace(/'/g, "&apos;");
}

function buildOrganizationGraph() {
  return [
    {
      "@type": ["SportsOrganization", "Organization"],
      "@id": organizationId,
      name: "Arreplegats de la Zona Universitària",
      alternateName: ["Arreplegats", "Arreplegats ZU"],
      url: `${siteUrl}/`,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon.png`,
      },
      image: `${siteUrl}/og-image.jpg`,
      description: "Colla castellera universitària de Barcelona fundada el 1995 a la Zona Universitària.",
      email: "junta.arreplegats@gmail.com",
      foundingDate: "1995",
      sport: "Castells",
      areaServed: [
        {
          "@type": "City",
          name: "Barcelona",
        },
        {
          "@type": "AdministrativeArea",
          name: "Catalunya",
        },
      ],
      location: {
        "@type": "Place",
        name: "Zona Universitària de Barcelona",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Barcelona",
          addressRegion: "Catalunya",
          addressCountry: "ES",
        },
      },
      knowsAbout: [
        "castells",
        "castells universitaris",
        "cultura popular catalana",
        "colles castelleres universitàries",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "junta.arreplegats@gmail.com",
        contactType: "Informació general",
        availableLanguage: ["ca", "es", "en"],
      },
      sameAs: [
        "https://www.x.com/arreplegats",
        "https://www.instagram.com/arreplegats",
        "https://www.youtube.com/channel/UC-RVCefwipBS8WutREwbTmw",
        "https://www.twitch.tv/arreplegatszu",
        "https://www.tiktok.com/@arreplegats",
        "https://www.facebook.com/arreplegats",
      ],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: `${siteUrl}/`,
      name: "Arreplegats de la Zona Universitària",
      description: "Pàgina web oficial de la colla castellera universitària Arreplegats de la Zona Universitària.",
      inLanguage: "ca",
      publisher: {
        "@id": organizationId,
      },
    },
  ];
}

function buildJsonLd(route, metadata) {
  const canonicalUrl = getCanonicalUrl(route);
  const pageTypes = metadata.schemaType === "WebPage" ? "WebPage" : [metadata.schemaType, "WebPage"];
  const pageNode = {
    "@type": pageTypes,
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: metadata.title,
    description: metadata.description,
    inLanguage: "ca",
    isPartOf: {
      "@id": websiteId,
    },
    about: {
      "@id": organizationId,
    },
    publisher: {
      "@id": organizationId,
    },
  };

  if (metadata.schemaType === "Article") {
    pageNode.headline = metadata.h1;
    pageNode.abstract = metadata.description;
    pageNode.articleBody = metadata.paragraphs.join("\n\n");
    pageNode.author = {
      "@id": organizationId,
    };
  }

  if (metadata.schemaType === "WebApplication") {
    pageNode.applicationCategory = "GameApplication";
    pageNode.operatingSystem = "Web";
    pageNode.isAccessibleForFree = true;
  }

  const graph = [
    ...buildOrganizationGraph(),
    pageNode,
  ];

  if (route !== "/") {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inici",
          item: `${siteUrl}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: metadata.h1,
          item: canonicalUrl,
        },
      ],
    });
  }

  return `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}</script>`;
}

function buildFallbackSection(route, metadata) {
  const canonicalUrl = getCanonicalUrl(route);
  const links = sharedLinks
    .filter((link) => getCanonicalUrl(link.href.replace(/\/$/, "") || "/") !== canonicalUrl)
    .map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`)
    .join("\n        ");

  const paragraphs = metadata.paragraphs
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("\n      ");

  return `<section class="azu-seo-fallback" aria-label="Contingut principal">
      <h1>${escapeHtml(metadata.h1)}</h1>
      ${paragraphs}

      <nav class="azu-seo-fallback__nav" aria-label="Pàgines principals">
        ${links}
      </nav>
    </section>`;
}

function updateMetaTag(html, attribute, name, content) {
  const pattern = new RegExp(`<meta\\s+${attribute}="${name}"\\s+content="[^"]*"\\s*/?>`, "i");
  const replacement = `<meta ${attribute}="${name}" content="${escapeHtml(content)}">`;

  if (!pattern.test(html)) {
    throw new Error(`Missing meta tag ${attribute}="${name}"`);
  }

  return html.replace(pattern, replacement);
}

function renderRouteHtml(indexHtml, route, metadata) {
  const canonicalUrl = getCanonicalUrl(route);

  let html = indexHtml
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(metadata.title)}</title>`)
    .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonicalUrl}" />`)
    .replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i, buildJsonLd(route, metadata))
    .replace(/<section\s+class="azu-seo-fallback"[\s\S]*?<\/section>/i, buildFallbackSection(route, metadata));

  html = updateMetaTag(html, "name", "description", metadata.description);
  html = updateMetaTag(html, "name", "title", metadata.title);
  html = updateMetaTag(html, "property", "og:url", canonicalUrl);
  html = updateMetaTag(html, "property", "og:title", metadata.title);
  html = updateMetaTag(html, "property", "og:description", metadata.description);
  html = updateMetaTag(html, "property", "twitter:url", canonicalUrl);
  html = updateMetaTag(html, "property", "twitter:title", metadata.title);
  html = updateMetaTag(html, "property", "twitter:description", metadata.description);

  return html;
}

function writeSitemap(routes) {
  const urls = routes
    .map((route) => `  <url>\n    <loc>${escapeXml(getCanonicalUrl(route))}</loc>\n  </url>`)
    .join("\n");

  fs.writeFileSync(sitemapPath, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
}

function buildHeroPreloadTag() {
  const srcSet = homeHeroWebpImages.map((img) => `${img.url} ${img.width}w`).join(", ");
  const fallback = homeHeroWebpImages.find((img) => img.width === 1200) || homeHeroWebpImages[0];

  return `<link rel="preload" as="image" href="${fallback.url}" type="image/webp" imagesrcset="${srcSet}" imagesizes="${homeHeroSizes}" fetchpriority="high">`;
}

function addHomepageHeroPreload(html) {
  const preload = buildHeroPreloadTag();

  if (html.includes(preload)) {
    return html;
  }

  return html.replace("</head>", `    ${preload}\n  </head>`);
}

function assertSafeRoute(route) {
  if (!route.startsWith("/") || route.includes("..") || route.includes("?") || route.includes("#")) {
    throw new Error(`Unsafe route entrypoint: ${route}`);
  }

  if (route === "/") {
    throw new Error("Root route already uses build/index.html");
  }
}

function getOutputPath(route) {
  assertSafeRoute(route);

  const routePath = route.replace(/^\/+|\/+$/g, "");
  const outputDir = path.resolve(buildDir, routePath);

  if (!outputDir.startsWith(`${buildDir}${path.sep}`)) {
    throw new Error(`Route escapes build directory: ${route}`);
  }

  return path.join(outputDir, "index.html");
}

function main() {
  if (!fs.existsSync(indexHtmlPath)) {
    throw new Error("Cannot generate route entrypoints before build/index.html exists.");
  }

  const castellsTop = getCastellsTop();
  const indexHtml = fs.readFileSync(indexHtmlPath, "utf8");
  const routes = [...new Set(getRoutes(castellsTop))];
  const sitemapRoutes = [...new Set(getSitemapRoutes(castellsTop))];

  fs.writeFileSync(indexHtmlPath, addHomepageHeroPreload(indexHtml));

  for (const route of routes) {
    const outputPath = getOutputPath(route);
    const metadata = getRouteMetadata(route, castellsTop);

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, renderRouteHtml(indexHtml, route, metadata));
  }

  writeSitemap(sitemapRoutes);

  console.log(`Generated ${routes.length} static route entrypoints and ${sitemapRoutes.length} sitemap URLs.`);
}

main();
