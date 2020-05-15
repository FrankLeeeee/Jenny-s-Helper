import apis from "./apis";
import utils from "./utils";

const add_quiz = async (date, pass_count, word_list, sentence_list) => {
  var quiz_content = word_list.concat(sentence_list);

  const data = await fetch(apis.addDictation, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: window.localStorage.token,
    },
    body: JSON.stringify({
      task_id: utils.formatDate(date),
      word_list: quiz_content,
      pass_count: pass_count,
    }),
    mode: "cors",
    cache: "no-cache",
  });

  return data;
};

const fetch_all_student_results = async (task_id) => {
  const data = await fetch(
    `${apis.fetchAllStudentResults}?task_id=${task_id}`,
    {
      method: "GET",
      headers: {
        token: window.localStorage.token,
      },
      mode: "cors",
      cache: "no-cache",
    }
  );

  return data;
};

const fetch_student_results = async (user_id, task_id) => {
  const data = await fetch(
    `${apis.fetchStudentResults}?user_id=${user_id}&task_id=${task_id}`,
    {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
    }
  );

  return data;
};

const fetch_quiz = async (task_id) => {
  const data = await fetch(`${apis.fetchQuizContent}?task_id=${task_id}`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
  });

  return data;
};

const submit_quiz_results = async (task_id, word_list, sentence_list) => {
  var qn_list = word_list.concat(sentence_list);

  qn_list = qn_list.map((item) => {
    return {
      id: item.word_id,
      student_answer: item.student_answer,
    };
  });

  const data = await fetch(apis.submitQuizResults, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: window.localStorage.token,
    },
    body: JSON.stringify({
      task_id: task_id,
      word_list: qn_list,
    }),
    mode: "cors",
    cache: "no-cache",
  });

  return data;
};

const fetch_quiz_list_for_student = async (year, month) => {
  const data = await fetch(
    `${apis.fetchQuizListForStudent}?select_time=${year}-${month}`,
    {
      method: "GET",
      headers: {
        token: window.localStorage.token,
      },
      mode: "cors",
      cache: "no-cache",
    }
  );
  return data;
};

const login = async (user_id, password) => {
  const data = await fetch(apis.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: user_id,
      password: password,
    }),
    mode: "cors",
    cache: "no-cache",
  });

  return data;
};

const change_password = async (user_id, old_password, new_password) => {
  const data = await fetch(apis.changePassword, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: user_id,
      old_password: old_password,
      new_password: new_password,
    }),
    mode: "cors",
    cache: "no-cache",
  });
  return data;
};

const fetch_quiz_list_for_teacher = async (year, month) => {
  const data = await fetch(
    `${apis.fetchQuizListForTeacher}?task_id=${year}-${month}`,
    {
      method: "GET",
      headers: {
        token: window.localStorage.token,
      },
      mode: "cors",
      cache: "no-cache",
    }
  );
  return data;
};

export default {
  add_quiz: add_quiz,
  fetch_all_student_results: fetch_all_student_results,
  fetch_quiz: fetch_quiz,
  fetch_student_results: fetch_student_results,
  submit_quiz_results: submit_quiz_results,
  fetch_quiz_list_for_student: fetch_quiz_list_for_student,
  login: login,
  change_password: change_password,
  fetch_quiz_list_for_teacher: fetch_quiz_list_for_teacher,
};
