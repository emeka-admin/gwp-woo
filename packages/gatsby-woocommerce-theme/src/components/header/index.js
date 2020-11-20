/**
 * External dependencies.
 */
import PropTypes from 'prop-types';
import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

/**
 * Internal dependencies.
 */
import { Header } from "./header-static";
import { Header2 } from "./header2";

/**
 * Default Header Component Export.
 *
 * @return {*}
 */
export default ( props ) => {

	// TODO add product image there as a thumbnail for the tab icon
	return (
		<StaticQuery
			query={ graphql`
				    query HeaderQuery {
					  wp {
					    header: getHeader {
					      siteLogoUrl
					      siteTagLine
					      siteTitle
					      favicon
					    }
					  }
					  headerMenuItems: allWpMenuItem(filter: {locations: {eq: HCMS_MENU_HEADER}}) {
					    edges {
					      node {
					        id
					        databaseId
					        title
					        url
					        label
					        childItems {
					          nodes {
					            id
					            databaseId
					            label
					            url
					          }
					        }
					      }
					    }
					  }
				    }
				` }
			render={ data => (
				<>
					{props.his ? <Header data={ data } pageMenu={props.pageMenu} /> : <Header2 data={ data } pageMenu={props.pageMenu} />}
				</>
			) }
		/>
	)
}

Header.propTypes = {
	siteTitle: PropTypes.string,
};

Header.defaultProps = {
	siteTitle: 'Gatsby WooCommerce Theme',
	data: {
		wp: {}
	},
};
