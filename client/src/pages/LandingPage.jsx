import React from 'react'
import Navbar from '../components/Header/Navbar'
import LearningSection from '../components/Landing/LearningSection'
import WhyChoose from '../components/Landing/WhyChoose'
import Footer from '../components/Footer/Footer'
import HeroContent from '../components/Landing/HeroContent'


const App = () => {
  return (
    <div className='relative bg-[#101010] backdrop-blur-2xl min-h-screen overflow-hidden'>

      <div className="absolute -top-45 left-1/3 -translate-x-1/2 -z-10">
        <div className=" w-[90px] md:w-[250px] h-[350px] md:h-[450px] bg-[#24cfa6] rotate-55 rounded-[50%] blur-[50px] md:blur-[90px] opacity-25"></div>
      </div>
      <div className="absolute -top-45 left-3/5 -translate-x-1/2 -z-10">
        <div className=" w-[50px] md:w-[250px] h-[250px] md:h-[350px] bg-[#24cfa6] -rotate-55 rounded-[50%] blur-[50px] md:blur-[80px] opacity-25"></div>
      </div>
      <div className="absolute top-150 -right-15 translate-x-1/2 -z-10">
        <div className="w-[450px] h-[450px] bg-[#24cfa6] rounded-[50%] blur-[80px] opacity-25"></div>
      </div>
      <div className="absolute bottom-90 -left-70 translate-x-1 -z-10">
        <div className="w-[450px] h-[450px] bg-[#24cfa6] rounded-[50%] blur-[80px] opacity-25"></div>
      </div>

      <Navbar />

      <div className='max-w-[1500px] mx-auto'>

        <HeroContent/>
        <LearningSection />
        <WhyChoose />

      </div>

      <Footer />


    </div>
  )
}

export default App