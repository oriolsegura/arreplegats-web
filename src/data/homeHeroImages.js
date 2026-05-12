export const HOME_HERO_IMAGES = [
	{ width: 576, height: 384, url: "images/resized/2d8fm-arreplegats-2016-576_x_384.jpeg" },
	{ width: 768, height: 512, url: "images/resized/2d8fm-arreplegats-2016-768_x_512.jpeg" },
	{ width: 992, height: 661, url: "images/resized/2d8fm-arreplegats-2016-992_x_661.jpeg" },
	{ width: 1200, height: 800, url: "images/resized/2d8fm-arreplegats-2016-1200_x_800.jpeg" },
	{ width: 1920, height: 1280, url: "images/resized/2d8fm-arreplegats-2016-1920_x_1280.jpeg" },
];

export function buildHeroSrcSet(images) {
	return images.map((img) => `${img.url} ${img.width}w`).join(", ");
}

export function getHeroFallbackImage(images = HOME_HERO_IMAGES) {
	return images.find((img) => img.width === 1200) || images[0];
}
