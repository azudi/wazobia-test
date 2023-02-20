import React, { ReactNode, useRef, useState } from "react";
import Modal from "./Modal";

interface Props {
  closeModal: Function;
  showModal: Boolean;
  appendVideoToEditor: Function;
}

const VideoModal: React.FC<Props> = ({
  closeModal,
  showModal,
  appendVideoToEditor,
}) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [image64, setImage64] = useState("");
  const [videoLink, setVideoLink] = useState({
    link: "",
    medium: ""
  });


  const addendVideo = ()=>{
    if(!videoLink?.link) return;
    appendVideoToEditor(videoLink)
    closeModal()
  }

   const inputSetLink = (val: React.ChangeEvent<HTMLInputElement>)=>{
     setVideoLink({...videoLink, link: val?.target.value})
   }
  const inputSetType = (val: React.ChangeEvent<HTMLSelectElement>)=>{
    setVideoLink({...videoLink, medium: val?.target.value})
  }


  return (
    <Modal closeModal={closeModal} showModal={showModal}>
      {/* <div className="cursor-pointer" onClick={()=> loadImage()}>open</div> */}
      <div>
        <b className="pb-3 pt-1 block">Emdeded</b>
        <p className="py-2"></p>

        <div className="mb-3">
            <label className="label">VIDEO PR0VIDER</label>
            <select onChange={inputSetType} className="w-full bg-gray-50 px-3 py-2 text-[12px] rounded outline-none">
                <option value="Youtube">Youtube</option>
                <option value="Youtube">Vimeo</option>
            </select>
        </div>

        <div className="">
            <label className="label">URL</label>
            <input
            onChange={inputSetLink}
            type="text" placeholder="https://www.youtube.com/embed/QH2-TGUlwu4" className="w-full bg-gray-50 px-3 py-2 text-[12px] rounded"/>
        </div>

        <div className="py-3">
          <button
          onClick={addendVideo}
          className="px-4 py-1 border-2 border-green-800 bg-green-800 text-white rounded mr-4">
            Emded
          </button>
          <button onClick={()=>closeModal()} className="px-4 py-1 border-2 border-gray-200 rounded">
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default VideoModal;
