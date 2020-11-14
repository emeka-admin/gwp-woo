import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';

import './style2.scss';

const Footer2 = ({ data, pageMenu }) => {

    const {
        topProduitDescription: {
            couleurBackgroundMenuFooter,
            couleurTexteDuMenu,
            footerUrls,
            footerMenu,
        }
    } = pageMenu;

    const urls = footerUrls.split(' | ');

    const icons = useStaticQuery(graphql`
        {
            ico_1 : file(relativePath: { eq : "footer-shopify/1.svg" }) {
                publicURL
            }
            ico_2 : file(relativePath: { eq : "footer-shopify/2.svg" }) {
                publicURL
            }
            ico_3 : file(relativePath: { eq : "footer-shopify/3.svg" }) {
                publicURL
            }
            ico_4 : file(relativePath: { eq : "footer-shopify/4.svg" }) {
                publicURL
            }
            payment_1: file(relativePath: { eq: "footer-payments/paypal.svg" }) {
                publicURL
                name
            }
            payment_2: file(relativePath: { eq: "footer-payments/american-express.svg" }) {
                publicURL
                name
            }
            payment_3: file(relativePath: { eq: "footer-payments/diners-club.svg" }) {
                publicURL
                name
            }
            payment_4: file(relativePath: { eq: "footer-payments/discover.svg" }) {
                publicURL
                name
            }
            payment_5: file(relativePath: { eq: "footer-payments/pi-cjb.svg" }) {
                publicURL
                name
            }
            payment_6: file(relativePath: { eq: "footer-payments/mastercard.svg" }) {
                publicURL
                name
            }
            payment_7: file(relativePath: { eq: "footer-payments/visa.svg" }) {
                publicURL
                name
            }
        }
    `);

    const shopify_part = [
        {
            'icon': icons.ico_1.publicURL,
            'title': 'World wide deliveries',
            'text_content': 'On all products',
        },
        {
            'icon': icons.ico_2.publicURL,
            'title': 'Satisfied or refunded',
            'text_content': '100% No-risk money back guarantee',
        },
        {
            'icon': icons.ico_3.publicURL,
            'title': 'Top-notch support',
            'text_content': '24/7 email and chat support',
        },
        {
            'icon': icons.ico_4.publicURL,
            'title': 'Secure payments',
            'text_content': 'Payment information is processed securely',
        }
    ];

    const resolveNewsletter = (e) => {
        e.preventDefault();
    }
    
    const payment_icons = [
        {'icon': icons.payment_1.publicURL, 'name': icons.payment_1.name},
        {'icon': icons.payment_2.publicURL, 'name': icons.payment_2.name},
        {'icon': icons.payment_3.publicURL, 'name': icons.payment_3.name},
        {'icon': icons.payment_4.publicURL, 'name': icons.payment_4.name},
        {'icon': icons.payment_5.publicURL, 'name': icons.payment_5.name},
        {'icon': icons.payment_6.publicURL, 'name': icons.payment_6.name},
        {'icon': icons.payment_7.publicURL, 'name': icons.payment_7.name},
    ];

    return (
        <footer style={{backgroundColor: couleurBackgroundMenuFooter}}>
            <div className="container">
                <div className="args-part">
                    {shopify_part.map((part, key) => 
                        <div key={key} className="arg">
                            <div className="icon" style={{backgroundImage: "url(" + part.icon +")"}}/>
                            {/* <iframe src={part.icon}></iframe> */}
                            <div className="text">
                                <div className="title">{part.title}</div>
                                <div className="text_content">{part.text_content}</div>
                            </div>
                        </div>
                    )}
                </div>
                <hr className="top" style={{backgroundColor: couleurBackgroundMenuFooter}}/>
                <div className="middle-part">
                    <div className="menus col-md-8 col-sm-8 col-xs-12">
                        <div className="title" style={{color: couleurTexteDuMenu}}>
                            Menus
                        </div>
                        {footerMenu.split(' | ').map((elem, key) => {
                            return (
                                <Link key={key} className="footer-elem" to={urls[key].replace(/["']/g, "")} style={{color: couleurTexteDuMenu}}>
                                    {elem}
                                </Link>
                            );
                        })}
                    </div>
                    <form onSubmit={(e) => {resolveNewsletter(e);}} className="newsletter col-md-4 col-sm-4 col-xs-12">
                        <div className="title">get the latest deals and more</div>
                        <input className="field" type="email" name="mail" placeholder="Your email" required/>
                        <button type="submit" className="send" style={{backgroundColor: couleurBackgroundMenuFooter}}>subscribe</button>
                    </form>
                </div>
                <div className="bottom-part row">
                    <div className="payments">
                        {payment_icons.map((payment, key) => (
                            <img key={key} className="payment" src={payment.icon} alt={payment.name}/>
                        ))}
                    </div>
                    <hr className="bottom"/>
                    <div className="credentials">
                        © 2020, Made with <span style={{color: 'red'}}>♥</span> by <a className="agency" href="https://emeka.fr" title="">Emeka</a> |  For a better web !
                    </div>
                </div>
            </div>
        </footer>
    )
}

export { Footer2 };