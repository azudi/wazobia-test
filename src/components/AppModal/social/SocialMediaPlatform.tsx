import Button from "components/widget/Button";
import React, { ReactNode, useRef, useState } from "react";
import Modal from "../Modal";

interface Props {
  closeModal: Function;
  showModal: Boolean;
  appendSocialToEditor: Function;
}

const SocialPlattform: React.FC<Props> = ({
  closeModal,
  showModal,
  appendSocialToEditor,
}) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [socialLink, setSocialLink] = useState({
    link: "",
    medium: "",
    code: ""
  });


  const addendVideo = ()=>{
    appendSocialToEditor(socialLink)
    closeModal()
  }

   const inputSetLink = (val: React.ChangeEvent<HTMLInputElement>)=>{
    setSocialLink({...socialLink, link: val?.target.value})
   }
  const inputSetType = (val: React.ChangeEvent<HTMLSelectElement>)=>{
    setSocialLink({...socialLink, medium: val?.target.value})
  }
  const inputSetCode = (val: React.ChangeEvent<HTMLInputElement>)=>{
    setSocialLink({...socialLink, code: val?.target.value})
  }


  return (
    <Modal closeModal={closeModal} showModal={showModal}>
      {/* <div className="cursor-pointer" onClick={()=> loadImage()}>open</div> */}
      <div>
        <b className="pb-3 pt-1 block">Emdeded</b>
        <p className="py-2"></p>

        <div className="mb-3">
            <label className="label">SOCIAL MEDIA PLATTFORM</label>
            <select onChange={inputSetType} className="w-full bg-gray-50 px-3 py-2 text-[12px] rounded outline-none">
                <option value="Youtube">Facebook</option>
                <option value="Youtube">Twitter</option>
                <option value="Youtube">Instagram</option>
            </select>
        </div>


        <div className="">
            <label className="label">URL</label>
            <input
            onChange={inputSetLink}
            type="text" placeholder="https://www.youtube.com/embed/QH2-TGUlwu4" className="w-full bg-gray-50 px-3 py-2 text-[12px] rounded"/>
        </div>

        <div className="">
            <label className="label">CODE</label>
            <input
            placeholder={`<iframe src="https://www.youtube.com/embed/QH2-TGUlwu4" width="560" height="315" title="Nyan Cat [original]" frameborder="0" allowfullscreen></iframe>`}
            onChange={inputSetCode}
            type="text" className="w-full bg-gray-50 px-3 py-2 text-[12px] rounded"/>
        </div>

        <div className="py-3">
        <Button title="Embed" isActive={true} trigger={addendVideo}/>
          <button onClick={()=>closeModal()} className="px-4 py-1 border-2 border-gray-200 rounded">
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SocialPlattform;
