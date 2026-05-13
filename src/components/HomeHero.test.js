import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomeHero from "./HomeHero";
import {
	buildHeroSrcSet,
	getHeroFallbackImage,
	HOME_HERO_IMAGES,
	HOME_HERO_SIZES,
	HOME_HERO_WEBP_IMAGES,
} from "../data/homeHeroImages";

describe("HomeHero", () => {
	it("renders the responsive homepage hero with primary calls to action", () => {
		render(
			<MemoryRouter>
				<HomeHero />
			</MemoryRouter>
		);

		const fallbackImage = getHeroFallbackImage(HOME_HERO_IMAGES);
		const heroImage = screen.getByRole("img", { name: "Arreplegats aixecant un castell" });

		expect(screen.getByRole("heading", { level: 1, name: "ARREPLEGATS" })).toBeInTheDocument();
		expect(screen.getByRole("heading", { level: 3, name: "ELS ÚNICS QUE HO PODEN FER" })).toBeInTheDocument();
		expect(heroImage).toHaveAttribute("src", fallbackImage.url);
		expect(heroImage).toHaveAttribute("srcset", buildHeroSrcSet(HOME_HERO_IMAGES));
		expect(heroImage).toHaveAttribute("sizes", HOME_HERO_SIZES);
		expect(heroImage).toHaveAttribute("width", String(fallbackImage.width));
		expect(heroImage).toHaveAttribute("height", String(fallbackImage.height));
		expect(heroImage).toHaveAttribute("fetchpriority", "high");
		expect(document.querySelector('source[type="image/webp"]')).toHaveAttribute(
			"srcset",
			buildHeroSrcSet(HOME_HERO_WEBP_IMAGES)
		);
		expect(screen.getByRole("link", { name: "UNEIX-T'HI" })).toHaveAttribute("href", "/assajos");
		expect(screen.getByRole("link", { name: "AGENDA" })).toHaveAttribute("href", "/agenda");
		expect(screen.getByRole("link", { name: "CONTACTA'NS!" })).toHaveAttribute("href", "/contactar");
	});
});
