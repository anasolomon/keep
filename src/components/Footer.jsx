import React from "react";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

function Footer() {
  return (
    <footer>
      <p>
        Copyright {" "}
        <a href="https://github.com/anasolomon" target="_blank">
          Ana-Maria Tanasciuc
        </a> {" "}
        © {currentYear}
      </p>
    </footer>
  );
}

export default Footer;
