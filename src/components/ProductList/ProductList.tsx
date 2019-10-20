import React, { useRef, SyntheticEvent } from 'react';
import styles from './ProductList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faFrown } from '@fortawesome/free-solid-svg-icons';
import { IProduct } from '../../types';
import Product from '../Product/Product';

interface IProps {
	/** Used to display a loading spinner when an API request is in progress */
	isLoading: boolean,

	/** The list of products returned from the API */
	products: Array<IProduct>,

	/** Whether there are no more results from the API */
	endOfResults: boolean,

	/** A function to call when requesting more products from the autoscroll */
	onRequestNextPage(): void
}

/** This component is memoized to prevent unnecessary re-renders */
const ProductList = React.memo<IProps>(({ isLoading, products, endOfResults, onRequestNextPage }) => {
	const container = useRef<HTMLDivElement>(null);

	const onScroll = (e: SyntheticEvent) => {
		if (container && container.current) {
			if (container.current.scrollHeight - container.current.scrollTop === container.current.clientHeight &&
				!endOfResults) {
				onRequestNextPage();
			}
		}
	};

	if (!products.length && !isLoading) {
		return (
			<div className={styles.noResultsContainer}>
				<FontAwesomeIcon icon={faFrown} className={styles.noResultsIcon} />
				<span className="is-size-2">No Results Found</span>
			</div>
		);
	}

	return (
		<div
			className={`${styles.productListContainer} ${isLoading ? styles.loading : ''}`}
			onScroll={onScroll}
			ref={container}>

			<div className={styles.productListScrollContainer}>
				{
					products.map((product, i) =>
						<Product key={i} product={product} />
					)
				}
			</div>

			{
				endOfResults && !isLoading ?
					<div className={styles.endOfResults}>
						End of results.
					</div>
					: null
			}

			<div className={styles.loadingSpinner}>
				<FontAwesomeIcon icon={faCircleNotch} style={{ fontSize: 36, color: 'rgb(122, 0, 60)' }} spin />
			</div>
		</div>
	);
});

export default ProductList;