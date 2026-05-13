#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const buildDir = path.join(rootDir, "build");
const indexHtmlPath = path.join(buildDir, "index.html");
const castellsTopPath = path.join(rootDir, "src", "data", "castells-top.json");
const sitemapPath = path.join(buildDir, "sitemap.xml");
const siteUrl = "https://arreplegats.cat";

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
    paragraphs: [
      "Els Arreplegats de la Zona Universitària som una colla castellera universitària de Barcelona fundada el 1995. Alcem castells amb estudiants universitaris adults i combinem cultura popular, assajos, actuacions i vida associativa.",
      "La colla és coneguda per haver assolit alguns dels grans castells del món universitari, com el 4 de 8, el 3 de 8 amb folre i el pilar de 7 amb folre i manilles.",
    ],
  },
  "/agenda": {
    title: "Agenda | Arreplegats",
    description: "Consulta l'agenda d'assajos, actuacions i activitats dels Arreplegats de la Zona Universitària.",
    h1: "Agenda",
    paragraphs: [
      "L'agenda dels Arreplegats recull assajos, actuacions, diades, activitats socials i cites importants de la temporada castellera universitària.",
      "Segueix aquesta pàgina i les xarxes de la colla per confirmar horaris, ubicacions i possibles canvis de calendari.",
    ],
  },
  "/assajos": {
    title: "Assajos i calendari | Arreplegats",
    description: "Horaris i informació per venir a assajar amb els Arreplegats de la Zona Universitària.",
    h1: "Assajos",
    paragraphs: [
      "Assagem dimarts i dijous al migdia, de 14:00 a 16:00, al pati d'Industrials (ETSEIB), i dijous al vespre, de 20:00 a 22:00, al gimnàs d'assaig dels Castellers de Sants.",
      "No cal experiència prèvia per venir a fer castells. L'equip d'acollida acompanya les persones noves i ajuda cadascú a trobar el seu lloc a la colla.",
    ],
  },
  "/gralles-i-tabals": {
    title: "Gralles i tabals | Arreplegats",
    description: "Informació sobre el grup de gralles i tabals dels Arreplegats.",
    h1: "Gralles i tabals",
    paragraphs: [
      "Les gralles i els tabals acompanyen els castells dels Arreplegats i formen part essencial de les actuacions, cercaviles i activitats de la colla.",
    ],
  },
  "/vida-universitaria": {
    title: "Vida universitària | Arreplegats",
    description: "Activitats, comunitat i vida universitària al voltant dels Arreplegats.",
    h1: "Vida universitària",
    paragraphs: [
      "A més dels assajos i actuacions, els Arreplegats són un espai de trobada universitària amb activitats socials, música, cultura popular i vida de colla.",
    ],
  },
  "/historia-de-la-colla": {
    title: "Història de la colla | Arreplegats",
    description: "Història i fites dels Arreplegats de la Zona Universitària des de la seva fundació el 1995.",
    h1: "Història de la colla",
    paragraphs: [
      "Els Arreplegats vam néixer la primavera de 1995 i vam ser la segona colla castellera universitària. Des d'aleshores hem contribuït a fer créixer els castells universitaris a Barcelona i Catalunya.",
      "Entre les fites destacades hi ha el primer 4 de 8 universitari descarregat el 2009, el pilar de 7 amb folre i manilles i el primer 3 de 8 amb folre del món universitari.",
    ],
  },
  "/llista-de-caps-de-colla": {
    title: "Llista de caps de colla | Arreplegats",
    description: "Relació històrica dels caps de colla dels Arreplegats de la Zona Universitària.",
    h1: "Llista de caps de colla",
    paragraphs: [
      "Consulta la llista històrica de caps de colla que han liderat la tècnica dels Arreplegats al llarg de les temporades.",
    ],
  },
  "/llista-de-presidents": {
    title: "Llista de presidents | Arreplegats",
    description: "Relació històrica de presidents dels Arreplegats de la Zona Universitària.",
    h1: "Llista de presidents",
    paragraphs: [
      "Consulta la llista històrica de presidents que han encapçalat la junta dels Arreplegats al llarg de la història de la colla.",
    ],
  },
  "/els-castells-universitaris": {
    title: "Els castells universitaris | Arreplegats",
    description: "Context sobre els castells universitaris i el paper dels Arreplegats en aquest àmbit casteller.",
    h1: "Els castells universitaris",
    paragraphs: [
      "Els castells universitaris són construccions fetes per colles formades per estudiants universitaris adults. Els Arreplegats han estat una de les colles de referència d'aquest àmbit.",
    ],
  },
  "/millors-castells": {
    title: "Millors castells | Arreplegats",
    description: "Recull dels millors castells assolits pels Arreplegats de la Zona Universitària.",
    h1: "Millors castells",
    paragraphs: [
      "Entre els millors castells dels Arreplegats hi ha la torre de 8 amb folre i manilles, el pilar de 7 amb folre i manilles, el 4 de 8, el 3 de 8 amb folre, el 9 de 7 i altres construccions destacades.",
    ],
  },
  "/millors-diades": {
    title: "Millors diades | Arreplegats",
    description: "Rànquing i resum de les millors diades dels Arreplegats.",
    h1: "Millors diades",
    paragraphs: [
      "Consulta les diades més destacades dels Arreplegats segons els castells assolits i el valor històric de cada actuació.",
    ],
  },
  "/resum-historic": {
    title: "Resum històric | Arreplegats",
    description: "Resum històric dels castells i temporades dels Arreplegats de la Zona Universitària.",
    h1: "Resum històric",
    paragraphs: [
      "El resum històric recull l'evolució castellera dels Arreplegats i ajuda a entendre les principals fites de cada temporada.",
    ],
  },
  "/llista-de-diades": {
    title: "Llista de diades | Arreplegats",
    description: "Llista de diades i actuacions dels Arreplegats de la Zona Universitària.",
    h1: "Llista de diades",
    paragraphs: [
      "Consulta la llista de diades i actuacions que formen part de l'historial casteller dels Arreplegats.",
    ],
  },
  "/junta-directiva": {
    title: "Junta directiva | Arreplegats",
    description: "Informació sobre la junta directiva dels Arreplegats de la Zona Universitària.",
    h1: "Junta directiva",
    paragraphs: [
      "La junta directiva coordina l'activitat social, institucional i organitzativa dels Arreplegats.",
    ],
  },
  "/junta-tecnica": {
    title: "Junta tècnica | Arreplegats",
    description: "Informació sobre la junta tècnica dels Arreplegats de la Zona Universitària.",
    h1: "Junta tècnica",
    paragraphs: [
      "La junta tècnica planifica els assajos, els objectius castellers i el treball de pinyes, troncs i canalla universitària de la colla.",
    ],
  },
  "/comissio-genere-grup-treball": {
    title: "Comissió de gènere i grup de treball | Arreplegats",
    description: "Informació sobre la comissió de gènere i grup de treball dels Arreplegats.",
    h1: "Comissió de gènere i grup de treball",
    paragraphs: [
      "La comissió de gènere i grup de treball impulsa espais de cura, prevenció i millora de la convivència dins la colla.",
    ],
  },
  "/patrocinadors": {
    title: "Patrocinadors | Arreplegats",
    description: "Patrocinadors i col·laboradors dels Arreplegats de la Zona Universitària.",
    h1: "Patrocinadors",
    paragraphs: [
      "Els patrocinadors i col·laboradors ajuden a sostenir l'activitat castellera, cultural i associativa dels Arreplegats.",
    ],
  },
  "/fotografies": {
    title: "Fotografies | Arreplegats",
    description: "Galeria de fotografies dels Arreplegats de la Zona Universitària.",
    h1: "Fotografies",
    paragraphs: [
      "La galeria de fotografies recull imatges d'assajos, actuacions, diades i moments de vida de colla dels Arreplegats.",
    ],
  },
  "/videos": {
    title: "Vídeos | Arreplegats",
    description: "Vídeos d'actuacions, castells i activitats dels Arreplegats.",
    h1: "Vídeos",
    paragraphs: [
      "Els vídeos dels Arreplegats documenten castells, actuacions i activitats destacades de la colla universitària.",
    ],
  },
  "/musica": {
    title: "Música | Arreplegats",
    description: "Música i recursos sonors relacionats amb els Arreplegats.",
    h1: "Música",
    paragraphs: [
      "La música forma part de la cultura castellera i acompanya els castells i activitats dels Arreplegats.",
    ],
  },
  "/estatuts": {
    title: "Estatuts | Arreplegats",
    description: "Estatuts dels Arreplegats de la Zona Universitària.",
    h1: "Estatuts",
    paragraphs: [
      "Els estatuts recullen el marc associatiu, organitzatiu i de funcionament dels Arreplegats de la Zona Universitària.",
    ],
  },
  "/reglament-regim-intern": {
    title: "Reglament de règim intern | Arreplegats",
    description: "Reglament de règim intern dels Arreplegats de la Zona Universitària.",
    h1: "Reglament de règim intern",
    paragraphs: [
      "El reglament de règim intern desenvolupa normes de funcionament, organització i convivència de la colla.",
    ],
  },
  "/protocol-agressions": {
    title: "Protocol d'agressions | Arreplegats",
    description: "Protocol d'agressions dels Arreplegats de la Zona Universitària.",
    h1: "Protocol d'agressions",
    paragraphs: [
      "El protocol d'agressions estableix criteris i procediments per prevenir, detectar i actuar davant situacions d'agressió o vulneració de drets.",
    ],
  },
  "/jocs": {
    title: "Jocs | Arreplegats",
    description: "Jocs i activitats interactives dels Arreplegats.",
    h1: "Jocs",
    paragraphs: [
      "La secció de jocs reuneix activitats interactives relacionades amb els Arreplegats, els castells i la vida de colla.",
    ],
  },
  "/joc-castells": {
    title: "Joc Castells | Arreplegats",
    description: "Joc interactiu de castells dels Arreplegats.",
    h1: "Joc Castells",
    paragraphs: [
      "Joc interactiu per explorar castells i decisions relacionades amb el món casteller universitari.",
    ],
  },
  "/sopa-de-lletres": {
    title: "Sopa de lletres | Arreplegats",
    description: "Sopa de lletres dels Arreplegats amb vocabulari casteller.",
    h1: "Sopa de lletres",
    paragraphs: [
      "Sopa de lletres amb paraules i vocabulari vinculats als Arreplegats i als castells.",
    ],
  },
  "/mots-encreuats": {
    title: "Mots encreuats | Arreplegats",
    description: "Mots encreuats dels Arreplegats amb vocabulari casteller.",
    h1: "Mots encreuats",
    paragraphs: [
      "Mots encreuats amb pistes i paraules relacionades amb els Arreplegats i la cultura castellera.",
    ],
  },
  "/memory": {
    title: "Memory | Arreplegats",
    description: "Joc de memory dels Arreplegats.",
    h1: "Memory",
    paragraphs: [
      "Joc de memory dels Arreplegats amb elements visuals de la colla i el món casteller.",
    ],
  },
  "/penjat": {
    title: "Penjat | Arreplegats",
    description: "Joc del penjat dels Arreplegats amb vocabulari casteller.",
    h1: "Penjat",
    paragraphs: [
      "Joc del penjat amb paraules vinculades als castells, la colla i la cultura universitària.",
    ],
  },
  "/contactar": {
    title: "Contactar amb Arreplegats",
    description: "Contacta amb els Arreplegats de la Zona Universitària per informació, assajos, activitats o contractacions.",
    h1: "Contactar amb Arreplegats",
    paragraphs: [
      "Pots contactar amb els Arreplegats per demanar informació sobre assajos, activitats, actuacions o vida de colla.",
      "Escriu a junta.arreplegats@gmail.com o segueix @arreplegats a les xarxes socials per estar al dia de les novetats.",
    ],
  },
  "/parts-castell": {
    title: "Parts del castell | Arreplegats",
    description: "Explicació de les parts d'un castell i vocabulari bàsic dels castells.",
    h1: "Parts del castell",
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
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Arreplegats de la Zona Universitària",
      url: `${siteUrl}/`,
      logo: `${siteUrl}/icon.png`,
      description: "Pàgina web oficial de la colla castellera universitària Arreplegats de la Zona Universitària.",
      email: "junta.arreplegats@gmail.com",
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
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: "Arreplegats de la Zona Universitària",
      description: "Pàgina web oficial de la colla castellera universitària Arreplegats de la Zona Universitària.",
      inLanguage: "ca",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ];
}

function buildJsonLd(route, metadata) {
  const canonicalUrl = getCanonicalUrl(route);
  const graph = [
    ...buildOrganizationGraph(),
    {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: metadata.title,
      description: metadata.description,
      inLanguage: "ca",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#organization`,
      },
    },
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
