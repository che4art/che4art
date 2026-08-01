import { useState } from "react";

const dialogue = [
  "Broken Button",
  "Broken Button",
   "Broken Button",
  ".",
  "..",
  "...",
  "it's a broken button",
 ".",
  "..",
  "...",
  "it's not working",
 ".",
  "..",
  "...",
  "haha",
"i guess you don't get it",
"it's a",
"BROKEN button",
">BROKEN< button",
">>BROKEN<< button",
">>>BROKEN<<< button",
"----------->BROKEN<----------- button",
"----------->BROKEN<----------- button",
"----------->BROKEN<----------- button",
 ".",
  "..",
  "...",
  "well idk what you're expecting by clicking this thing",
  "but it's still broken",
  "sooo can you pls stop clicking?",
  "sooo can you pls stop clicking?",
  "sooo can you pls stop clicking?",
  "sooo can you pls stop clicking?",
  "...",
  "...",
  "...",
  "...",
  "bro",
  "i swear",
  "STOP",
  "STOP",
  "CLICKING",
  "CLICKINGG",
  "CLICKINGGG",
  "CLICKINGGGG",
  "CLICKINGGGGG",
  "CLICKINGGGGGG",
  "...",
  "...",
  "...",
  "IT'S BROKEN",
  "STOP CLICKING",
  "STOP CLICKING-STOP CLICKING",
  "STOP CLICKING-STOP CLICKING-STOP CLICKING",
  "STOP STOP",
  "STOP STOP STOP",
  "STOP STOP STOP STOP",
  "STOP STOP STOP STOP STOP STOP",
  "STOP STOP STOP STOP STOP STOP STOP STOP",
  "STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP",
  "STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP",
  "STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP",
  "STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP",
  ">:[",
  ">:[",
  ">:[",
  "you know what?",
  "that's it",
"no more messenges",
"i'm done with you",
">:[",
];

export default function BrokenButton() {
  const [index, setIndex] = useState(0);

  function handleClick() {
    if (index < dialogue.length - 1) {
      setIndex(index + 1);
    }
  }

  return (
    <button
      onClick={handleClick}
      style={{
        padding: "12px 24px",
       cursor: 'url("/cursor/pointing.png"), pointer',
       backgroundColor: "transparent",
       color: "white",

      }}
    >
    {dialogue[index]}
    </button>
  );
}