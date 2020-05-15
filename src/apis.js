const api = "http://47.74.186.167:8000";

export default {
  // all users
  login: `${api}/user/login`,
  changePassword: `${api}/user/update`,
  fetchStudentResults: `${api}/quiz/completion`,

  // teachers
  addDictation: `${api}/teacher/quiz/add`,
  fetchAllStudentResults: `${api}/teacher/pass`,
  fetchQuizListForTeacher: `${api}/teacher/quiz`,

  // students
  fetchQuizListForStudent: `${api}/student/quiz/completion`,
  fetchQuizContent: `${api}/student/quiz`,
  submitQuizResults: `${api}/student/quiz/submit`,
};
