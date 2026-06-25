import { Outlet, Link } from 'react-router-dom'
import { Icon } from './Icon'

export function AppShell() {
  return (
    <div className="app">
      <header className="topbar">
        <Link to="/" className="brand">
          <span className="brand-mark">
            <Icon name="topology-star-3" size={18} style={{ color: 'var(--accent)' }} />
          </span>
          <span className="brand-name">Coding&nbsp;Learning</span>
          <span className="brand-sub">设计师的代码学习平台</span>
        </Link>
        <nav className="topnav">
          <span className="navlink active">学习</span>
          <span className="navlink muted">工具</span>
          <span className="navlink muted">关于</span>
        </nav>
      </header>
      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}
