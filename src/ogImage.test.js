const fs = require("fs");
const path = require("path");

const projectRoot = path.join(__dirname, "..");

const getMetaTags = () => {
  const indexHtml = fs.readFileSync(
    path.join(projectRoot, "public", "index.html"),
    "utf8"
  );

  return [...indexHtml.matchAll(/<meta\s+[^>]*>/gi)].map((match) => {
    return Object.fromEntries(
      [...match[0].matchAll(/([a-zA-Z:-]+)=["']([^"']*)["']/g)].map(
        ([, name, value]) => [name, value]
      )
    );
  });
};

const getMetaContent = (attributeName, attributeValue) => {
  const tag = getMetaTags().find((metaTag) => {
    return metaTag[attributeName] === attributeValue;
  });

  return tag?.content;
};

const getPngDimensions = (imagePath) => {
  const buffer = fs.readFileSync(imagePath);

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
};

describe("OG image metadata", () => {
  test("uses the shared social image for Open Graph and Twitter", () => {
    expect(getMetaContent("property", "og:image")).toBe(
      "https://arreplegats.cat/og-image.png"
    );
    expect(getMetaContent("property", "og:image:width")).toBe("1200");
    expect(getMetaContent("property", "og:image:height")).toBe("630");
    expect(getMetaContent("property", "og:image:alt")).toBe(
      "Arreplegats de la Zona Universitària fent un castell"
    );
    expect(getMetaContent("property", "twitter:image")).toBe(
      "https://arreplegats.cat/og-image.png"
    );
    expect(getMetaContent("property", "twitter:image:alt")).toBe(
      "Arreplegats de la Zona Universitària fent un castell"
    );
  });

  test("provides a 1200x630 PNG image", () => {
    const imagePath = path.join(projectRoot, "public", "og-image.png");

    expect(fs.existsSync(imagePath)).toBe(true);
    expect(getPngDimensions(imagePath)).toEqual({
      width: 1200,
      height: 630,
    });
  });
});
