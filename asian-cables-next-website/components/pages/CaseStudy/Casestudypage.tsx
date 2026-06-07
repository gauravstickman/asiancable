import Footer from '@/components/layout/Footer'
import WebsiteNavbar from '@/components/layout/WebsiteNavbar'
import React from 'react'
import MainBanner from './parts/main-banner'
import Related from './parts/related'
import CaseStudyInfo from './parts/CaseStudyInfo'
import CaseStudySpecs from './parts/CaseStudySpecs'
import { CaseStudyData } from './types'

interface CasestudypageProps {
  data: CaseStudyData;
  allCaseStudies?: any[];
}

function Casestudypage({ data, allCaseStudies = [] }: CasestudypageProps) {
  return (
    <>
<WebsiteNavbar/>
<MainBanner data={data}/>
<CaseStudyInfo data={data}/>
<CaseStudySpecs data={data}/>
<Related currentCategory={data.category} currentTitle={data.title} allCaseStudies={allCaseStudies} />
<Footer/>

    </>
  )
}

export default Casestudypage