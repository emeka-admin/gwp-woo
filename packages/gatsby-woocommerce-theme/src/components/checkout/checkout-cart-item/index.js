import React, { useContext } from 'react';
import { getLocalPrice } from '../../../utils/functions';
import { AppContext } from '../../context/AppContext';

import './style.css';

const CheckoutCartItem = ( { item } ) => {

	const {country} = useContext(AppContext);

	return (

		<div className="cart-item" key={ item.productId }>
			<div className="item-image col-md-2 col-xs-12">
				<img src={ item.image.sourceUrl } srcSet={ item.image.srcSet } alt={item.image.title}/>
			</div>
			<div className="item-text col-md-8 col-xs-8">
				<div className="item-title">{ item.name }</div>
				<div className="item-details">Aliquip proident elit velit tempor mollit adipisicing dolore proident enim aliqua.</div>
			</div>
			<div className="item-price col-md-2 col-xs-4">{ !country ? `${item.totalPrice} - ` : getLocalPrice(country, item.totalPrice) }</div>
		</div>
	)
};

export default CheckoutCartItem;
