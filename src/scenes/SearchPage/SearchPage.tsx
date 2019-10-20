import React, { useState, useEffect } from 'react';
import _debounce from 'lodash/debounce';
import _findIndex from 'lodash/findIndex';

import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import Search from '../../components/Search/Search';
import ProductList from '../../components/ProductList/ProductList';

import { searchProducts } from '../../api/products';
import { IProduct, IGroupByResult, IQueryResult, IFilters, IGroupByResultItem } from '../../types';

let firstResult: number = 0;
let appendResults = true;
let overwriteGroupByResults = true;

const executeSearch = (searchText: string, filters: IFilters, setIsLoading: Function, parseResult: Function) => {
	setIsLoading(true);

	searchProducts(searchText, filters, firstResult).then((res) => {
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

	// Handle searching when the search input is changed
	useEffect(() => {
		appendResults = false;
		firstResult = 0;
		overwriteGroupByResults = true;
		setFilters(EMPTY_FILTERS);
		debouncedSearch(searchText, filters, setIsLoading, parseResult);
	}, [searchText]);

	useEffect(() => {
		appendResults = false;
		firstResult = 0;
		debouncedSearch(searchText, filters, setIsLoading, parseResult);
	}, [filters]);

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
			setGroupByResults(res.groupByResults);
			overwriteGroupByResults = false;
		}
	};

	// Load more results from the autoscroller
	const loadMoreResults = () => {
		firstResult += 12;
		executeSearch(searchText, filters, setIsLoading, parseResult);
	};

	const setFilterOptions = (field: string, values: Array<string>) => {
		setFilters({
			...filters,
			[field]: values
		});
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
					filters={filters}
					onChange={setFilterOptions} />

				<ProductList
					isLoading={isLoading}
					endOfResults={products.length <= firstResult}
					products={products}
					onRequestNextPage={loadMoreResults} />
			</main>
		</>
	);
}

const EMPTY_FILTERS = {
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