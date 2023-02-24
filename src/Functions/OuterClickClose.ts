export const outterClose = (element:  React.RefObject<HTMLInputElement>, callback: Function) => {
  // the element arg is must be a React.Ref
  document.addEventListener("click", function (event) {
    if (!element.current?.contains(event.target as Node)) {
      // if the target is not inside the dropdown, collapse it
      callback();
    }
  });
};
