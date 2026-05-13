import React from "react";
import { NavLink } from "react-router-dom";
import {
	buildHeroSrcSet,
	getHeroFallbackImage,
	HOME_HERO_IMAGES,
	HOME_HERO_SIZES,
	HOME_HERO_WEBP_IMAGES,
} from "../data/homeHeroImages";

const HERO_LINKS = [
	{ to: "/assajos", label: "UNEIX-T'HI" },
	{ to: "/agenda", label: "AGENDA" },
	{ to: "/contactar", label: "CONTACTA'NS!" },
];

function HomeHero({ images = HOME_HERO_IMAGES, webpImages = HOME_HERO_WEBP_IMAGES }) {
	const fallbackImage = getHeroFallbackImage(images);
	const srcSet = buildHeroSrcSet(images);
	const webpSrcSet = buildHeroSrcSet(webpImages);

	return (
		<section className="home-hero" aria-labelledby="home-hero-title">
			<picture className="home-hero__picture">
				<source type="image/webp" srcSet={webpSrcSet} sizes={HOME_HERO_SIZES} />
				<source srcSet={srcSet} sizes={HOME_HERO_SIZES} />
				<img
					className="home-hero__image"
					src={fallbackImage.url}
					srcSet={srcSet}
					sizes={HOME_HERO_SIZES}
					width={fallbackImage.width}
					height={fallbackImage.height}
					alt="Arreplegats aixecant un castell"
					fetchpriority="high"
					loading="eager"
					decoding="async"
				/>
			</picture>
			<div className="home-hero__overlay"></div>
			<div className="home-hero__content">
				<h1 id="home-hero-title" className="home-hero__title">
					ARREPLEGATS
				</h1>
				<h3 className="home-hero__tagline">ELS ÚNICS QUE HO PODEN FER</h3>
				<div className="home-hero__buttons">
					{HERO_LINKS.map((link) => (
						<NavLink key={link.to} to={link.to} className="home-hero__button">
							{link.label}
						</NavLink>
					))}
				</div>
			</div>
		</section>
	);
}

export default HomeHero;
