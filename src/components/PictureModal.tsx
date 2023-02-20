import React, { ReactNode, useRef, useState } from "react";
import Modal from "./Modal";

interface Props {
  closeModal: Function;
  showModal: Boolean;
  appendImageToEditor: Function;
}

const PictureModal: React.FC<Props> = ({
  closeModal,
  showModal,
  appendImageToEditor,
}) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [image64, setImage64] = useState("");

  const changeValuetoBase64 = () => {
    const file = imageInputRef.current?.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // The contents of the file will be in the result property
        const fileContents = reader.result;
        setImage64(fileContents as any);
        // Create a new Image element and set its src attribute to the file contents

        // Do something with the image, such as appending it to the DOM
      };
    }
  };

  const addendImage = () => {
    appendImageToEditor(image64);
    closeModal();
  };

  return (
    <Modal closeModal={closeModal} showModal={showModal}>
      <div>
        <b className="pb-3 pt-1 block">Emdeded</b>
        <p className="py-2">Upload Image</p>

        <div
          style={{
            backgroundImage: `url(${image64})`,
            backgroundSize: "contain",
          }}
          className="h-[150px] bg-gray-100/60 border-2 border-dashed flex justify-center items-center rounded bg-no-repeat bg-center"
        >
           { !image64 ? <button
            onClick={() => imageInputRef?.current?.click()}
            className="py-2 px-3 bg-white rounded"
          >
            Import image from device
          </button> : null }
          <input
            className="hidden"
            ref={imageInputRef}
            type="file"
            accept="image/png, image/gif, image/jpeg, image/bmp, image/x-icon"
            onChange={changeValuetoBase64}
          />
        </div>
        <div className="py-3">
          <button
            onClick={addendImage}
            className="px-4 py-1 border-2 border-green-800 bg-green-800 text-white rounded mr-4"
          >
            Embed
          </button>
          <button
            onClick={() => closeModal()}
            className="px-4 py-1 border-2 border-gray-200 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PictureModal;
