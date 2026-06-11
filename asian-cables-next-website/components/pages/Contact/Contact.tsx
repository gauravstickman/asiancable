import Footer from '@/components/layout/Footer'
import ContactOverview from './Parts/ContactOverview'
import ContactForm from './Parts/ContactForm'
import OfficeLocations from './Parts/OurOffices'
import DistributorFinder from './Parts/DistributorFinder'
import WebsiteNavbarDark from '@/components/layout/Navbardark'

const Contact = ({ data }: { data?: any }) => {
  return (
    <div>
    <WebsiteNavbarDark/>
    <ContactOverview data={data} />
    <ContactForm data={data} />
    <OfficeLocations data={data} />
    <DistributorFinder data={data} />
      <Footer/>
    </div>
  )
}

export default Contact