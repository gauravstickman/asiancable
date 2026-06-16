import WebsiteNavbar from '@/components/layout/WebsiteNavbar'
import EventsHeader from '@/components/pages/Events/Parts/EventsHeader'
import EventIntroduction from "@/components/pages/Events/Parts/EventIntroduction";
import EventShareSidebar from "@/components/pages/Events/Parts/EventShareSidebar";
import React from 'react'
import Footer from '@/components/layout/Footer';

function Events() {
  return (
    <div>
        <WebsiteNavbar/>
        <EventsHeader/>
       <div className="mx-auto flex max-w-[1274px] flex-col gap-[46px] md:px-0 px-5 lg:flex-row lg:justify-between my-14 items-flex-start">
  <EventIntroduction />
  <EventShareSidebar />
</div>
<Footer/>
    </div>
  )
}

export default Events