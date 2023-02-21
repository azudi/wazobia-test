import React, { useEffect, useRef, useState } from "react";
// @ts-ignore
import Quill from "quill";
import PictureModal from "components/PictureModal";
import VideoModal from "components/VideoModal";
import SocialPlattform from "components/SocialMediaPlatform";
import SocialWrapper from "components/SocialWrapper";
import { editorProps } from "utils/Constant/EditorProps";
import OptionsContent from "components/OptionsContent";

export const TextEditor: React.FC = () => {
  const editor = useRef<HTMLDivElement>(null);
  const dropDowm = useRef<HTMLDivElement>(null);

  const [pictureModal, setPictureModal] = useState(false);
  const [socialModal, setSocialModal] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [loaded, setLoaded] = useState(false)
  const [currentIndex, setCurrentIndex] = useState({
    index: null,
    textLength: 0,
  });
  const [videoModal, setVideoModal] = useState(false);
  const [quills, setQuill] = useState<any>(null);

  useEffect(() => {
    if(loaded) return
    const quill = new Quill("#editor-container", {
      modules: { toolbar: editorProps },
      placeholder: "Input in custom text editor...",
      theme: "snow", // or 'bubble',
    });

    createCustomSocialFrame()

    editor?.current?.setAttribute("style", "min-height: 300px; height: 380px");
    setQuill(quill);
    editorCursorChange(quill);
    editorOnTextChange(quill);
    setLoaded(true)
    closeDropDown();
  }, []);

  //Functions
  const appendImageToEditor = (val: string) => {
    quills.insertEmbed(currentIndex.index, "image", val);
    scrollEditorToEnd();
  };

  const appendVideoToEditor = (val: { link: String; medium: String }) => {
    quills.insertEmbed(currentIndex.index, "video", val?.link);
    scrollEditorToEnd();
  };

  const appendSocialToEditor = (val: {
    link: String;
    medium: String;
    code: string;
  }) => {
    val.link
      ? quills.insertEmbed(currentIndex.index, "video", val?.link)
      : appendTextAsNodeToEditor(val.code);
  };

  const scrollEditorToEnd = () => {
    const editorContainer = editor.current as HTMLElement;
    if (editorContainer?.children[0]) {
      editorContainer.children[0].scrollTop =
        editorContainer.children[0].scrollHeight;
    }
  };

  const appendTextAsNodeToEditor = (val: string) => {
    quills.insertEmbed(currentIndex.index, "customIframe", val);
    scrollEditorToEnd();
  };

  const closeDropDown = () => {
    document.addEventListener("click", function (event) {
      // check if the event target is inside the dropdown
      if (!dropDowm.current?.contains(event.target as Node)) {
        // if the target is not inside the dropdown, collapse it
        setDropdown(false);
      }
    });
  };

  const editorCursorChange = (quill: any) => {
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

  const editorOnTextChange = (quill: any) => {
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


  const createCustomSocialFrame = ()=>{
    const CustomVideo = Quill.import("blots/embed");
    class CustomVideoModule extends CustomVideo {
      static blotName: string;
      static tagName: string;
      static create(value: any) {
        const node = super.create(value);
        node.innerHTML = value
        return node;
      }
      static value(node: { getAttribute: (arg0: string) => any; }) {
        return node;
      }
    }
    CustomVideoModule.blotName = "customIframe";
    CustomVideoModule.tagName = "div";
    Quill.register(CustomVideoModule, true);
  }
  



  return (
    <main className="flex justify-center items-center h-[100vh]">
      <PictureModal
        appendImageToEditor={appendImageToEditor}
        closeModal={() => setPictureModal(false)}
        showModal={pictureModal}
      />
      <VideoModal
        appendVideoToEditor={appendVideoToEditor}
        closeModal={() => setVideoModal(false)}
        showModal={videoModal}
      />
      <SocialPlattform
        appendSocialToEditor={appendSocialToEditor}
        closeModal={() => setSocialModal(false)}
        showModal={socialModal}
      />

      <div className="md:w-[500px] sm:w-10/12 w-11/12 max-h-[85vh] shadow-md rounded">
        <h1 className="font-bold text-xl mb-2 px-3">
          This is the title
        </h1>
        <div
          ref={editor}
          id="editor-container"
          className="overflow-y-auto mb-4"
        ></div>
        <div className="bg-white text-[11px] text-right p-1">
          {currentIndex.textLength} / 1000
        </div>
        <div className="pb-6">
          <div className="relative" ref={dropDowm}>
            <button
              className="w-10 h-10 rounded-full bg-gray-300 text-3xl mt-5 ml-2"
              onClick={() => setDropdown(!dropdown)}
            >
              &#x2B;
            </button>
            {dropdown ? (
              <OptionsContent
                setSocialModal={setSocialModal}
                setPictureModal={setPictureModal}
                setVideoModal={setVideoModal}
              />
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
};
