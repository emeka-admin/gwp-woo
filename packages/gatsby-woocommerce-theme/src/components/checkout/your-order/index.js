import React, { useContext } from 'react';
import { getLocalPrice } from '../../../utils/functions';
import { AppContext } from '../../context/AppContext';
import CheckoutCartItem from "../checkout-cart-item";

const Index = ( { cart } ) => {

	const {country} = useContext(AppContext);

	return (
		<>
			{ cart ? (
				<>
					{/*Product Listing*/}
					<table className="table table-hover">
						<thead>
						{ /* eslint-disable */ }
						<tr className="woo-next-cart-head-container">
							<th className="woo-next-cart-heading-el"/>
							<th className="woo-next-cart-heading-el">Product</th>
							<th className="woo-next-cart-heading-el">Total</th>
						</tr>
						</thead>
						<tbody>
						{ cart.products.length && (
							cart.products.map( item => (
								<CheckoutCartItem key={ item.productId } item={ item } />
							) )
						) }
						{/*Total*/}
						<tr className="">
							<td className=""/>
							<td className="woo-next-checkout-total">Subtotal</td>
							<td className="woo-next-checkout-total">{ !country ? cart.totalProductsPrice : getLocalPrice(country, cart.totalProductsPrice) }</td>
						</tr>
						<tr className="">
							<td className=""/>
							<td className="woo-next-checkout-total">Total</td>
							<td className="woo-next-checkout-total">{ !country ? cart.totalProductsPrice : getLocalPrice(country, cart.totalProductsPrice) }</td>
						</tr>
						</tbody>
					</table>
				</>
			) : '' }
		</>
	)
};

export default Index;
