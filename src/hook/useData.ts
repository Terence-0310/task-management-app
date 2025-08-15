import { useEffect, useState } from 'react';

interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  role: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  categoryId: number;
  userId: number;
}

interface Category {
  id: number;
  name: string;
}

interface Data {
  users: User[];
  tasks: Task[];
  categories: Category[];
}

export function useData() {
  const [data, setData] = useState(null as Data | null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const [error, setError] = useState<string | null>(null);
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/db.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
