import { useState, useCallback, useEffect } from "react";
import useAxios from "../../utils/useAxios";
import Toast from "../plugin/Toast";
import UserData from "../plugin/UserData";

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

export const useFetchStudentSummary = (userId) => {
  const axiosInstance = useAxios();
  const [studentSummary, setStudentSummary] = useState([]);

  useEffect(() => {
    const fetchStudentSummary = async () => {
      try {
        const res = await axiosInstance.get(`api/student/summary/${userId}/`);
        setStudentSummary(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    if (userId) fetchStudentSummary();
  }, [userId, axiosInstance]);

  return { studentSummary };
};

export const useFetchStudentCourseList = (userId) => {
  const axiosInstance = useAxios();
  const [studentCourseList, setStudentCourseList] = useState([]);

  useEffect(() => {
    const fetchStudentCourseList = async () => {
      try {
        const res = await axiosInstance.get(
          `api/student/course-list/${userId}/`
        );
        setStudentCourseList(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (userId) {
      fetchStudentCourseList();
    }
  }, [userId, axiosInstance]);

  return { studentCourseList };
};

export const useFetchStudentCourseDetail = (enrollment_id) => {
  const axiosInstance = useAxios();
  const [course, setCourse] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [studentReview, setStudentReview] = useState([]);

  const [completionPercent, setCompletionPercent] = useState(0);

  const fetchStudentCourseList = async () => {
    try {
      const res = await axiosInstance.get(
        `api/student/course-detail/${UserData()?.user_id}/${enrollment_id}/`
      );
      const data = res.data;
      console.log(data);
      setCourse(data);
      setQuestions(data.question_answer);
      setStudentReview(data.review);
      console.log(data.review);
      const completedPercent =
        data.completed_lesson.length * (100 / data.curriculum.length);
      setCompletionPercent(Math.round(completedPercent));
    } catch (err) {
      console.log(err);
    }
  };

  const markAsCompleted = async (variantItemId) => {
    const formData = new FormData();

    formData.append("user_id", UserData()?.user_id);
    formData.append("course_id", course?.course.id);
    formData.append("variant_item_id", variantItemId);
    try {
      const res = await axiosInstance.post(
        `api/student/course-completed/`,
        formData
      );
      fetchStudentCourseList();
    } catch (err) {
      console.log(err);
    }
  };

  const submitReview = async (review) => {
    const formDate = new FormData();
    formDate.append("user_id", UserData()?.user_id);
    formDate.append("course_id", course?.course.id);
    formDate.append("rating", review.rating);
    formDate.append("review", review.review_msg);

    try {
      const res = axiosInstance.post(`api/student/rate-course/`, formDate);
      Toast().fire({
        icon: "success",
        title: "Review created",
      });
      fetchStudentCourseList();
    } catch (error) {
      console.log(error);
    }
  };

  const removeReview = async (review) => {
    try {
      const res = await axiosInstance.delete(
        `api/student/review-detail/${UserData()?.user_id}/${review.id}/`
      );
      Toast().fire({
        icon: "success",
        title: "Review deleted",
      });
      fetchStudentCourseList();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudentCourseList();
  }, [enrollment_id, axiosInstance]);

  return {
    course,
    questions,
    studentReview,
    completionPercent,
    markAsCompleted,
    submitReview,
    removeReview,
  };
};
