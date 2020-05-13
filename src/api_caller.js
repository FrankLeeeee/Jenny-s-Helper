import apis from "./apis";
import utils from "./utils";

const add_quiz = async (date, pass_count, word_list, sentence_list) => {
  var quiz_content = [];

  for (let i = 0; i < word_list.length; i++) {
    quiz_content.push({
      chinese: word_list[i].chinese,
      english: word_list[i].english,
      type: "word",
    });
  }

  for (let i = 0; i < sentence_list.length; i++) {
    quiz_content.push({
      chinese: sentence_list[i].chinese,
      english: sentence_list[i].english,
      type: "word",
    });
  }

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

  const res = await data.json();

  if (res.success) {
    return true;
  } else {
    return false;
  }
};

export default {
  add_quiz: add_quiz,
};
