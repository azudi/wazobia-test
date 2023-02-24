import React from 'react'

interface Props {}

function useEditorsAction() {


    const editorCursorChangeHook = (quill: any, setCurrentIndex: Function, currentIndex: object) => {
        quill.on("selection-change", function (range: { index: null }) {
          if (range) {
            quill.enable();
            setCurrentIndex({
              ...currentIndex,
              index: range.index,
              textLength: quill.getLength() - 1,
            });
          }
        });
      };

      const editorOnTextChangeHook = (quill: any, setCurrentIndex: Function, currentIndex: object) => {
        quill.on("text-change", function () {
          let selection = quill.getSelection();
          if (selection) {
            quill.getText().length >= 1000 ? quill.disable() : quill.enable();
            let cursorIndex = selection.index;
            setCurrentIndex({
              ...currentIndex,
              index: cursorIndex,
              textLength: quill.getLength() - 1, // Changed quill.getText().length to quill.getLength()
            });
          }
        });
      };

    return { editorOnTextChangeHook, editorCursorChangeHook }
}

export default useEditorsAction
