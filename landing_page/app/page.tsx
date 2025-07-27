import Hero from "../components/home/Hero";
import HowItWorks from "../components/home/HowItWorks";
import Features from "../components/home/Features";
import UseCases from "../components/UseCases";
import Demo from "../components/home/Demo";
import Documentation from "../components/docs/Documentation";
// import Testimonials from "../components/Testimonials";
import Footer from "../components/home/Footer";

export default function Home() {
	return (
		<main>
			<Hero />
			<HowItWorks />
			<UseCases />
			<Features />
			<Demo />
			{/* <Documentation /> */}
			{/* <Testimonials /> */}
			<Footer />
		</main>
	);
}
