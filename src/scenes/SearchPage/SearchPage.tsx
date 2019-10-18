import React, { useState, useEffect } from 'react';
import _debounce from 'lodash/debounce';

import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import Search from '../../components/Search/Search';
import ProductList from '../../components/ProductList/ProductList';

import { searchProducts } from '../../api/products';

const executeSearch = (searchText: string, setIsLoading: Function) => {
	setIsLoading(true);

	searchProducts(searchText).then((res) => {
		console.log(res);
		setIsLoading(false);
	});
};

const debouncedSearch = _debounce(executeSearch, 1000);

const SearchPage: React.FC = () => {
	const [isSideBarVisible, setIsSideBarVisible] = useState<boolean>(false);
	const [searchText, setSearchText] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		debouncedSearch(searchText, setIsLoading);
	}, [searchText]);

	return (
		<>
			<Header onShowSideBar={() => setIsSideBarVisible(!isSideBarVisible)}>
				<Search searchText={searchText} onChange={setSearchText} />
			</Header>

			<main className="main">
				<SideBar isMobileVisible={isSideBarVisible} />

				<ProductList isLoading={isLoading} />
			</main>
		</>
	);
}

export default SearchPage;