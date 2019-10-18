import React from 'react';
import styles from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars } from '@fortawesome/free-solid-svg-icons';

interface IProps {
	onShowSideBar(): void,
	children?: any
}

const Header: React.FC<IProps> = ({ onShowSideBar, children }) => {
	return (
		<header className={`is-fluid has-background-primary noselect ${styles.headerContainer}`}>
			<div
				className={`
					${styles.headerButton}
					${styles.headerButtonLeft}
					is-hidden-tablet
				`}
				onClick={onShowSideBar}>
				
				<FontAwesomeIcon
					icon={faBars}
					className={styles.headerIcon} />
			</div>

			<div className={`${styles.headerContent}`}>

				<div className={`has-text-white is-size-5 is-size-3-desktop`}>
					Coveo + SAQ
				</div>

				{children}
			</div>

			<div className={`${styles.headerButton} ${styles.shoppingCartIcon}`}>
				<FontAwesomeIcon
					icon={faShoppingCart}
					className={styles.headerIcon} />
			</div>
		</header>
	)
}

export default Header;