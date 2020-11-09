const ImageFragment = `
fragment ImageFragment on WpMediaItem {
	  id
	  altText
	  caption
	  sourceUrl
      srcSet
	  mediaDetails {
	    sizes {
	      height
	      width
	      name
	      sourceUrl
	    }
	  }
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
`;

module.exports.ImageFragment = ImageFragment;
