import React, { useState } from 'react';
import styles from './GroupByResult.module.css';
import _indexOf from 'lodash/indexOf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { IGroupByResult, IFilters } from '../../types';

interface IProps {
	/** Whether this Group By Result group is initially collapsed */
	isCollapsedInitial: boolean,

	/** The category of Group By Results to render */
	groupByResult: IGroupByResult,

	/** The set of currently selected Group By Result filters */
	filters: IFilters,

	/** The function to call to change the filter options */
	onChange(field: string, values: Array<string>): void
}

const GroupByResult: React.FC<IProps> = ({ isCollapsedInitial, groupByResult, filters, onChange }) => {
	const [isCollapsed, setIsCollapsed] = useState<boolean>(isCollapsedInitial);

	const onCheckFilter = (value: string, checked: boolean) => {
		if (checked) {
			onChange(groupByResult.field, [
				...filters[groupByResult.field],
				value
			]);
		} else {
			const i = _indexOf(filters[groupByResult.field], value);

			if (i >= 0) {
				onChange(groupByResult.field, [
					...filters[groupByResult.field].slice(0, i),
					...filters[groupByResult.field].slice(i + 1)
				]);
			}
		}
	}

	const isChecked = (value: string) => {
		return _indexOf(filters[groupByResult.field], value) >= 0;
	}

	if (groupByResult.values.length === 0) {
		return null;
	}

	return (
		<div className={`noselect ${styles.gbrContainer} ${isCollapsed ? styles.collapsed : ''}`}>
			<div className={styles.gbrHeader}>
				<h3 data-test-id="gbrFieldName" className={styles.gbrFieldName}>
					{groupByResult.label}
				</h3>

				<div
					className={styles.collapseButton}
					onClick={() => setIsCollapsed(!isCollapsed)}>
					
					<FontAwesomeIcon
						icon={faChevronUp}
						className={styles.collapseIcon} />
				</div>
			</div>

			<div className={styles.collapseContainer}>
				{
					groupByResult.values.map((v, i) =>
						<div key={i} className={styles.filterRow}>
							<label className={`checkbox ${styles.gbrCheckLabel}`}>
								<input
									type="checkbox"
									checked={isChecked(v.name)}
									onChange={(e) => onCheckFilter(v.name, e.target.checked)} />
								
								<span data-test-id="gbrCheckLabelName" className={styles.gbrCheckLabelName}>
									{v.name === 'true' ? 'On Sale' : v.name}
								</span>
							</label>
						</div>
					)
				}
			</div>
		</div>
	);
}

export default GroupByResult;