export default function Footer() {
  return (
    <footer>
      <div className="wrap foot-row">
        <a href="/" className="logo">
          <span className="logo-mark" />
          <span>Oriflow</span>
        </a>
        <div className="foot-links">
          <a href="#">Privacy</a>
          <a href="#">Charter</a>
          <a href="#">Press</a>
          <a href="#">Careers</a>
          <a href="#">hi@oriflow.app</a>
        </div>
        <div style={{ fontSize: 13, opacity: 0.6 }}>© 2026 Oriflow · Made slowly</div>
      </div>
    </footer>
  )
}
