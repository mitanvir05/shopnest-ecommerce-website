import TrendingProducts from "../shop/TrendingProducts"
import Banner from "./Banner"
import Categories from "./Categories"
import DealsSection from "./DealsSection"
import HeroSection from "./HeroSection"

const Home = () => {
  return (
    <>
     <Banner/> 
     <Categories/>
     <HeroSection/>
     <TrendingProducts/>
     <DealsSection/>
    </>
  )
}

export default Home
