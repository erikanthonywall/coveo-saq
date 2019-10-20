import React from 'react';
import styles from './SortControls.module.css';
import { ESortField, ESortDirection } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEquals, faArrowUp, faCalendar, faDollarSign, faWineGlassAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IProps {
	/** The field to sort on */
	field: ESortField,

	/** The direction of sorting */
	direction: ESortDirection,

	/** The function to call to change the sorting options */
	onChange(field: ESortField): void
}

const SortControls: React.FC<IProps> = ({
	field,
	direction,
	onChange
}) => {
	return (
		<div className={`${styles.sortContainer} noselect`}>
			<div className={styles.sortHeader}>
				<h3>
					Sort
				</h3>
			</div>

			<SortControl
				field={ESortField.relevance}
				direction={direction}
				isActive={field === ESortField.relevance}
				onChange={onChange} />

			<SortControl
				field={ESortField.date}
				direction={direction}
				isActive={field === ESortField.date}
				onChange={onChange} />

			<SortControl
				field={ESortField.price}
				direction={direction}
				isActive={field === ESortField.price}
				onChange={onChange} />

			<SortControl
				field={ESortField.vintage}
				direction={direction}
				isActive={field === ESortField.vintage}
				onChange={onChange} />
		</div>
	);
}

interface ISortControlProps {
	field: ESortField,
	direction: ESortDirection,
	isActive: boolean,
	onChange(field: ESortField): void
}

const SortControl: React.FC<ISortControlProps> = ({ field, direction, isActive, onChange }) => {
	let icon: IconProp = faEquals;
	let text: string = 'Relevance';

	if (field === ESortField.price) {
		icon = faDollarSign;
		text = 'Price';
	} else if (field === ESortField.date) {
		icon = faCalendar;
		text = 'Date';
	} else if (field === ESortField.vintage) {
		icon = faWineGlassAlt;
		text = 'Vintage';
	}

	return (
		<div className={styles.sortRow} onClick={() => onChange(field)}>
			<FontAwesomeIcon icon={icon} />

			<span>{text}</span>

			{
				field === ESortField.relevance && isActive ?
					<FontAwesomeIcon
						icon={faCheck} />
					
					: isActive ?
						<FontAwesomeIcon
							icon={faArrowUp}
							style={{
								transform: direction === ESortDirection.descending ? 'rotate(180deg)' : ''
							}} />
						: null
			}
		</div>
	);
}

export default SortControls;