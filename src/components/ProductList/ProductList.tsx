import React, { useState } from 'react';
import styles from './ProductList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { IProduct } from '../../types';
import Product from '../Product/Product';

interface IProps {
	/** Used to display a loading spinner when an API request is in progress */
	isLoading: boolean,

	/** The list of products returned from the API */
	products: Array<IProduct>
}

const ProductList: React.FC<IProps> = ({ isLoading, products }) => {
	console.log(products);

	return (
		<div className={`${styles.productListContainer} ${isLoading ? styles.loading : ''}`}>
			<div className={`${styles.productListScrollContainer} ${isLoading ? styles.loading : ''}`}>
				{
					products.map((product, i) =>
						<Product key={i} product={product} />
					)
				}
			</div>

			<div className={styles.loadingSpinner}>
				<FontAwesomeIcon icon={faCircleNotch} className="has-text-primary" style={{ fontSize: 36 }} spin />
			</div>
		</div>
	);
}

export default ProductList;