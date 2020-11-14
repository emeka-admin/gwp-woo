import React, { useContext } from 'react';
import { getLocalPrice } from '../../../utils/functions';
import { AppContext } from '../../context/AppContext';
const CheckoutCartItem = ( { item } ) => {

	const {country} = useContext(AppContext);

	return (
		<tr className="woo-next-cart-item" key={ item.productId }>
			<td className="woo-next-cart-element">
				<img width="64" src={ item.image.sourceUrl } srcSet={ item.image.srcSet } alt={item.image.title}/>
			</td>
			<td className="woo-next-cart-element">{ item.name }</td>
			<td className="woo-next-cart-element">{ !country ? item.totalPrice : getLocalPrice(country, item.totalPrice) }</td>
		</tr>
	)
};

export default CheckoutCartItem;
