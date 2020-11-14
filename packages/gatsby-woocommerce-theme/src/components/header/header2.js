import { Link } from 'gatsby';
import React from 'react';

import './style2.scss';

import defaultSiteLogoUrl from "../../images/logo.png";

const Header2 = ({ data, pageMenu }) => {

    // const {
        // wp: {
            // header: { siteTitle, siteTagLine, siteLogoUrl },
        // },
        // headerMenuItems,
    // } = data;

    const {
        topProduitDescription: {
            couleurBackgroundMenuFooter,
            couleurTexteDuMenu,
            headerUrls,
            headerMenu,
            imageMenu: {
                remoteFile: {
                    childImageSharp: {
                        fluid: {
                            srcWebp,
                            srcSetWebp
                        }
                    }
                }
            },
            siteTitle,
            siteTagLine,
        }
    } = pageMenu;

    const urls = headerUrls.split(' | ');

    // const siteLogoURL = siteLogoUrl ? siteLogoUrl : defaultSiteLogoUrl;

    return (
        <header style={{backgroundColor: couleurBackgroundMenuFooter}}>
            <div className="site-header-container container">
                <div className="site-header">
                    <div className="site-brand">
                        <Link to="/">
                            <figure>
                                <img
                                    className="site-brand__logo"
                                    src={srcWebp}
                                    srcSet={srcSetWebp}
                                    width="68"
                                    height="55"
                                    alt="header logo"
                                />
                            </figure>
                        </Link>
                        <div className="site-brand__content">
                            <h2 className="screen-reader-text site-brand__title">
                                {siteTitle || "DropEmeka"}
                            </h2>
                            <p className="site-brand__description">{siteTagLine || "Site de drop shipping Emeka"}</p>
                        </div>
                    </div>
                    <nav>
                        {headerMenu.split(' | ').map((elem, key) => {
                            return (
                                <Link key={key} className="nav-elem" to={urls[key].replace(/["']/g, "")} style={{color: couleurTexteDuMenu}}>
                                    {elem}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export { Header2 };