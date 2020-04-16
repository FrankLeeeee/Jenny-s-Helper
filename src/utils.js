import React from "react";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";
import { AiFillAccountBook } from "react-icons/ai";

function formatDate(d) {
  var month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

function notify(msg_type, msg, duration = 3000) {
  switch (msg_type) {
    case "error":
      toaster.notify(
        <div className="fluid-continer">
          <div className="row">
            <div className="col">
              <AiFillAccountBook />
              hello
            </div>
          </div>
        </div>,
        {
          duration: duration,
        }
      );
      break;
  }
}

export default notify;
