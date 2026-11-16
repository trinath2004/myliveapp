export default function SiteFooter() {
  return (
    <footer className="site-footer">
      © {new Date().getFullYear()} MTS · Famous Places Finder · BY Trinath Bysani
      <br />
      <small>Descriptions come from public knowledge. Please confirm opening times and details locally before you visit.</small>
    </footer>
  );
}
