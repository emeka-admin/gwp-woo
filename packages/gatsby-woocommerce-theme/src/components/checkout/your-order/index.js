import React, { useContext } from 'react';
import { getLocalPrice } from '../../../utils/functions';
import { AppContext } from '../../context/AppContext';
import CheckoutCartItem from "../checkout-cart-item";
import CardSection from '../stripe';

import './style.css';

const Index = ( { cart } ) => {

	const {country} = useContext(AppContext);

	return (
		<div className="your-order">
			{ cart ? (
				<>
					{/*Product Listing*/}
					<div className="cart-products">
						{ cart.products.length && (
							cart.products.map( item => (
								<CheckoutCartItem key={ item.productId } item={ item } />
							) )
						) }
					</div>
					<hr/>
					{/*Total*/}
					<tbody className="cart-total">
						<tr className="subtotal">
							<td className="col-lg-10 col-md-8">Sous-total</td>
							<td className="col-lg-2 col-md-4">
								{ !country ? `${cart.totalProductsPrice} - ` : getLocalPrice(country, cart.totalProductsPrice) }
							</td>
						</tr>
						<tr className="shipping">
							<td className="col-lg-10 col-md-8">Mode de livraison</td>
							<td className="col-lg-2 col-md-4">
								Gratuit
							</td>
						</tr>
						<tr className="total">
							<td className="col-lg-10 col-md-8">Total</td>
							<td className="col-lg-2 col-md-4">
								{ !country ? `${cart.totalProductsPrice} - ` : getLocalPrice(country, cart.totalProductsPrice) }
							</td>
						</tr>
					</tbody>
					<hr/>
					{/* TODO Ajouter handle avec service app to check coupon on Woocommerce */}
					{/* <div className="discount">
						<input type="text" name="discountCode" id="discountCode" placeholder="Discount code" />
						<button id="applyDiscount">Apply</button>
					</div>
					<hr/> */}
					<div className="payment">
						<span className="title">Méthode de paiement</span>
						<CardSection/>
					</div>
					<div className="purchase woo-next-place-order-btn-wrap">
						<button
							className="woo-next-large-black-btn woo-next-place-order-btn btn btn-dark"
							style={{ backgroundColor: '#fd7e35', color: '#fff', borderColor: '#fd7e35' }}
							type="submit"
						>
							Place Order
						</button>
					</div>
				</>
			) : '' }
		</div>
	)
};

export default Index;
