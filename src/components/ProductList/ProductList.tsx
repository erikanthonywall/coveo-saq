import React from 'react';
import styles from './ProductList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

interface IProps {
	/** Used to display a loading spinner when an API request is in progress */
	isLoading: boolean
}

const ProductList: React.FC<IProps> = ({ isLoading }) => {
	return (
		<div className={`${styles.productListContainer} ${isLoading ? styles.loading : ''}`}>
			<div className={styles.loadingSpinner}>
				<FontAwesomeIcon icon={faCircleNotch} className="has-text-primary" style={{ fontSize: 36 }} spin />
			</div>
		</div>
	);
}

export default ProductList;