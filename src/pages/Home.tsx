import React, { useEffect, useRef, useState } from "react";
// @ts-ignore
import Quill from "quill";
import PictureModal from "components/AppModal/picture/PictureModal";
import VideoModal from "components/AppModal/video/VideoModal";
import SocialPlattform from "components/AppModal/social/SocialMediaPlatform";
import SocialWrapper from "components/EditorWrapper/SocialWrapper";
import OptionsContent from "components/widget/OptionsContent";
import { ToolOptions } from "constans/editor/toolOptions";
import { scrollEditorToEnd } from "Functions/ScrollToEnd";
import { outterClose } from "Functions/OuterClickClose";
import { CustomIframe } from "Functions/editorComponent/CustomIframe";
import useEditorsAction from "utils/hooks/editorsAction";

export const TextEditor: React.FC = () => {
  const editor = useRef<HTMLDivElement>(null);
  const dropDowm = useRef<HTMLDivElement>(null);
  const { editorCursorChangeHook, editorOnTextChangeHook } = useEditorsAction();

  const [pictureModal, setPictureModal] = useState(false);
  const [socialModal, setSocialModal] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState({
    index: null,
    textLength: 0,
  });
  const [videoModal, setVideoModal] = useState(false);
  const [quills, setQuill] = useState<any>(null);

  useEffect(() => {
    if (loaded) return;
    const quill = new Quill("#editor-container", {
      modules: { toolbar: ToolOptions },
      placeholder: "Input in custom text editor...",
      theme: "snow", // or 'bubble',
    });

    CustomIframe(Quill);

    editor?.current?.setAttribute("style", "min-height: 300px; height: 380px");
    setQuill(quill);
    editorCursorChange(quill, setCurrentIndex, currentIndex);
    editorOnTextChange(quill, setCurrentIndex, currentIndex);
    setLoaded(true);
    closeDropDown();
  }, []);

  //Functions
  const appendImageToEditor = (val: string) => {
    quills.insertEmbed(currentIndex.index, "image", val);
    scrollEditorToEnd(editor);
  };

  const appendVideoToEditor = (val: { link: String; medium: String }) => {
    quills.insertEmbed(currentIndex.index, "video", val?.link);
    scrollEditorToEnd(editor);
  };

  const appendSocialToEditor = (val: {
    link: String;
    medium: String;
    code: string;
  }) => {
    val.link
      ? quills.insertEmbed(currentIndex.index, "customUrlIframe", val?.link)
      : appendTextAsNodeToEditor(val.code);
  };

  const appendTextAsNodeToEditor = (val: string) => {
    quills.insertEmbed(currentIndex.index, "customIframe", val);
    scrollEditorToEnd(editor);
  };

  const closeDropDown = () => {
    outterClose(dropDowm as React.RefObject<HTMLInputElement>, () => {
      setDropdown(false);
    });
  };

  const editorCursorChange = (
    quill: any,
    setCurrentIndex: Function,
    currentIndex: object
  ) => {
    editorCursorChangeHook(quill, setCurrentIndex, currentIndex);
  };

  const editorOnTextChange = (
    quill: any,
    setCurrentIndex: Function,
    currentIndex: object
  ) => {
    editorOnTextChangeHook(quill, setCurrentIndex, currentIndex);
  };

  

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
        <h1 className="font-bold text-xl mb-2 px-3">This is the title</h1>
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
