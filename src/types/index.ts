export interface IQueryParam {
	key: string,
	value: string
}

export interface IQueryResult {
	status: number,
	statusText: string,
	totalCount: number,
	results: Array<IProduct>,
	groupByResults: Array<IGroupByResult>
}

export interface IProduct {
	name: string,
	uri: string,
	excerpt?: string,
	imageUri: string,
	category?: string,
	country?: string,
	regularPrice: string,
	salePrice?: string,
	priceNumeric: number,
	producer?: string,
	color?: string
}

export interface IGroupByResult {
	field: string,
	values: Array<IGroupByResultItem>
}

export interface IGroupByResultItem {
	count: number,
	name: string
}