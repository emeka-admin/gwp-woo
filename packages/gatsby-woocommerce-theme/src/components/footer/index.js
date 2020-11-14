/**
 * External dependencies.
 */
import React from 'react';
import { graphql, StaticQuery } from "gatsby";

/**
 * Internal dependencies.
 */
import './style.scss';
import { Footer } from "./footer-static";
import { Footer2 } from "./footer2";

/**
 * This is default Component Export.
 *
 * @return {*}
 */
export default (props) => {

	return (
		<StaticQuery
			query={ graphql`
				    query FooterQuery {
						  wp {
						    footer: getFooter {
						      copyrightText
						      sidebarOne
						      sidebarTwo
						      socialLinks {
						        iconUrl
						        iconName
						      }
						    }
						  }
						  footerMenuItems: allWpMenuItem(filter: {locations: {eq: HCMS_MENU_FOOTER}}) {
						    edges {
						      node {
						        id
						        databaseId
						        title
						        url
						        label
						      }
						    }
						  }
				    }
				` }
			render={ data => 
				<>
					{props.his ? <Footer data={ data } pageMenu={props.pageMenu}/> : <Footer2 data={ data } pageMenu={props.pageMenu}/>}
				</>
			}
		/>
	)
}
