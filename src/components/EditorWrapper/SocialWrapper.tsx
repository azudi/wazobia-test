import React, { useEffect, useRef } from "react";

interface Props {
  link: String;
}

const SocialWrapper: React.FC<Props> = ({ link }) => {
  const bodyElement = useRef<HTMLBodyElement>(null);

  return (
      <iframe
        frameBorder="0"
        className="w-full h-[400px]"
        allowFullScreen={true}
        src={link as string}
      >
        <html>
          <head>
            <meta name="viewport" content="width=device-width"></meta>
          </head>
          <body ref={bodyElement}></body>
        </html>
      </iframe>
  );
};

export default SocialWrapper;
