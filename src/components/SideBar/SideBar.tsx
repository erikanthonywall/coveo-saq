import React from 'react';
import styles from './SideBar.module.css';
import { IGroupByResult, IFilters, ESortField, ESortDirection } from '../../types';
import GroupByResult from '../GroupByResult/GroupByResult';
import SortControls from '../SortControls/SortControls';

interface IProps {
	/** Whether or not the sidebar has been toggled visible on mobile. Sidebar is always visible on desktop */
	isMobileVisible: boolean,

	/** The API Group By Results used to populate filter controls */
	groupByResults: Array<IGroupByResult>,

	/** The field currently being sorted on */
	sortField: ESortField,

	/** The direction of sorting */
	sortDirection: ESortDirection,

	/** The function to call to change the sorting options */
	onChangeSort(field: ESortField): void

	/** The set of currently selected Group By Result filters */
	filters: IFilters,

	/** The function to call to change the filter options */
	onChangeFilters(field: string, values: Array<string>): void
}

const SideBar: React.FC<IProps> = ({
	isMobileVisible,
	groupByResults,
	sortField,
	sortDirection,
	onChangeSort,
	filters,
	onChangeFilters
}) => {
	return (
		<aside className={`${styles.sidebarContainer} ${isMobileVisible ? styles.visible : ''} has-background-grey-light`}>
			<SortControls field={sortField} direction={sortDirection} onChange={onChangeSort} />
			{
				groupByResults.map((gbr, i) =>
					<GroupByResult
						key={i}
						isCollapsedInitial={i > 3}
						groupByResult={gbr}
						filters={filters}
						onChange={onChangeFilters} />
				)
			}
		</aside>
	);
}

export default SideBar;