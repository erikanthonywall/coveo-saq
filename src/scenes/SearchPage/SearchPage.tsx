import React, { useState, useEffect } from 'react';
import _debounce from 'lodash/debounce';

import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import Search from '../../components/Search/Search';
import ProductList from '../../components/ProductList/ProductList';

import { searchProducts } from '../../api/products';
import { IProduct, IGroupByResult, IQueryResult, IFilters, ESortField, ESortDirection } from '../../types';

let firstResult: number = 0;
let appendResults = true;
let overwriteGroupByResults = true;

const executeSearch = (
	searchText: string,
	filters: IFilters,
	sortField: ESortField,
	sortDir: ESortDirection,
	setIsLoading: Function,
	parseResult: Function
) => {
	setIsLoading(true);

	searchProducts(searchText, filters, firstResult, sortField, sortDir).then((res) => {
		setIsLoading(false);
		parseResult(res);
	});
};

const debouncedSearch = _debounce(executeSearch, 1000);

const SearchPage: React.FC = () => {
	const [isSideBarVisible, setIsSideBarVisible] = useState<boolean>(false);
	const [searchText, setSearchText] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [products, setProducts] = useState<Array<IProduct>>([]);
	const [groupByResults, setGroupByResults] = useState<Array<IGroupByResult>>([]);
	const [filters, setFilters] = useState<IFilters>(EMPTY_FILTERS);
	const [sortField, setSortField] = useState<ESortField>(ESortField.relevance);
	const [sortDirection, setSortDirection] = useState<ESortDirection>(ESortDirection.descending);

	// Handle searching when the search input is changed
	useEffect(() => {
		appendResults = false;
		firstResult = 0;
		overwriteGroupByResults = true;
		setFilters(EMPTY_FILTERS);
		debouncedSearch(searchText, filters, sortField, sortDirection, setIsLoading, parseResult);
		// eslint-disable-next-line
	}, [searchText]);

	// Handle searching when filter options or sorting are changed
	useEffect(() => {
		appendResults = false;
		firstResult = 0;
		debouncedSearch(searchText, filters, sortField, sortDirection, setIsLoading, parseResult);
		// eslint-disable-next-line
	}, [filters, sortField, sortDirection]);

	// Parse the results of the search and set them in state
	const parseResult = (res: IQueryResult) => {
		if (appendResults) {
			setProducts([
				...products,
				...res.results
			]);
		} else {
			setProducts(res.results);
		}

		appendResults = true;

		if (overwriteGroupByResults) {
			console.log(res.groupByResults);
			setGroupByResults(res.groupByResults);
			overwriteGroupByResults = false;
		}
	};

	// Load more results from the autoscroller
	const loadMoreResults = () => {
		firstResult += 12;
		executeSearch(searchText, filters, sortField, sortDirection, setIsLoading, parseResult);
	};

	const setFilterOptions = (field: string, values: Array<string>) => {
		setFilters({
			...filters,
			[field]: values
		});
	};

	const setSortingOptions = (field: ESortField) => {
		if (field === sortField) {
			if (sortDirection === ESortDirection.ascending) {
				setSortDirection(ESortDirection.descending);
			} else {
				setSortDirection(ESortDirection.ascending);
			}
		} else {
			setSortField(field);
			setSortDirection(ESortDirection.descending);
		}
	};

	return (
		<>
			<Header onShowSideBar={() => setIsSideBarVisible(!isSideBarVisible)}>
				<Search searchText={searchText} onChange={setSearchText} />
			</Header>

			<main className="main">
				<SideBar
					isMobileVisible={isSideBarVisible}
					groupByResults={groupByResults}
					sortField={sortField}
					sortDirection={sortDirection}
					onChangeSort={setSortingOptions}
					filters={filters}
					onChangeFilters={setFilterOptions} />

				<ProductList
					isLoading={isLoading}
					endOfResults={products.length <= firstResult}
					products={products}
					onRequestNextPage={loadMoreResults} />
			</main>
		</>
	);
}

export const EMPTY_FILTERS = {
	tpenspecial: [],
	tpdisponibilite: [],
	tpcategorie: [],
	tppays: [],
	tpmillesime: [],
	tpcepagenomsplitgroup: [],
	tpinventairenomsuccursalesplitgroup: [],
	tppastilledegout: [],
	tpfamilledevinsplitgroup: [],
	tpaccordsnommenu: [],
	tpobservationsgustativesacidite: [],
	tpobservationsgustativescorps: [],
	tpobservationsgustativessucre: [],
	tpobservationsgustativestannins: [],
	tpobservationsgustativestexture: []
};

export default SearchPage;