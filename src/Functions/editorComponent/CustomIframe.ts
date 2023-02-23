export const CustomIframe = (Quill: any) => {
  const createCustomSocialFrame = () => {
    const CustomVideo = Quill.import("blots/embed");
    class CustomVideoModule extends CustomVideo {
      static blotName: string;
      static tagName: string;
      static create(value: any) {
        const node = super.create(value);
        node.setAttribute("src", value);
        node.setAttribute("width", 504);
        node.setAttribute("height", 1000);
        node.setAttribute("frameborder", "0");
        node.setAttribute("allowfullscreen", true);
        return node;
      }
      static value(node: { getAttribute: (arg0: string) => any }) {
        return {
          src: node.getAttribute("src"),
          width: node.getAttribute("width"),
          height: node.getAttribute("height"),
        };
      }
    }
    CustomVideoModule.blotName = "customUrlIframe";
    CustomVideoModule.tagName = "div";
    Quill.register(CustomVideoModule, true);
  };

  const createCustomVideoFrame = () => {
    const CustomVideo = Quill.import("blots/embed");
    class CustomVideoModule extends CustomVideo {
      static blotName: string;
      static tagName: string;
      static create(value: any) {
        const node = super.create(value);
        node.innerHTML = value;
        return node;
      }
      static value(node: { getAttribute: (arg0: string) => any }) {
        return node;
      }
    }
    CustomVideoModule.blotName = "customIframe";
    CustomVideoModule.tagName = "div";
    Quill.register(CustomVideoModule, true);
  };

  createCustomSocialFrame()
  createCustomVideoFrame()
  
};
