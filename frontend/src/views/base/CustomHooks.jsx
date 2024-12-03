import { useState, useCallback } from "react";
import useAxios from "../../utils/useAxios";
import Toast from "../plugin/Toast";

export const useFetchCourses = () => {
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

  return { fetchCourses, courses, isLoading, error, setCourses };
};

export const useFetchSingleCourse = (slug) => {
  const axiosInstance = useAxios();
  const [isLoading, setIsLoading] = useState(false);
  const [course, setCourse] = useState({});
  const [error, setError] = useState(null);

  const fetchCourse = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(`api/course/course-detail/${slug}/`);
      setCourse(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [axiosInstance, slug]);

  return { fetchCourse, course, isLoading, error };
};
