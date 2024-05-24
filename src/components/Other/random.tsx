// src/hooks/useRandomUsers.tsx
import { useState, useEffect } from 'react';

interface Testimonial {
  text: string;
  name: string;
  rating: number;
}

const staticTestimonials: Testimonial[] = [
  {
    text: "Xendpal increased our team's collaboration while working from home, which has increased our flexibility and could revolutionize our office culture.",
    name: "Chance Rosser",
    rating: 5,
  },
  {
    text: "Xendpal easily allows me to transfer what's in my mind to another person.",
    name: "Ahmad Stanton",
    rating: 5,
  },
  {
    text: "Our team is working remotely—everyone's in a different time zone. Xendpal is a great hub for us to all work at once and seamlessly share files.",
    name: "Kiana Botosh",
    rating: 5,
  },
];

const useRandomUsers = (count: number) => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`https://randomuser.me/api/?results=${count}`);
        const data = await response.json();
        const combinedData = data.results.map((user: any, index: number) => ({
          ...user,
          testimonial: staticTestimonials[index % staticTestimonials.length],
        }));
        setUsers(combinedData);
      } catch (error) {
        console.error('Error fetching random users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [count]);

  return { users, loading };
};

export default useRandomUsers;
