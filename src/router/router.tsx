import { Routes, Route, BrowserRouter } from 'react-router-dom'
import OnboardingsGrid from '../pages/OnboardingsGrid'
import NotFound from '../pages/NotFound'
import Builder from '../pages/Builder'
import { MAIN_URL, BUILDER_URL, NOT_FOUND_URL, ONBOARDING_URL, DATA_URL } from '.'
import OnboardingViewer from '../pages/OnboardingViewer'
import DataGrid from '../pages/DataGrid'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={MAIN_URL} element={<OnboardingsGrid />} />
        <Route path={ONBOARDING_URL}>
          <Route path=":name" element={<OnboardingViewer />} />
          <Route path=":name/:step" element={<OnboardingViewer />} />
        </Route>
        <Route path={BUILDER_URL}>
          <Route index element={<Builder />} />
          <Route path=":id" element={<Builder />} />
        </Route>
        <Route path={DATA_URL}>
          <Route index element={<DataGrid />} />
          <Route path=":id" element={<DataGrid />} />
        </Route>
        <Route path={NOT_FOUND_URL} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
