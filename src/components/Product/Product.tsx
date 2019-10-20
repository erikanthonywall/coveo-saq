import React from 'react';
import styles from './Product.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faFlag, faWineBottle, faCity, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { IProduct } from '../../types';
import ProductTag from '../ProductTag/ProductTag';

interface IProps {
	/** The list of products returned from the API */
	product: IProduct
}

const Product = React.memo<IProps>(({ product }) => {
	return (
		<div className={styles.productContainer}>
			<div className={styles.productImageWrapper}>
				<div className={styles.productImageColumn}>
					{
						product.salePrice ?
							<ProductTag text="On Sale" icon={faDollarSign} backgroundColor="hsl(141, 71%, 48%)" />
							: null
					}

					{
						product.country ?
							<ProductTag text={product.country} icon={faFlag} backgroundColor="hsl(348, 100%, 61%)" />
							: null
					}

					{
						product.category ?
							<ProductTag text={product.category} icon={faWineBottle} backgroundColor="hsl(48, 100%, 55%)" />
							: null
					}

					{
						product.producer ?
							<ProductTag text={product.producer} icon={faCity} backgroundColor="hsl(204, 86%, 53%)" />
							: null
					}
				</div>

				<div className={styles.productImageColumn}>
					<img className={styles.productImage} src={product.imageUri} alt={product.name} />
				</div>

				<div className={styles.productImageOverlay}>
					<a href={product.uri} target="_blank" rel="noopener noreferrer">
						<FontAwesomeIcon className={styles.productImageOverlayIcon} icon={faExternalLinkAlt} />
					</a>
				</div>
			</div>

			<div className={`${styles.productLabel} has-background-primary`}>
				<div style={{ height: 45 }}>
					<a href={product.uri} target="_blank" rel="noopener noreferrer">
						<span className={`${styles.productLink} has-text-white`}>{product.name}</span>
					</a>
				</div>

				<div>
					<div
						className="has-text-white"
						style={{
							textDecoration: product.salePrice ? 'line-through' : 'none'
						}}>
						{product.regularPrice}
					</div>

					<div className="has-text-white">
						{product.salePrice}
					</div>
				</div>
			</div>
		</div>
	);
});

export default Product;