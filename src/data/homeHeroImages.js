export const HOME_HERO_IMAGES = [
	{ width: 576, height: 384, url: "/images/resized/2d8fm-arreplegats-2016-576_x_384.jpeg" },
	{ width: 768, height: 512, url: "/images/resized/2d8fm-arreplegats-2016-768_x_512.jpeg" },
	{ width: 992, height: 661, url: "/images/resized/2d8fm-arreplegats-2016-992_x_661.jpeg" },
	{ width: 1200, height: 800, url: "/images/resized/2d8fm-arreplegats-2016-1200_x_800.jpeg" },
];

export const HOME_HERO_WEBP_IMAGES = [
	{ width: 576, height: 384, url: "/images/optimized/2d8fm-arreplegats-2016-576_x_384.webp" },
	{ width: 768, height: 512, url: "/images/optimized/2d8fm-arreplegats-2016-768_x_512.webp" },
	{ width: 992, height: 661, url: "/images/optimized/2d8fm-arreplegats-2016-992_x_661.webp" },
	{ width: 1200, height: 800, url: "/images/optimized/2d8fm-arreplegats-2016-1200_x_800.webp" },
	{ width: 1600, height: 1067, url: "/images/optimized/2d8fm-arreplegats-2016-1600_x_1067.webp" },
];

export function buildHeroSrcSet(images) {
	return images.map((img) => `${img.url} ${img.width}w`).join(", ");
}

export const HOME_HERO_SIZES = "(max-width: 576px) 576px, (max-width: 768px) 768px, (max-width: 992px) 992px, (max-width: 1200px) 1200px, 1600px";

export function getHeroFallbackImage(images = HOME_HERO_IMAGES) {
	return images.find((img) => img.width === 1200) || images[0];
}
