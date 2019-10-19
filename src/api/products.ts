import axios from 'axios';
import config from '../config/config.json';
import {
	IQueryResult
} from '../types';

/*
Searches the Coveo API for products.

@param {string} q: The search term
@param {string} sortField: The field to sort on
@param {string} sortDir: The direction to sort, either 'ascending' or 'descending'

@returns Promise<IQueryResult>
*/
export const searchProducts = async (
	q: string,
	sortField?: string,
	sortDir?: string
): Promise<IQueryResult> => {
	const queryResult = await axios.post(config.coveo.baseUrl, {
		...defaultParams,
		q
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
		"field": "@tpenspecial",
		"maximumNumberOfValues": 6,
		"sortCriteria": "occurrences",
		"injectionDepth": 1000,
		"completeFacetWithStandardValues": true
	}, {
		"field": "@tpdisponibilite",
		"maximumNumberOfValues": 6,
		"sortCriteria": "occurrences",
		"injectionDepth": 1000,
		"completeFacetWithStandardValues": true
	}, {
		"field": "@tpcategorie",
		"maximumNumberOfValues": 6,
		"sortCriteria": "occurrences",
		"injectionDepth": 1000,
		"completeFacetWithStandardValues": true
	}, {
		"field": "@tppays",
		"maximumNumberOfValues": 6,
		"sortCriteria": "occurrences",
		"injectionDepth": 1000,
		"completeFacetWithStandardValues": true
	}, {
		"field": "@tpregion",
		"maximumNumberOfValues": 6,
		"sortCriteria": "occurrences",
		"injectionDepth": 1000,
		"completeFacetWithStandardValues": true
	}, {
		"field": "@tpmillesime",
		"maximumNumberOfValues": 6,
		"sortCriteria": "occurrences",
		"injectionDepth": 1000,
		"completeFacetWithStandardValues": true
	}, {
		"field": "@tpcoteexpertsplitgroup",
		"maximumNumberOfValues": 6,
		"sortCriteria": "occurrences",
		"injectionDepth": 1000,
		"completeFacetWithStandardValues": true
	}, {
		"field": "@tpcepagenomsplitgroup",
		"maximumNumberOfValues": 6,
		"sortCriteria": "occurrences",
		"injectionDepth": 1000,
		"completeFacetWithStandardValues": true
	}, {
		"field": "@tpinventairenomsuccursalesplitgroup",
		"maximumNumberOfValues": 6,
		"sortCriteria": "occurrences",
		"injectionDepth": 1000,
		"completeFacetWithStandardValues": true
	}, {
		"field": "@tpclassification",
		"maximumNumberOfValues": 6,
		"sortCriteria": "occurrences",
		"injectionDepth": 1000,
		"completeFacetWithStandardValues": true
	}, {
		"field": "@tppastilledegout",
		"maximumNumberOfValues": 6,
		"sortCriteria": "occurrences",
		"injectionDepth": 1000,
		"completeFacetWithStandardValues": true
	}, {
		"field": "@tpfamilledevinsplitgroup",
		"maximumNumberOfValues": 6,
		"sortCriteria": "occurrences",
		"injectionDepth": 1000,
		"completeFacetWithStandardValues": true
	}, {
		"field": "@tpaccordsnommenu",
		"maximumNumberOfValues": 6,
		"sortCriteria": "occurrences",
		"injectionDepth": 1000,
		"completeFacetWithStandardValues": true
	}, {
		"field": "@tpparticularitesplitgroup",
		"maximumNumberOfValues": 6,
		"sortCriteria": "occurrences",
		"injectionDepth": 1000,
		"completeFacetWithStandardValues": true
	}, {
		"field": "@tpobservationsgustativesacidite",
		"maximumNumberOfValues": 6,
		"sortCriteria": "occurrences",
		"injectionDepth": 1000,
		"completeFacetWithStandardValues": true
	}, {
		"field": "@tpobservationsgustativescorps",
		"maximumNumberOfValues": 6,
		"sortCriteria": "occurrences",
		"injectionDepth": 1000,
		"completeFacetWithStandardValues": true
	}, {
		"field": "@tpobservationsgustativessucre",
		"maximumNumberOfValues": 6,
		"sortCriteria": "occurrences",
		"injectionDepth": 1000,
		"completeFacetWithStandardValues": true
	}, {
		"field": "@tpobservationsgustativestannins",
		"maximumNumberOfValues": 6,
		"sortCriteria": "occurrences",
		"injectionDepth": 1000,
		"completeFacetWithStandardValues": true
	}, {
		"field": "@tpobservationsgustativestexture",
		"maximumNumberOfValues": 6,
		"sortCriteria": "occurrences",
		"injectionDepth": 1000,
		"completeFacetWithStandardValues": true
	}, {
		"field": "@tpprixnum",
		"completeFacetWithStandardValues": true,
		"generateAutomaticRanges": true,
		"maximumNumberOfValues": 1,
		"queryOverride": "@sysuri",
		"sortCriteria": "nosort"
	}]
};