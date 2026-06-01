import Banner from "@/components/homePage/Banner";
import StatsSection from "@/components/homePage/StatusSection.";
import WhyPetHeaven from "@/components/homePage/Why";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Banner/>
    <StatsSection/> 
    <WhyPetHeaven/>
    </>
  );
}
