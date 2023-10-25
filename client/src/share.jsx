import React, { useState, useEffect } from "react";
import "./login.css";
import { FaUser, FaLock, FaTextHeight } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";

let count = 1;

function AddEditor(item, index) {
  if (item == "" || item === null) {
    return;
  }

  document.getElementById("ppls-bdy").innerHTML +=
    `<tr>
    <td>` +
    count.toString() +
    `</td>
    <td>` +
    item +
    `</td>
    <td><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V7C19 7.55228 19.4477 8 20 8C20.5523 8 21 7.55228 21 7V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM22.1213 10.7071C20.9497 9.53553 19.0503 9.53553 17.8787 10.7071L16.1989 12.3869L11.2929 17.2929C11.1647 17.4211 11.0738 17.5816 11.0299 17.7575L10.0299 21.7575C9.94466 22.0982 10.0445 22.4587 10.2929 22.7071C10.5413 22.9555 10.9018 23.0553 11.2425 22.9701L15.2425 21.9701C15.4184 21.9262 15.5789 21.8353 15.7071 21.7071L20.5556 16.8586L22.2929 15.1213C23.4645 13.9497 23.4645 12.0503 22.2929 10.8787L22.1213 10.7071ZM18.3068 13.1074L19.2929 12.1213C19.6834 11.7308 20.3166 11.7308 20.7071 12.1213L20.8787 12.2929C21.2692 12.6834 21.2692 13.3166 20.8787 13.7071L19.8622 14.7236L18.3068 13.1074ZM16.8923 14.5219L18.4477 16.1381L14.4888 20.097L12.3744 20.6256L12.903 18.5112L16.8923 14.5219Z" fill="#fff"/>
    </svg></td>
<td><svg class="del_val" typ="edit" email="` +
    item +
    `" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-line-join="round"/>
</svg></td>
</tr>`;
  count = count + 1;
}
function AddVisitor(item, index) {
  if (item == "" || item === null) {
    return;
  }

  document.getElementById("ppls-bdy").innerHTML +=
    `<tr>
    <td>` +
    count.toString() +
    `</td>
    <td>` +
    item +
    `</td>
    <td><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#fff" stroke-width="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#fff" stroke-width="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg></td>
    <td><svg class="del_val" typ="view" email="` +
    item +
    `" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-line-join="round"/>
    </svg></td>
    </tr>`;
  count = count + 1;
}

function SharePage() {
  const queryParameters = new URLSearchParams(window.location.search);
  const html_id = queryParameters.get("id");
  useEffect(() => {
    axios
      .post(
        "http://127.0.0.1:8000/apis/get_html/",
        {
          username: Cookies.get("username"),
          password: Cookies.get("password"),
          id: html_id,
        },
        { withCredentials: true, "X-CSRFToken": Cookies.get("csrftoken") }
      )
      .then(function (response) {
        if (response.data == "Not Logged In") {
          window.location.replace("/login");
        }
        if (response.data == "No access") {
          alert("Permission denied");
          window.location.replace("/projects");
        }
        if (response.data["view_any"] == "yes") {
          document.getElementById("anyone").selected = true;
        }
        if (response.data["edit_access"] === null) {
          console.log("No editors");
        } else {
          var editors = response.data["edit_access"].split(", ");
          editors.forEach(AddEditor);
        }
        if (response.data["view_access"] === null) {
          console.log("No viewers");
        } else {
          var viewers = response.data["view_access"].split(", ");
          viewers.forEach(AddVisitor);
        }
        window.parent.postMessage(count - 1);
      });
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    var data = new FormData(event.target);
    document.getElementById("firstpart").style.display = "flex";
    document.getElementById("secoundpart").style.display = "none";
    if (data.get("email") == "") {
      alert("No Email");
    } else {
      axios
        .post(
          "http://127.0.0.1:8000/apis/share/",
          {
            username: Cookies.get("username"),
            password: Cookies.get("password"),
            id: html_id,
            email: data.get("email"),
            access: data.get("access"),
          },
          { withCredentials: true, "X-CSRFToken": Cookies.get("csrftoken") }
        )
        .then(function (response) {
          console.log(response.data);
          if (response.data == "Success") {
            alert("Added Successfully");
            window.location.reload();
            //window.location.replace("/editor/?id="+html_id)
          } else {
            alert("Error: " + response.data);
          }
        });
    }
  };
  function copy() {
    window.prompt(
      "Copy to clipboard: Ctrl(⌘)+C, Enter",
      window.location.href.replace("/share/", "/view/")
    );
  }
  function view_ac() {
    var e = document.getElementById("access");
    axios
      .post(
        "http://127.0.0.1:8000/apis/view_access/",
        {
          username: Cookies.get("username"),
          password: Cookies.get("password"),
          id: html_id,
          access: e.value,
        },
        { withCredentials: true, "X-CSRFToken": Cookies.get("csrftoken") }
      )
      .then(function (response) {
        console.log(response.data);
        if (response.data == "Success") {
          alert("Updated Successfully");
          //location.reload();
          //window.location.replace("/editor/?id="+html_id)
        } else {
          alert("something is wrong");
        }
      });
  }
  useEffect(() => {
    const container = document.querySelector("#ppls-bdy");

    // Click handler for entire table container
    container.addEventListener("click", function (e) {
      console.log("yo");
      // But only alert for svg
      if (e.target.tagName == "svg") {
        //alert("yo");
        if (e.target.hasAttribute("email")) {
          axios
            .post(
              "http://127.0.0.1:8000/apis/delete_access/",
              {
                username: Cookies.get("username"),
                password: Cookies.get("password"),
                id: html_id,
                email: e.target.getAttribute("email"),
                access: e.target.getAttribute("typ"),
              },
              { withCredentials: true, "X-CSRFToken": Cookies.get("csrftoken") }
            )
            .then(function (response) {
              console.log(response.data);
              if (response.data == "Success") {
                alert("Deleted Successfully");
                window.location = window.location;
                //window.location.replace("/editor/?id="+html_id)
              } else {
                alert("something is wrong");
              }
            });
        }
      }
    });
  });
  function nextform() {
    document.getElementById("firstpart").style.display = "none";
    document.getElementById("secoundpart").style.display = "flex";
  }

  return (
    <div className="App">
      <div className="bdy align" id="sharebdy">
        <div className="grid" id="grdd" style={{ backgroundColor: "#2c3338" }}>
          <form className="form login" onSubmit={handleSubmit} id="frmmm">
            <br />
            <center>
              <b style={{ fontSize: 20 }}>Share Project</b>
            </center>
            <div className="form__field selectview" id="firstpart">
              <label>Share with:</label>
              <input
                style={{ borderRadius: 0 }}
                id="login__password"
                type="text"
                name="email"
                className="form__input"
                placeholder="Email"
              />
              <button
                type="button"
                onClick={nextform}
                style={{
                  width: 50,
                  borderWidth: 0,
                  borderEndEndRadius: 5,
                  borderTopRightRadius: 5,
                  backgroundColor: "#ea4c88",
                  fontSize: 20,
                  color: "white",
                }}
              >
                <svg
                  className="arrow_btn"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z"
                    fill="#fff"
                  />
                </svg>
              </button>
            </div>
            <div
              className="form__field selectview"
              id="secoundpart"
              style={{ display: "none" }}
            >
              <label>Permissions:</label>
              <select name="access" className="form__input sel_share" id="cars">
                <option value="edit">Edit and View</option>
                <option value="view">View Only</option>
              </select>
              <button
                style={{
                  width: 50,
                  borderWidth: 0,
                  borderEndEndRadius: 5,
                  borderTopRightRadius: 5,
                  backgroundColor: "#ea4c88",
                  fontSize: 20,
                  color: "white",
                }}
              >
                <svg
                  className="arrow_btn"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z"
                    fill="#fff"
                  />
                </svg>
              </button>
            </div>
            Peoples:
            <br />
            <div className="form__field selectview">
              <table className="ppls" style={{ padding: 10 }} id="ppls">
                <tbody id="ppls-bdy"></tbody>
              </table>
            </div>
            <hr width="50" style={{ borderRadius: 2 }} />
            <div className="form__field selectview">
              <label>Share link:</label>
              <select
                name="access"
                className="form__input sel_share"
                id="access"
                onChange={view_ac}
              >
                <option value="none">Restricted</option>
                <option value="any" id="anyone">
                  Anyone with link
                </option>
              </select>

              <svg
                className="share_svg"
                width="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={copy}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M21 8C21 6.34315 19.6569 5 18 5H10C8.34315 5 7 6.34315 7 8V20C7 21.6569 8.34315 23 10 23H18C19.6569 23 21 21.6569 21 20V8ZM19 8C19 7.44772 18.5523 7 18 7H10C9.44772 7 9 7.44772 9 8V20C9 20.5523 9.44772 21 10 21H18C18.5523 21 19 20.5523 19 20V8Z"
                  fill="#fff"
                />
                <path
                  d="M6 3H16C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1H6C4.34315 1 3 2.34315 3 4V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V4C5 3.44772 5.44772 3 6 3Z"
                  fill="#fff"
                />
              </svg>
            </div>
            <br />
          </form>
          <input id="alleditors" type="hidden" value="" />
          <input id="allviewers" type="hidden" value="" />
        </div>
      </div>
    </div>
  );
}

export default SharePage;
