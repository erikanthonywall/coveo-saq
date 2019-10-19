import React, { useState, useEffect } from 'react';
import _debounce from 'lodash/debounce';

import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import Search from '../../components/Search/Search';
import ProductList from '../../components/ProductList/ProductList';

import { searchProducts } from '../../api/products';
import { IProduct, IGroupByResult, IQueryResult } from '../../types';

const executeSearch = (searchText: string, setIsLoading: Function, parseResult: Function) => {
	setIsLoading(true);

	searchProducts(searchText).then((res) => {
		setIsLoading(false);
		parseResult(res);
	});
};

const debouncedSearch = _debounce(executeSearch, 1000);

const SearchPage: React.FC = () => {
	const [isSideBarVisible, setIsSideBarVisible] = useState<boolean>(false);
	const [searchText, setSearchText] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [products, setProducts] = useState<Array<IProduct>>([]);
	const [groupByResults, setGroupByResults] = useState<Array<IGroupByResult>>([]);

	useEffect(() => {
		debouncedSearch(searchText, setIsLoading, parseResult);
	}, [searchText]);

	const parseResult = (res: IQueryResult) => {
		setProducts(res.results);
		setGroupByResults(res.groupByResults);
	};

	return (
		<>
			<Header onShowSideBar={() => setIsSideBarVisible(!isSideBarVisible)}>
				<Search searchText={searchText} onChange={setSearchText} />
			</Header>

			<main className="main">
				<SideBar isMobileVisible={isSideBarVisible} groupByResults={groupByResults} />

				<ProductList isLoading={isLoading} products={products} />
			</main>
		</>
	);
}

export default SearchPage;