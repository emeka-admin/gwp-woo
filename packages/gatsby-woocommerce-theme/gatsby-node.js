const path = require( 'path' );
const createFrontPage = require( './create-pages/front-page' );
const createArchivePages = require( './create-pages/archive' );
const createPages = require( './create-pages/pages' );

// Create all pages.
exports.createPages = async ( { actions, graphql } ) => {
	await createFrontPage( { actions, graphql } );
	await createArchivePages( { actions, graphql } );
	await createPages( { actions, graphql } );
};

exports.onCreatePage = async ({ page, actions: { deletePage } }) => {
	const pages = [
		'checkout',
	].join('|');

	let regex = new RegExp('(/(?!' + pages + ').*?)((.html\/)|(.html)|/)');

	let match = page.path.match(regex);

	if(!match) {
		/*/# console.log(`Create page : ${page.path}`);*/
		return;
	}
	else {
		if (match[0] === page.path) {
			/*/# console.log(`Delete page : ${page.path}`);*/
			deletePage(page)
		}
		else {
			/*/# console.log(`Create page : ${page.path}`);*/
		}
	}
}

/**
 * Since the node_modules ( packages ) live outside the theme directory, making an alias for them.
 *
 * So Gutenberg styles can be accessed like so `@import "~@wordpress/base-styles/colors"`
 *
 * @param stage
 * @param actions
 */
exports.onCreateWebpackConfig = ({ stage, actions }) => {
	actions.setWebpackConfig({
		resolve: {
			alias: {
				'~': path.resolve(__dirname, '../../node_modules')
			}
		},
	})
};
