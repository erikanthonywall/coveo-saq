import React from 'react';
import styles from './SideBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'

interface IProps {
	/** Whether or not the sidebar has been toggled visible on mobile. Sidebar is always visible on desktop */
	isMobileVisible: boolean
}

const SideBar: React.FC<IProps> = ({ isMobileVisible }) => {
	return (
		<aside className={`${styles.sidebarContainer} ${isMobileVisible ? styles.visible : ''} has-background-grey-light`}>

		</aside>
	);
}

export default SideBar;