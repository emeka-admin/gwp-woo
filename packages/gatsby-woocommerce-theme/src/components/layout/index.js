/**
 * Layout component contains header and footer
 *
 * @package gatsby-wordpress-theme
 */

import React from "react"
import PropTypes from "prop-types"

import './../../sass/common.scss';

import Header from "../header";
import Footer from "../footer";

const Layout = ( { children, products = [], his = false }) => {

  // TODO set default menu properties
  var pageMenu = products.map((product) => {
    return product.contenuMenuProduit;
  }).filter(elem => elem)[0] || {};

  return (
    <>
      <Header pageMenu={pageMenu} his={his}/>
	    <main className="main-container">{children}</main>
	    <Footer pageMenu={pageMenu} his={his}/>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {
  products: []
}

export default Layout
