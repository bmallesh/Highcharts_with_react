import React from 'react';
import {Link} from 'react-router-dom'

const navStyles ={
    color:"white"
}

function Nav() {
  return (
    <nav>
    <Link to="/" style={navStyles}>
    <h1>Logo</h1>
    </Link>
    <ul className="nav-list">
        <Link to="/chart" style={navStyles}>
      <li>Browser Market</li>
      </Link>
      <Link to="/coronaChart" style={navStyles}>
      <li>Corona Chart</li>
      </Link>
    </ul>
  </nav>
  );
}

export default Nav;
