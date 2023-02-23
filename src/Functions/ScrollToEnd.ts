export const scrollEditorToEnd = (component: any) => {
    const editorContainer = component.current as HTMLElement;
    if (editorContainer?.children[0]) {
      editorContainer.children[0].scrollTop =
        editorContainer.children[0].scrollHeight;
    }
  };
  