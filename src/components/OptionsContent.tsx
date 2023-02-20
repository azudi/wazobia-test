import React, { useEffect, useRef } from "react";
import { ReactComponent as PhotoIcon } from "../assets/images/svg/photoIcon.svg";
import { ReactComponent as VideoIcon } from "../assets/images/svg/viseoIcon.svg";
import { ReactComponent as SocialIcon } from "../assets/images/svg/SocialIcon.svg";

interface Props {
  setPictureModal: Function;
  setVideoModal: Function;
  setSocialModal: Function;
}

const OptionsContent: React.FC<Props> = ({
  setPictureModal,
  setVideoModal,
  setSocialModal,
}) => {
  return (
    <div className="w-[200px] absolute left-3 bottom-full bg-white shadow-md rounded">
      <b className="uppercase text-xs p-3">Emdeds</b>
      <span
        onClick={() => setPictureModal(true)}
        className="flex items-center w-full text-xs p-2 cursor-pointer  hover:bg-gray-100"
      >
        <i className="w-[30px]">
          <PhotoIcon width="20px" />
        </i>
        <abbr>
          Picture<br></br>Jpeg, png
        </abbr>
      </span>
      <span
        onClick={() => setVideoModal(true)}
        className="flex items-center w-full text-xs p-2 cursor-pointer hover:bg-gray-100"
      >
        <i className="w-[30px]">
          <VideoIcon width="20px" />
        </i>
        <abbr>
          Video<br></br>Emded a youtube video
        </abbr>
      </span>
      <span
        onClick={() => setSocialModal(true)}
        className="flex items-center w-full text-xs p-2 cursor-pointer  hover:bg-gray-100"
      >
        <i className="w-[30px]">
          <SocialIcon width="20px" />
        </i>
        <abbr>
          Social<br></br>Embed a facebook link
        </abbr>
      </span>
    </div>
  );
};
export default OptionsContent;
