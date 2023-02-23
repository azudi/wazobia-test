import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AppType } from "../constans/ApptypeEnum"
// import PageNotFound from "../pages/PageNotFound"
import { IAppRoute } from "./interphase"
import routes from "./router"




const RootRouter = () => {




  let mainAppRoute = routes.filter((item: any) => item.stack === AppType.APP)
  return (


    <BrowserRouter>
      <Routes >

        {
          mainAppRoute.map((item:IAppRoute) => {

            const {route, Page} = item
            return (
              <Route key={route} path={route} element={<Page/>} />
            )
          })
        }

        {/* <Route path='*' element={<PageNotFound />} /> */}

      </Routes>
    </BrowserRouter>

  )
}

export default RootRouter
