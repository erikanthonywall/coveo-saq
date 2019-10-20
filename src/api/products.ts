import axios from 'axios';
import config from '../config/config.json';
import {
	IQueryResult, IFilters
} from '../types';

/*
Searches the Coveo API for products.

@param {string} q: The search term
@param {IFilters} filters: The map of filters to filter the results
@param {string} sortField: The field to sort on
@param {string} sortDir: The direction to sort, either 'ascending' or 'descending'

@returns Promise<IQueryResult>
*/
export const searchProducts = async (
	q: string,
	filters: IFilters,
	firstResult: number,
	sortField?: string,
	sortDir?: string
): Promise<IQueryResult> => {
	const aqArr: Array<string> = [];
	let aq: string = '';

	for (let key in filters) {
		if (filters[key].length === 1) {
			aqArr.push(`(@${key}=="${filters[key][0]}")`);
		} else if (filters[key].length > 1) {
			const valuesArr: Array<string> = [];

			for (let i in filters[key]) {
				valuesArr.push(`"${filters[key][i]}"`);
			}

			aqArr.push(`(@${key}==(${valuesArr.join(',')}))`);
		}
	}

	aq = aqArr.join(' ');

	const queryResult = await axios.post(config.coveo.baseUrl, {
		...defaultParams,
		q,
		aq,
		firstResult
	});

	return {
		status: queryResult.status,
		statusText: queryResult.statusText,
		totalCount: queryResult.data.totalCount,
		results: queryResult.data.results.map((result: any) => ({
			name: result.raw.systitle,
			uri: result.raw.sysclickableuri,
			excerpt: result.excerpt,
			imageUri: result.raw.tpthumbnailuri,
			category: result.raw.tpcategorie,
			country: result.raw.tppays,
			regularPrice: result.raw.tpprixnormal || result.raw.tpprixinitial,
			salePrice: result.raw.tpprixrabais,
			priceNumeric: result.raw.tpprixnum,
			producer: result.raw.tpproducteur,
			color: result.raw.tpcouleur
		})),
		groupByResults: queryResult.data.groupByResults.map((gbr: any) => ({
			field: gbr.field,
			label: getGroupByLabel(gbr.field),
			values: gbr.values.map((value: any) => ({
				count: value.numberOfResults,
				name: value.lookupValue
			}))
		}))
	};
}

const defaultParams = {
	language: 'en',
	excerptLength: 200,
	timeZone: Intl ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'America/Toronto',
	numberOfResults: 12,
	groupBy: [{
		field: '@tpenspecial'
	}, {
		field: '@tpdisponibilite'
	}, {
		field: '@tpcategorie'
	}, {
		field: '@tppays'
	}, {
		field: '@tpmillesime'
	}, {
		field: '@tpcepagenomsplitgroup'
	}, {
		field: '@tpinventairenomsuccursalesplitgroup'
	}, {
		field: '@tppastilledegout'
	}, {
		field: '@tpfamilledevinsplitgroup'
	}, {
		field: '@tpaccordsnommenu'
	}, {
		field: '@tpobservationsgustativesacidite'
	}, {
		field: '@tpobservationsgustativescorps'
	}, {
		field: '@tpobservationsgustativessucre'
	}, {
		field: '@tpobservationsgustativestannins'
	}, {
		field: '@tpobservationsgustativestexture'
	}]
};

const getGroupByLabel = (field: string) => {
	switch (field) {
		case 'tpenspecial':
			return 'On Sale';

		case 'tpdisponibilite':
			return 'Availability';

		case 'tpcategorie':
			return 'Category';

		case 'tppays':
			return 'Country';

		case 'tpmillesime':
			return 'Vintage';

		case 'tpcepagenomsplitgroup':
			return 'Variety';

		case 'tpinventairenomsuccursalesplitgroup':
			return 'Branch';

		case 'tppastilledegout':
			return 'Flavour Profile';

		case 'tpfamilledevinsplitgroup':
			return 'Family of Wine';

		case 'tpaccordsnommenu':
			return 'Suggested Pairings';

		case 'tpobservationsgustativesacidite':
			return 'Acidity';

		case 'tpobservationsgustativescorps':
			return 'Body';

		case 'tpobservationsgustativessucre':
			return 'Sweetness';

		case 'tpobservationsgustativestannins':
			return 'Tannins';

		case 'tpobservationsgustativestexture':
			return 'Texture';

		default:
			return null;
	}
}