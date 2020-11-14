import React from 'react';
import './style.scss';

import { Product } from './product';

const SellSection = ({ products }) => {

    return (
        <div className="container">
            <div className="sell-section">
                {products.map(product => <Product key={product.id} product={product} /> )}
            </div>
        </div>
    );
};

export default SellSection;