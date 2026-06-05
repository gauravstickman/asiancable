import Footer from '@/components/layout/Footer'
import WebsiteNavbar from '@/components/layout/WebsiteNavbar'
import React from 'react'
import MainBanner from './parts/main-banner'
import Related from './parts/related'
import CaseStudyInfo from './parts/CaseStudyInfo'
import CaseStudySpecs from './parts/CaseStudySpecs'

function Casestudypage() {
  return (
    <>
<WebsiteNavbar/>
<MainBanner/>
<CaseStudyInfo/>
<CaseStudySpecs/>
<Related/>
<Footer/>

    </>
  )
}

export default Casestudypage