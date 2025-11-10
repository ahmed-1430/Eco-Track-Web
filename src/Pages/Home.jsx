import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import Spinner from "../Components/Spinner";
import { FaLeaf, FaRecycle, FaCalendarAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import StatsCard from "../Components/Card/StatsCard";
import EventCard from "../Components/Card/EventCard";
import TipCard from "../Components/Card/TipCard";
import ChallengeCard from "../Components/Card/ChallengeCard";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


const Home = () => {
  const [stats, setStats] = useState({
    totalChallenges: 0,
    totalCO2Saved: 0,
    totalEvents: 0,
  });
  const [challenges, setChallenges] = useState([]);
  const [tips, setTips] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_BASE_URL || "";

        const [statsRes, challengesRes, tipsRes, eventsRes] = await Promise.all([
          axios.get(`${baseURL}/api/statistics`),
          axios.get(`${baseURL}/api/challenges`),
          axios.get(`${baseURL}/api/tips`),
          axios.get(`${baseURL}/api/events`),
        ]);

        setStats(statsRes.data?.data || {});
        setChallenges(challengesRes.data?.data || []);
        setTips(tipsRes.data?.data || []);
        setEvents(eventsRes.data?.data || []);
      } catch (err) {
        console.error(" Fetch Error:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Spinner />;
  if (error)
    return (
      <div className="text-center text-red-500 mt-20 font-semibold">
        {error}
      </div>
    );

  const featuredChallenges = challenges.slice(0, 4);

  return (
    <div className="space-y-16 py-4 md:py-8 bg-linear-to-b from-green-50 to-white">
      <section className="relative w-11/12 mx-auto pt-20">
        <Swiper
          spaceBetween={30}
          centeredSlides
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          modules={[Autoplay, Pagination, Navigation]}
          className="rounded-2xl overflow-hidden shadow-lg"
        >
          {featuredChallenges.map((ch) => (
            <SwiperSlide key={ch._id}>
              <div className="relative">
                <img src={ch.imageUrl} alt={ch.title} className="w-full h-[400px] object-fill brightness-75"/>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                  <h2 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">
                    {ch.title}
                  </h2>
                  <p className="max-w-2xl text-lg mb-5 opacity-90">
                    {ch.description.slice(0, 100)}...
                  </p>
                  <Link to={`/challenges/${ch._id}`} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition font-medium shadow-lg">View Challenge</Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <section className="w-11/12 mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-green-800 border-l-4 border-green-600 pl-3">Live Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <StatsCard title="Challenges" value={stats?.totalChallenges ?? 0} icon={<FaLeaf size={28} />} />
          <StatsCard title="CO₂ Saved" value={`${stats?.totalCO2Saved ?? 0} kg`} icon={<FaRecycle size={28} />} />
          <StatsCard title="Events" value={stats?.totalEvents ?? 0} icon={<FaCalendarAlt size={28} />} />
        </div>
      </section>
      <section className="w-11/12 mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-green-800 border-l-4 border-green-600 pl-3">Active Challenges</h2>
        {challenges?.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((ch) => (
              <ChallengeCard key={ch._id} challenge={ch} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No active challenges found.</p>
        )}
      </section>
      <section className="w-11/12 mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-green-800 border-l-4 border-green-600 pl-3">Recent Tips</h2>
        {tips?.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((t) => (
              <TipCard key={t._id} tip={t} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No tips available.</p>
        )}
      </section>
      <section className="w-11/12 mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-green-800 border-l-4 border-green-600 pl-3">Upcoming Events</h2>
        {events?.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((e) => (
              <EventCard key={e._id} event={e} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No upcoming events found.</p>
        )}
      </section>
    </div>
  );
};

export default Home;
