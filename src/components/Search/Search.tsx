import React from 'react';
import styles from './Search.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

interface IProps {
	/** The text for the search bar */
	searchText: string,
	/** The callback to make changes to the searchText */
	onChange(searchText: string): void
}

const Search: React.FC<IProps> = ({ searchText, onChange }) => {
	return (
		<div className={`${styles.searchContainer} has-text-white`}>
			<FontAwesomeIcon
				icon={faSearch}
				className={styles.searchIcon} />

			<input
				className={styles.searchInput}
				type="text"
				placeholder="Search..."
				value={searchText}
				onChange={(e) => onChange(e.target.value)} />

			<div onClick={() => onChange('')}>
				<FontAwesomeIcon
					icon={faTimes}
					className={`
						${styles.searchIcon}
						${styles.clearButton}
						${searchText ? styles.clearButtonAnimation : ''}
					`} />
			</div>
		</div>
	);
}

export default Search;