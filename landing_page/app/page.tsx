import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import UseCases from "../components/UseCases";
import Demo from "../components/Demo";
import Documentation from "../components/Documentation";
// import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

export default function Home() {
	return (
		<main>
			<Hero />
			<HowItWorks />
			<UseCases />
			<Features />
			<Demo />
			<Documentation />
			{/* <Testimonials /> */}
			<Footer />
		</main>
	);
}
