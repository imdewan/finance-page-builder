import React, { useState, useEffect } from "react";
import grapejs, { Button } from "grapesjs";
import gjsPresentWebpage from "grapesjs-preset-webpage";
import plugin from "grapesjs-blocks-basic";
import { FaMoon, FaSun } from "react-icons/fa";
import "./App.css";
import axios from "axios";
import Cookies from "js-cookie";
import "grapesjs/dist/css/grapes.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditorPage() {
  const queryParameters = new URLSearchParams(window.location.search);
  const html_id = queryParameters.get("id");//The HTML id
  const ref = React.useRef();
  const [height, setHeight] = React.useState("400px"); //For Iframe
  const [sizeopts, setSizeopts] = useState(false);
  const [isDark, setDark] = useState(true); //For dark mode
  const [editor, setEditor] = useState(null);
  const svgText = `<svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
    viewBox="0 0 599.76 599.76"
    xml:space="preserve">
    <g>
    <polygon points="556.681,108.338 448.343,108.338 448.343,0 	"/>
    <path d="M410.839,146.225V0H43.079v599.76h513.602V146.225H410.839z M107.444,102.744h222.51v49.061h-222.51V102.744z
        M107.444,225.063h385.072v49.061H107.444V225.063z M269.792,518.766H107.444v-49.061h162.347V518.766z M269.792,396.447H107.444
      v-49.065h162.347V396.447z M496.312,521.955H340.382V346.641h155.931V521.955z"/>
    </g>
    </svg>`;
  const verticalSVG = `<svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.25 3C1.25 2.58579 1.58579 2.25 2 2.25L22 2.25C22.4142 2.25 22.75 2.58579 22.75 3C22.75 3.41422 22.4142 3.75 22 3.75L2 3.75C1.58579 3.75 1.25 3.41421 1.25 3ZM7.94801 7.25H16.052C16.9505 7.24997 17.6997 7.24995 18.2945 7.32991C18.9223 7.41432 19.4891 7.59999 19.9445 8.05546C20.4 8.51093 20.5857 9.07773 20.6701 9.70552C20.7501 10.3003 20.75 11.0495 20.75 11.948V12.052C20.75 12.9505 20.7501 13.6997 20.6701 14.2945C20.5857 14.9223 20.4 15.4891 19.9445 15.9445C19.4891 16.4 18.9223 16.5857 18.2945 16.6701C17.6997 16.7501 16.9505 16.75 16.052 16.75H7.94801C7.04952 16.75 6.3003 16.7501 5.70552 16.6701C5.07773 16.5857 4.51093 16.4 4.05546 15.9445C3.59999 15.4891 3.41432 14.9223 3.32991 14.2945C3.24995 13.6997 3.24997 12.9505 3.25 12.052V11.948C3.24997 11.0495 3.24995 10.3003 3.32991 9.70552C3.41432 9.07773 3.59999 8.51093 4.05546 8.05546C4.51093 7.59999 5.07773 7.41432 5.70552 7.32991C6.3003 7.24995 7.04952 7.24997 7.94801 7.25ZM5.90539 8.81654C5.44393 8.87858 5.24643 8.9858 5.11612 9.11612C4.9858 9.24644 4.87858 9.44393 4.81654 9.90539C4.75159 10.3884 4.75 11.036 4.75 12C4.75 12.964 4.75159 13.6116 4.81654 14.0946C4.87858 14.5561 4.9858 14.7536 5.11612 14.8839C5.24643 15.0142 5.44393 15.1214 5.90539 15.1835C6.38843 15.2484 7.03599 15.25 8 15.25H16C16.964 15.25 17.6116 15.2484 18.0946 15.1835C18.5561 15.1214 18.7536 15.0142 18.8839 14.8839C19.0142 14.7536 19.1214 14.5561 19.1835 14.0946C19.2484 13.6116 19.25 12.964 19.25 12C19.25 11.036 19.2484 10.3884 19.1835 9.90539C19.1214 9.44393 19.0142 9.24644 18.8839 9.11612C18.7536 8.9858 18.5561 8.87858 18.0946 8.81654C17.6116 8.7516 16.964 8.75 16 8.75H8C7.03599 8.75 6.38843 8.7516 5.90539 8.81654ZM1.25 21C1.25 20.5858 1.58579 20.25 2 20.25L22 20.25C22.4142 20.25 22.75 20.5858 22.75 21C22.75 21.4142 22.4142 21.75 22 21.75L2 21.75C1.58579 21.75 1.25 21.4142 1.25 21Z"/>
    </svg>`;
  const centerSVG = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 4H6C4.89543 4 4 4.89543 4 6V8M8 20H6C4.89543 20 4 19.1046 4 18V16M16 4H18C19.1046 4 20 4.89543 20 6V8M16 20H18C19.1046 20 20 19.1046 20 18V16M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  useEffect(() => {
    //Initialize Grape JS
    const editor = grapejs.init({
      container: "#editor",
      storageManager: false,

      blockManager: {
        appendTo: "#blocks",
      },
      styleManager: {
        appendTo: "#styles-container",
      },
      layerManager: {
        appendTo: "#layers-container",
      },
      traitManager: {
        appendTo: "#trait-container",
      },
      selectorManager: {
        appendTo: "#styles-container",
      },
      deviceManager: {},
      plugins: [plugin, gjsPresentWebpage],
      pluginsOpts: {
        gjsPresentWebpage: {},
      },
    });

    //Check for user info then authenticate and get data
    if (Cookies.get("username") === undefined) {
      window.location.replace("/login");
    } else {
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
          //console.log(response.data["content"]);
          editor.setComponents(response.data["content_html"]);
          editor.setStyle(response.data["content_css"]);
        });
    }

    editor.Panels.addPanel({
      id: "basic-actions",
      el: ".panel__basic-actions",
      buttons: [
        {
          id: "visibility",
          active: true, // active by default
          className: "btn-toggle-borders",
          label: "<u>B</u>",
          command: "sw-visibility", // Built-in command
        },
      ],
    });

    //Add Center and vertical blocks to the block manager
    editor.BlockManager.add("center", {
      id: "cntrr",
      label: "Center",
      category: "Basic",
      content: `<div><center style="width:100%;min-height:50px"></center></div>`,
      media: centerSVG,
      // style: aBlock['css'],
      // script: aBlock['css'],
    });
    editor.BlockManager.add("vertical", {
      id: "vertical",
      label: "Vertical",
      category: "Basic",
      content: `<div style="display:block; min-height:50px"></div>`,
      media: verticalSVG,
      // style: aBlock['css'],
      // script: aBlock['css'],
    });

    setEditor(editor);

    //Get the sheets and add them to block manager
    axios
      .post(
        "http://127.0.0.1:8000/apis/get_sheets/",
        {
          id: html_id,
        },
        { withCredentials: true, "X-CSRFToken": Cookies.get("csrftoken") }
      )
      .then(function (response) {
        console.log(response.data);
        if (response.data == "Not Logged In") {
          window.location.replace("/login");
        }
        for (var i = 0; i < response.data.length; i++) {
          console.log(response.data.length);
          editor.BlockManager.add(response.data[i]["name"], {
            id: response.data[i]["name"],
            label: response.data[i]["name"],
            category: "Sheets",
            content:
              `<iframe src="http://127.0.0.1:8000/apis/sheet/?id=` +
              response.data[i]["sheet_id"] +
              `" ></iframe>`,
            media: svgText,
            // style: aBlock['css'],
            // script: aBlock['css'],
          });
        }
        const blockManager = editor.Blocks;
        const blocks = blockManager.getAll();
        var filtered = blocks.filter(
          (block) =>
            JSON.parse(JSON.stringify(block))["category"]["id"] == "Sheets"
        );
        var newBlocksEl = blockManager.render(filtered, { external: true });
        document.getElementById("sheet-blocks").appendChild(newBlocksEl);
        filtered = blocks.filter(
          (block) =>
            JSON.parse(JSON.stringify(block))["category"]["id"] == "Basic"
        );
        newBlocksEl = blockManager.render(filtered, { external: true });
        document.getElementById("basic-blocks").appendChild(newBlocksEl);
      });
  }, []);

  function ddk() {
    isDark ? setDark(false) : setDark(true);
  }
  function saved() {
    if (editor.getHtml() != null) {
      //console.log(editor.getHtml());
      axios
        .post(
          "http://127.0.0.1:8000/apis/save_html/",
          {
            username: Cookies.get("username"),
            password: Cookies.get("password"),
            id: html_id,
            css: editor.getCss(),
            html: editor.getHtml(),
          },
          { withCredentials: true, "X-CSRFToken": Cookies.get("csrftoken") }
        )
        .then(function (response) {
          console.log(response.data);
          if (response.data == "Success") {
            toast("File Saved");
            var css = editor.getCss();
            editor.setStyle(css);
          }
        });
    }
  }
  function sizeup() {
    var width = document.getElementById("width-size").value;
    var height = document.getElementById("height-size").value;
    var css = editor.getCss();
    console.log(width);
    const regexp = /body{max-width:.*?;max-height:.*?;}/g;
    var matches = css.matchAll(regexp);

    for (const match of matches) {
      css = css.replace(match, "");
      console.log(match);
    }
    var new_css =
      css +
      " body{max-width:" +
      width +
      "px!important; max-height:" +
      height +
      "px;}";
    console.log(new_css);
    editor.setStyle(new_css);
  }
  function sizechange() {
    var e = document.getElementById("setsize");
    if (e.value == "auto") {
      var css = editor.getCss();
      const regexp = /body{max-width:.*?;max-height:.*?;}/g;
      var matches = css.matchAll(regexp);

      for (const match of matches) {
        css = css.replace(match, "");
        console.log(match);
      }
      editor.setStyle(css);
      setSizeopts(false);
    } else {
      setSizeopts(true);
    }
  }
  var modal = document.getElementById("modal");
  function share() {
    var editorr = document.getElementById("editor");
    modal.style.display = "block";
    editorr.style.display = "none";
  }
  function closeModal() {
    var scrollHeight = document.getElementById("myFrame").scrollHeight;
    console.log(scrollHeight + " height");
    var editorr = document.getElementById("editor");
    modal.style.display = "none";
    editorr.style.display = "block";
    var iframe = document.getElementById("myFrame");
    iframe.src = iframe.src;
  }

  document.addEventListener(
    "keydown",
    function (e) {
      if (
        e.key === "s" &&
        (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
      ) {
        e.preventDefault();
        saved();
      }
    },
    false
  );

  function reload() {
    location.reload();
  }

  const onLoad = () => {
    var scrollHeight = document.getElementById("myFrame").scrollHeight;
    console.log(scrollHeight + " height");
  };

  useEffect(() => {
    window.addEventListener("message", function (event) {
      console.log("Message received from the child: " + event.data); // Message received from child
      setHeight((430 + parseInt(event.data) * 24).toString() + "px");
    });
  });
  var add_sheet = "/add_sheet/?id=" + html_id;
  var shareurl = "/share/?id=" + html_id;
  return (
    <div className="EditorPage">
      <ToastContainer autoClose={2000} />
      <div id="modal">
        <center>
          <iframe
            ref={ref}
            onLoad={onLoad}
            id="myFrame"
            src={shareurl}
            width="100%"
            height={height}
            scrolling="no"
            frameBorder="0"
            style={{
              minHeight: 450,
              width: 450,
              marginTop: 100,
              border: 0,
              borderRadius: 20,
              overflow: "auto",
            }}
          ></iframe>
          <button
            onClick={closeModal}
            style={{
              marginTop: 90,
              position: "fixed",
              backgroundColor: "#ea4c88",
              border: 0,
              borderRadius: 50,
              padding: 10,
              color: "white",
            }}
          >
            &nbsp;X&nbsp;
          </button>
        </center>
      </div>

      <div className="nav-top">
        <b style={{ fontSize: 20 }}>Dashboard</b>
        <button
          onClick={ddk}
          style={{
            backgroundColor: "rgba(52, 52, 52, 0)",
            border: 0,
            fontSize: 20,
          }}
        >
          {isDark ? <FaSun style={{ color: "white" }} /> : <FaMoon />}
        </button>
        <div className="panel__basic-actions"></div>
        <button className="bttn" onClick={saved}>
          Save File
        </button>
        &nbsp;&nbsp;
        <button className="bttn" onClick={reload}>
          Refresh
        </button>
        &nbsp;&nbsp;
        <button className="bttn" onClick={share}>
          Share
        </button>
        &nbsp;&nbsp;
        <a
          href={add_sheet}
          className="bttn"
          target="_blank"
          style={{ color: "white" }}
        >
          Add Sheet
        </a>
      </div>
      <div className="bdy" style={{ backgroundColor: "white" }}>
        <div className="side-bar">
          <label style={{ marginLeft: 10 }}>Size:&nbsp;&nbsp;&nbsp;</label>

          <select name="setsize" id="setsize" onChange={sizechange}>
            <option value="auto">Auto</option>
            <option value="custom">Custom</option>
          </select>
          <div id="size-options">
            <div>
              {" "}
              <label style={{ marginLeft: 5, width: "30%" }}>
                Width:&nbsp;&nbsp;
              </label>
              <input style={{ width: "65%" }} id="width-size" type="number" />
            </div>

            <div style={{ marginTop: 5 }}>
              {" "}
              <label style={{ marginLeft: 5, width: "30%" }}>
                Height:&nbsp;
              </label>
              <input style={{ width: "65%" }} id="height-size" type="number" />
            </div>
            <center>
              <button
                style={{ marginTop: 5, marginBottom: 5 }}
                onClick={sizeup}
              >
                Resize
              </button>
            </center>
          </div>

          <div id="sheet-blocks"></div>
          <div id="basic-blocks"></div>
          <div style={{ display: "none" }} id="blocks"></div>
          <div id="styles-container"></div>
          <div id="trait-container"></div>
        </div>
        <div id="editor"></div>
      </div>
      <style>
        {"\
        .gjs-one-bg , .nav-top, .side-bar {\
          background-color:" +
          (isDark ? "#353635" : "white") +
          ";\
          color:" +
          (isDark ? "white" : "#353635") +
          "!important;\
        }\
        #size-options{\
          display:" +
          (sizeopts ? "block" : "none") +
          "\
        }\
        "}
      </style>
    </div>
  );
}

export default EditorPage;
