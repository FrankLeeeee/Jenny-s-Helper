const api = "http://47.74.186.167:8000";

export default {
  // all users
  login: `${api}/user/login`,
  changePassword: `${api}/user/update`,
  fetchStudentResults: `${api}/word/completion`,

  // teachers
  addDictation: `${api}/quiz/add`,
  fetchAllStudentResults: `${api}/pass/get`,
  fetchQuizListForTeacher: `${api}/quiz/all`,

  // students
  fetchQuizListForStudent: `${api}/student/quiz/completion`,
  fetchQuizContent: `${api}/student/quiz/get`,
  submitQuizResults: `${api}/student/quiz/submit`,
};
