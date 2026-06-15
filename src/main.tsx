import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './theme/global.css'
import './shell/shell.css'
import { AppShell } from './shell/AppShell'
import { CatalogPage } from './shell/CatalogPage'
import { ArticlePage } from './shell/ArticlePage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
