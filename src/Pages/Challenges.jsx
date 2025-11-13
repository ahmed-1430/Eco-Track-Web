import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChallengeCard from '../Components/Card/ChallengeCard';
import ChallengeFilter from '../Components/ChallengeFilter';
import Spinner from '../Components/Spinner';

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    category: '',
    status: 'all', 
    participantsMin: '',
    participantsMax: ''
  });

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (filters.category) params.category = filters.category;
      if (filters.status && filters.status !== 'all') params.status = filters.status;
      if (filters.participantsMin) params.participants_min = filters.participantsMin;
      if (filters.participantsMax) params.participants_max = filters.participantsMax;

      const baseURL = import.meta.env.VITE_API_BASE_URL || '';
      const res = await axios.get(`${baseURL}/api/challenges`, { params });

      console.log('Challenges fetched:', res.data);
      setChallenges(res.data?.data || []);
    } catch (err) {
      console.error('Fetch Challenges Error:', err);
      setError('Failed to load challenges. Please try again.');
      setChallenges([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchChallenges();
  }, [filters]);

  return (
    <div className='bg-linear-to-b from-green-50 to-white'>
      <div className="w-11/12 mx-auto py-4 md:py-8 space-y-6 pt-20">
      <h1 className="text-3xl font-bold text-green-700 mb-4 md:pt-20">Browse Challenges</h1>
      <ChallengeFilter filters={filters} setFilters={setFilters} />
      {loading && <Spinner />}
      {error && <p className="text-red-500 font-semibold mt-4">{error}</p>}
      {!loading && !error && challenges.length === 0 && (
        <p className="text-gray-500 mt-4">No challenges found for the selected filters.</p>
      )}
      {!loading && !error && challenges.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6">
          {challenges.map((ch) => (
            <ChallengeCard key={ch._id} challenge={ch} />
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default Challenges;
