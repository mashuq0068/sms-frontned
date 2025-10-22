import { useState, useEffect } from 'react';
import studentsData from '@/mock/students.json';

export const useStudents = () => {
  const [students, setStudents] = useState(studentsData);
  const [loading, setLoading] = useState(false);

  // Future: Replace with actual API call
  const fetchStudents = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setStudents(studentsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return { students, loading, refetch: fetchStudents };
};
