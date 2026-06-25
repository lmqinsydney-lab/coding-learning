import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import '@fontsource/poppins/latin-700.css' // Poppins Bold（自托管，避免 Google Fonts 在国内被墙）
import './theme/global.css'
import './shell/shell.css'
import { AppShell } from './shell/AppShell'
import { CatalogPage } from './shell/CatalogPage'
import { ArticlePage } from './shell/ArticlePage'

/** 路由切换（按 pathname）后回到页顶；不监听 search，故打开模块的 ?m= 仍交给文章内的锚定逻辑。 */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* HashRouter：GitHub Pages 等静态托管下，深链/刷新走 #/ 不会 404 */}
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>,
)
