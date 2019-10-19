import React from 'react';
import styles from './SideBar.module.css';
import { IGroupByResult } from '../../types';

interface IProps {
	/** Whether or not the sidebar has been toggled visible on mobile. Sidebar is always visible on desktop */
	isMobileVisible: boolean,

	/** The API Group By Results used to populate filter controls */
	groupByResults: Array<IGroupByResult>
}

const SideBar: React.FC<IProps> = ({ isMobileVisible, groupByResults }) => {
	return (
		<aside className={`${styles.sidebarContainer} ${isMobileVisible ? styles.visible : ''} has-background-grey-light`}>

		</aside>
	);
}

export default SideBar;