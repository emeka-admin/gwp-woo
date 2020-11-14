const { ImageFragment } = require('../image/index.js');

const ProductsFragment = `
fragment ProductsFragment on WpProduct {
        id
        productId
        nodeType
        link
        slug
        description
        galleryImages {
          nodes {
            id
            title
            altText
            mediaItemUrl
            srcSet
            remoteFile {
              extension
              childImageSharp {
                fluid {
                  srcWebp
                  srcSetWebp
                }
              }
            }
          }
        }
        contenuMenuProduit {
          topProduitDescription {
            headerMenu
            headerUrls
            footerMenu
            footerUrls
            fieldGroupName
            couleurTexteDuMenu
            couleurBackgroundMenuFooter
            imageMenu {
              remoteFile {
                childImageSharp {
                  fluid {
                    srcWebp
                    srcSetWebp
                  }
                }
              }
            }
          }
        }
        image {
          ...ImageFragment
        }
        productCategories {
          nodes {
            id
            name
          }
        }
        ... on WpSimpleProduct {
          id
          name
          price
        }
        ... on WpVariableProduct {
          id
          name
          price
          variations {
            nodes {
              regularPrice
              salePrice
              name
              variationId
              sku
            }
          }
        }
        ... on WpExternalProduct {
          id
          name
          price
          externalUrl
        }
        ... on WpGroupProduct {
          id
          name
          products {
            nodes {
              ... on WpSimpleProduct {
                id
                name
                price
              }
            }
          }
        }
      }
      ${ ImageFragment }
`;

module.exports.ProductsFragment = ProductsFragment;
