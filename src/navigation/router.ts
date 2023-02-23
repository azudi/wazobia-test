import { TextEditor } from "pages/Home";
import { IAppRoute } from "./interphase";
import routes from "./Routes";
import stacks from "./stack";

const route = [
  {
    stack: stacks.APP,
    route: routes.home,
    Page: TextEditor,
  } as IAppRoute,
];

export default route;
