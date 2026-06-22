import Banner from "@/components/homePage/Banner";
import FeaturedPets from "@/components/homePage/FeaturesPage";
import HomePage from "@/components/homePage/FeaturesPage";
import StatsSection from "@/components/homePage/StatusSection.";
import WhyPetHeaven from "@/components/homePage/Why";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Banner/>
    <StatsSection/> 
    <FeaturedPets/>
    <WhyPetHeaven/>
    </>
  );
}
