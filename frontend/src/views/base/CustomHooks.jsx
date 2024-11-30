import { useState, useEffect } from "react";
import useAxios from "../../utils/useAxios";
import apiInstance from "../../utils/axios";

const useFetchCourses = () => {
  const axiosInstance = useAxios();
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(`api/course/course-list/`);
      setCourses(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchCourses, courses, isLoading, error };
};

export default useFetchCourses;
