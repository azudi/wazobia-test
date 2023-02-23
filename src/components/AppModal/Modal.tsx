import React, { ReactNode, useEffect, useRef } from "react";

interface Props {
  children: ReactNode;
  closeModal: Function;
  showModal: Boolean;
}

const Modal: React.FC<Props> = ({ children, closeModal, showModal }) => {
  const modalContainer = useRef<HTMLDivElement>(null);

  const closeModalWrapper = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // check if the event target is inside the dropdown
    if (!modalContainer.current?.contains(event.target as Node)) {
      // if the target is not inside the dropdown, collapse it
      closeModal();
    }
  };

  return showModal ? (
    <div
      onClick={(event) => closeModalWrapper(event)}
      className="fixed w-full h-full z-50 bg-gray-300/60 flex justify-center items-center pop-over"
    >
      <div
        ref={modalContainer}
        className="sm:w-[500px] min-h-[200px] bg-white relative px-3 w-11/12"
      >
        <span
          onClick={() => closeModal()}
          className="inline-block absolute top-2 right-2 cursor-pointer"
        >
          &#x2715;
        </span>
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
