export default function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">Jobify</div>
      <nav>
        <a href="#">Find Jobs</a>
        <a href="#">Companies</a>
        <a href="#">Post Job</a>
        <a className="login" href="#">Login</a>
      </nav>
    </header>
  );
}
