import Footer from '@/components/layout/Footer'
import ContactOverview from './Parts/ContactOverview'
import ContactForm from './Parts/ContactForm'
import OfficeLocations from './Parts/OurOffices'
import DistributorFinder from './Parts/DistributorFinder'
import WebsiteNavbarDark from '@/components/layout/Navbardark'

const Contact = () => {
  return (
    <div>
    <WebsiteNavbarDark/>
    <ContactOverview/>
    <ContactForm/>
    <OfficeLocations/>
    <DistributorFinder/>
      <Footer/>
    </div>
  )
}

export default Contact