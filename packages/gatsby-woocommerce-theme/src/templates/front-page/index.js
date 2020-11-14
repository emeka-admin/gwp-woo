import React from "react";
import Search from "../../components/home/search";
import { isEmpty } from 'lodash';
import Layout from "../../components/layout";
import Carousel from "../../components/home/carousel";
import SellSection from "../../components/home/sell-section";
import SEO from "../../components/seo";
import { getOgImage } from "../../utils/functions";

const FrontPage = ( props ) => {

	const {
		      pageContext: {
			      page: { title, seo, uri },
			      categories,
			      categoryName,
			      postSearchData: { products, options }
		      }
		  } = props;
		  
	const his = false;

	return (
		<Layout products={products} his={his}>
			{
				! isEmpty( props.pageContext ) ? (
					<>
						<SEO
							title={ title }
							seoData={ seo }
							uri={ uri }
							header={ { siteTitle: title || 'Titre par défaut' } }
							openGraphImage={ getOgImage( seo ) }
						/>
						{his && <><Carousel categories={ categories }/>
						<Search
							products={ products }
							initialProducts={ products }
							engine={ options }
							category={ categoryName }
							categories={ categories }
						/></>}
						{!his && <SellSection products={ products }/>}
					</>
				) : (
					<div>Something went wrong</div>
				)
			}
		</Layout>
	)
};
export default FrontPage;

