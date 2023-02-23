import { AppType } from "../constans/ApptypeEnum";

export interface IAppRoute{
    stack: AppType,
    route: string,
    Page: () => JSX.Element,
} 