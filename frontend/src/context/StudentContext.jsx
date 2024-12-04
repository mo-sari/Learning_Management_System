// import { useState, useContext, createContext } from "react";
// import UserData from "../views/plugin/UserData";
// import apiInstanceAxios from "../utils/useAxios";

// const StudentContext = createContext();

// export const StudnetProvider = ({ children }) => {
//   const [studentSummary, setStudentSummary] = useState([]);
//   const [studentCourseList, setStudentCourseList] = useState([]);

//   const fetchStudentSummary = async () => {
//     try {
//       const res = await apiInstanceAxios().get(
//         `api/student/summary/${UserData().user_id}/`
//       );
//       setStudentSummary(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const fetchStudentCourseList = async () => {
//     try {
//       const res = await apiInstanceAxios().get(
//         `api/student/course-list/${UserData().user_id}/`
//       );
//       setStudentCourseList(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <StudentContext.Provider
//       value={{
//         fetchStudentSummary,
//         fetchStudentCourseList,
//         studentSummary,
//         studentCourseList,
//       }}
//     >
//       {children}
//     </StudentContext.Provider>
//   );
// };

// export const useStudentContext = () => {
//   return useContext(StudentContext);
// };
