import React from 'react';
import styles from './ProductTag.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IProps {
	/** The text of the tag */
	text: string,

	/** The icon to display in the tag */
	icon: IconProp,

	/** The background color of the tag */
	backgroundColor: string
}

const ProductTag: React.FC<IProps> = ({ text, icon, backgroundColor }) => {
	return (
		<div className={styles.tagContainer} style={{ background: backgroundColor }}>
			<FontAwesomeIcon className={styles.icon} icon={icon} />
			<span>{text}</span>
		</div>
	);
}

export default ProductTag;