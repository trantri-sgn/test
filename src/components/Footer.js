import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer>
      <p>Copyroght &copy; 2021 by NguyenAn</p>
      <Link style={{ textDecoration: "none" }} to="/about">
        About
      </Link>
    </footer>
  );
};

export default Footer;
