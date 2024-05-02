import React, { useState, useRef } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { Button, ButtonGroup } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SaveIcon from "@mui/icons-material/Save";
import "./style.css";

function RichTextEditor() {
  const [editorState, setEditorState] = useState(() => {
    const savedContent = localStorage.getItem("draftEditorContent");
    if (savedContent) {
      const rawContentState = JSON.parse(savedContent);
      const contentState = convertFromRaw(rawContentState);
      return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty();
  });
  const [isContentSaved, setIsContentSaved] = useState(true);
  const editorRef = useRef(null);

  const handleChange = (newEditorState) => {
    setEditorState(newEditorState);
    setIsContentSaved(false);
  };

  const handleBold = () => {
    handleChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const handleItalic = () => {
    handleChange(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const handleUnderline = () => {
    handleChange(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  const handleList = () => {
    handleChange(RichUtils.toggleBlockType(editorState, "unordered-list-item"));
  };

  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const contentStateString = JSON.stringify(rawContentState);
    localStorage.setItem("draftEditorContent", contentStateString);
    setIsContentSaved(true);
  };

  const handleClickInsideEditor = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  return (
    <div className="rich-text-editor-container">
      <div className="editor-toolbar">
        <Button
          onClick={handleBold}
          startIcon={<FormatBoldIcon style={{ color: "black" }} />}
        />
        <Button
          onClick={handleItalic}
          startIcon={<FormatItalicIcon style={{ color: "black" }} />}
        />
        <Button
          onClick={handleUnderline}
          startIcon={<FormatUnderlinedIcon style={{ color: "black" }} />}
        />
        <Button
          onClick={handleList}
          startIcon={<FormatListBulletedIcon style={{ color: "black" }} />}
        />
        <Button
          onClick={handleSave}
          startIcon={<SaveIcon style={{ color: "black" }} />}
        />
      </div>
      <div className="rich-text-editor" onClick={handleClickInsideEditor}>
        <Editor
          editorState={editorState}
          onChange={handleChange}
          ref={editorRef}
        />
      </div>
    </div>
  );
}

export default RichTextEditor;
