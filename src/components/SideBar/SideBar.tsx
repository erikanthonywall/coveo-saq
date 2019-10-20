import React from 'react';
import styles from './SideBar.module.css';
import { IGroupByResult, IFilters } from '../../types';
import GroupByResult from '../GroupByResult/GroupByResult';

interface IProps {
	/** Whether or not the sidebar has been toggled visible on mobile. Sidebar is always visible on desktop */
	isMobileVisible: boolean,

	/** The API Group By Results used to populate filter controls */
	groupByResults: Array<IGroupByResult>,

	/** The set of currently selected Group By Result filters */
	filters: IFilters,

	/** The function to call to change the filter options */
	onChange(field: string, values: Array<string>): void
}

const SideBar: React.FC<IProps> = ({ isMobileVisible, filters, groupByResults, onChange }) => {
	return (
		<aside className={`${styles.sidebarContainer} ${isMobileVisible ? styles.visible : ''} has-background-grey-light`}>
			{
				groupByResults.map((gbr, i) =>
					<GroupByResult
						key={i}
						isCollapsedInitial={i > 3}
						groupByResult={gbr}
						filters={filters}
						onChange={onChange} />
				)
			}
		</aside>
	);
}

export default SideBar;