"use client";
import WebsiteNavbar from '@/components/layout/WebsiteNavbar'
import EventsHeader from '@/components/pages/Events/Parts/EventsHeader'
import EventIntroduction from "@/components/pages/Events/Parts/EventIntroduction";
import EventShareSidebar from "@/components/pages/Events/Parts/EventShareSidebar";
import React, { useEffect, useState } from 'react'
import Footer from '@/components/layout/Footer';
import { useParams } from 'next/navigation';
import api from '@/utils/api';

export const dynamic = 'force-dynamic';


function EventSlugPage() {
  const { slug } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/slug/${slug}`);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchEvent();
    }
  }, [slug]);

  useEffect(() => {
    if (!loading && event) {
      const elements = document.querySelectorAll(".reveal-section");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
            }
          });
        },
        {
          threshold: 0.12,
        }
      );
      elements.forEach((el) => {
        el.classList.remove("is-visible");
        observer.observe(el);
      });
      return () => observer.disconnect();
    }
  }, [loading, event]);


  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!event) return <div className="min-h-screen flex items-center justify-center">Event not found</div>;

  return (
    <div>
      <WebsiteNavbar />
      <EventsHeader event={event} />
      <div className="mx-auto flex max-w-[1274px] flex-col gap-[46px] md:px-0 px-5 lg:flex-row lg:justify-between my-14 items-start">
        <EventIntroduction event={event} />
        <EventShareSidebar />
      </div>
      <Footer />
    </div>
  )
}

export default EventSlugPage;
