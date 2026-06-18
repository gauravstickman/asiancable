"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../layout/Footer";
import WebsiteNavbar from "../../layout/WebsiteNavbar";
import TestimonialsSection from "./parts/TestimonialsSection";
import CultureValuesSection from "./parts/CultureValuesSection";
import DayInLifeSection from "./parts/DayInLifeSection";
import ExperienceSection from "./parts/ExperienceSection";
import Hero from "./parts/Hero";
import LifeBeyondWorkSection from "./parts/LifeBeyondWorkSection";
import OpenRolesSection from "./parts/OpenRolesSection";
import WhyWorkSection from "./parts/WhyWorkSection";

const Lifepage = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/life-at-asian-cables`);
        if (response.data?.success) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch Life at Asian Cables data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1E3C8C]"></div>
      </div>
    );
  }

  if (!data) {
    return <div>Failed to load data.</div>;
  }

  return (
    <div>
      <WebsiteNavbar />
      <Hero data={data} />
      <WhyWorkSection data={data} /> 
      <CultureValuesSection data={data} />
      <ExperienceSection data={data} />
      <TestimonialsSection data={data} /> 
      <DayInLifeSection data={data} />
      <LifeBeyondWorkSection data={data} />
      <OpenRolesSection data={data} />
      <Footer />
    </div>
  );
};

export default Lifepage;