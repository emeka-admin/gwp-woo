import React, { useContext } from 'react';
import { AppContext } from "../../context/AppContext";
import { graphql, Link, useStaticQuery } from 'gatsby';
import { getImgSrcs, getLocalPrice, sanitize } from "../../../utils/functions";

import './style.scss';
import AddToCart from '../../cart/add-to-cart-button';
import { ApolloConsumer } from '@apollo/client';

const Product = ({ product }) => {

	const {country} = useContext(AppContext);

    const icons = useStaticQuery(graphql`
        {
            rate_full: file(relativePath: { eq: "product-icons/rate-full.svg"}) {
                publicURL
            }
            rate_half: file(relativePath: { eq: "product-icons/rate-half.svg"}) {
                publicURL
            }
            facebook: file(relativePath: {eq: "product-icons/facebook.svg"}) {
                publicURL
            }
            instagram: file(relativePath: {eq: "product-icons/instagram.svg"}) {
                publicURL
            }
            pinterest: file(relativePath: {eq: "product-icons/pinterest.svg"}) {
                publicURL
            }
            clock: file(relativePath: {eq: "product-icons/clock.svg"}) {
                publicURL
            }
            return_shipping: file(relativePath: {eq: "product-icons/return-shipping.svg"}) {
                publicURL
            }
            safe_pay: file(relativePath: {eq: "product-icons/safe-pay.svg"}) {
                publicURL
            }
        }
    `);

    const rates = {
        'stamped-fa-star': 'rate_full',
        'stamped-fa-star-half-o': 'rate_half',
    };

    // console.log(product);
    // TODO upsell pour le checkout
    // console.log(icons);

    const low_in_stock = true;
    const has_variation = product.variations;

    const srcS = getImgSrcs(product.image);

    const manageVariation = (e, id) => {
        e.preventDefault();
        document.getElementById('product-form__option-variation').querySelectorAll('.block-swatch__radio.product-form__single-selector').forEach(function(elem) {
            if(elem.id != this.currentTarget.getAttribute('for')) {
                elem.checked = false;
            }
            else {
                elem.checked = true;
                setCurrentVariation(elem.dataset.optionPosition - 1);
            }
        }, e);
    }

    const [images] = React.useState([
        product.image,
        ...product.galleryImages.nodes.map(elem => elem)
    ]);

    const getImg = (elem) => {
        return elem.remoteFile.childImageSharp.fluid;
    }

    const resolveCurrentImg = (e) => {
        e.preventDefault();
        e.currentTarget.dataset.position > -1 && setCurrentImg(e.currentTarget.dataset.position);
    }

    const [currentImg, setCurrentImg] = React.useState(0);
    const [currentVariation, setCurrentVariation] = React.useState(0);

    const getIntPrice = (price) => {
        if(typeof price == "string") {
            return parseFloat(price.replace(/[^0-9,.]/g, ''))
        }
        else if(typeof price == "number") {
            return price;
        }
    }

    const getVarSale = (index) => {
        return getIntPrice(product.variations.nodes[index].salePrice);
    }
    const getVarRegular = (index) => {
        return getIntPrice(product.variations.nodes[index].regularPrice);
    }

    const getVarSaved = (index) => {
        return (100 - (getVarSale(index) * 100) / getVarRegular(index)).toFixed(0);
    }

    const getVarText = (index) => {
        return product.variations.nodes[index].name.replace(`${product.name} - `, '') + ` - SAVE ${getVarSaved(index)}%`;
    }

    return (
        <div className="product">
            <div className="row">
                <div className="col-md-6">
                    <div className="product-gallery">
                        <div className="product-gallery__thumbnails">
                            <img
                                className={`product-gallery__image${currentImg == 0 ? ' current' : ''}`}
                                src={getImg(product.image).srcWebp}
                                onClick={(e) => resolveCurrentImg(e)}
                                data-position={0}
                            />
                            {product.galleryImages.nodes.map((elem, key) => 
                                <img
                                    key={key}
                                    className={`product-gallery__image${currentImg == key + 1 ? ' current' : ''}`}
                                    src={getImg(elem).srcWebp}
                                    srcSet={getImg(elem).srcSetWebp}
                                    onClick={(e) => resolveCurrentImg(e)}
                                    data-position={key + 1}
                                />
                            )}
                            <noscript>
                                <img src="main"/>
                            </noscript>
                        </div>
                        <div className="product-gallery__main">
                            <img
                                src={getImg(images[currentImg]).srcWebp}
                                srcSet={getImg(images[currentImg]).srcSetWebp}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-6 card-custom-shadow">
                    <div className="product-meta">
                        <h1 className="product-meta__title">{product.name}</h1>
                        <div id="top-reviews-part">
                            <span className="product-rating" data-rating="4.92">
                                <span data-reviews="2856" data-rating="4.92">4.92</span>
                                <span className="stamped-starrating">
                                    {
                                        [
                                            'stamped-fa-star',
                                            'stamped-fa-star',
                                            'stamped-fa-star',
                                            'stamped-fa-star',
                                            'stamped-fa-star-half-o'
                                        ].map((elem, key) => 
                                        <span key={key} className={`stamped-fa ${elem}`}>
                                            <img src={icons[rates[elem]].publicURL}/>
                                        </span>
                                        )
                                    }
                                </span>
                                <span className="stamped-badge-caption" data-reviews="2856" data-rating="4.92">Based on 2856</span>
                            </span>
                        </div>
                        <div className="product-meta__share-buttons hidden-phone">
                            <div className="social-media__item-list">
                                <a href="https://www.facebook.com" target="_blank" rel="noopener">
                                    <span>4.5k</span>
                                    <img className="social-icon" src={icons.facebook.publicURL}/>
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener">
                                    <span>3.5k</span>
                                    <img className="social-icon" src={icons.instagram.publicURL}/>
                                </a>
                                <a href="https://pinterest.com" target="_blank" rel="noopener">
                                    <span>1.1k</span>
                                    <img className="social-icon" src={icons.pinterest.publicURL}/>
                                </a>
                            </div>
                            {low_in_stock && <div className="clock">
                                <img className="clock" src={icons.clock.publicURL}/>
                                <span className="clock-text">LOW IN STOCK</span>
                            </div>}
                        </div>
                    </div>
                    <hr className="card__separator"/>
                    {has_variation && <div className="product-form__variants">
                        <div id="product-form__option-variation" className="product-form__option" data-selector-type="block">
                            <span className="product-form__title">
                                BUNDLE &amp; SAVE
                            </span>
                            {has_variation && product.variations.nodes.map((variation, key) => 
                                <div key={key} className="block-swatch-list">
                                    <div className="block-swatch">
                                        <input
                                            className="block-swatch__radio product-form__single-selector"
                                            type="radio"
                                            name={`fixed_variants_selector-${variation.variationId}`}
                                            id={`fixed_variants_selector-${variation.variationId}`}
                                            value={getVarText(key)}
                                            defaultChecked={key == currentVariation}
                                            data-option-position={key + 1}
                                        />
                                        <label
                                            onClick={(e) => {manageVariation(e, variation.variationId);}}
                                            className="block-swatch__item"
                                            htmlFor={`fixed_variants_selector-${variation.variationId}`}
                                            title={variation.name.replace(`${product.name} - `, '')}
                                        >
                                            <span className="block-swatch__item-text">
                                                {getVarText(key)}
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="product-form__info-list" data-visible-id="">
                            <div className="product-form__info-item variation-price">
                                <span className="product-form__info-title">Price:</span>
                                <div className="price-list">
                                    <span>{getLocalPrice(country, getVarSale(currentVariation))}</span>
                                    <s>{getLocalPrice(country, getVarRegular(currentVariation))}</s>
                                </div>
                            </div>
                            <div className="product-form__info-item variation-save">
                                <span className="product-form__info-title">You Save:</span>
                                <div className="product-form__info-content">
                                    <span>{getLocalPrice(country, getVarRegular(currentVariation) - getVarSale(currentVariation))} ({getVarSaved(currentVariation)}%)</span>
                                </div>
                            </div>
                        </div>
                    </div>}
                    <div className="product-form__payment-container">
                        <div className="col-md-6 col-xs-12">
                            <AddToCart product={ {productId: product.productId, variationId: product.variations.nodes[currentVariation].variationId} } />
                        </div>
                        <div className="direct-purchase col-md-6 col-xs-12">
                            <span>Buy with</span>
                            <img className="PayPal"/>
                        </div>
                    </div>
                    <h4 className="secure-1">100% No-risk money back guarantee</h4>
                    <div className="secure-2">
                        <ul className="secure-img secure-img-details justify-content-center">
                            <li>
                                <img src={icons.return_shipping.publicURL}/>
                                <span>30 Day Returns</span>
                            </li>
                            <li>
                                <img src={icons.safe_pay.publicURL}/>
                                <span>Secure Payment</span>
                            </li>
                        </ul>
                    </div>
                    {/* {low_in_stock && <div className="low-in-stock">LOW IN STOCK</div>} */}
                </div>
            </div>
        </div>
    );
};

export { Product };