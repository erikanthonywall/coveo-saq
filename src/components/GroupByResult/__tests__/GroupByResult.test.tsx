import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import GroupByResult from '../GroupByResult';
import { EMPTY_FILTERS } from '../../../scenes/SearchPage/SearchPage';

describe('GroupByResult', () => {
	test('snapshot', () => {
		const component = renderer.create(
			<GroupByResult 
				isCollapsedInitial={false}
				filters={EMPTY_FILTERS}
				groupByResult={MOCK_GBR[2]}
				onChange={() => {}} />
		);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('renders the title correctly', () => {
		const wrapper = mount(
			<GroupByResult 
				isCollapsedInitial={false}
				filters={EMPTY_FILTERS}
				groupByResult={MOCK_GBR[2]}
				onChange={() => {}} />
		);

		expect(wrapper.find(`h3[data-test-id="gbrFieldName"]`).text()).toEqual('Category');
	});

	it('renders the filter options', () => {
		const wrapper = mount(
			<GroupByResult 
				isCollapsedInitial={false}
				filters={EMPTY_FILTERS}
				groupByResult={MOCK_GBR[2]}
				onChange={() => {}} />
		);

		expect(wrapper.find(`span[data-test-id="gbrCheckLabelName"]`).length).toEqual(10);
		expect(wrapper.find(`span[data-test-id="gbrCheckLabelName"]`).at(4).text()).toEqual('Rhum brun');
	});
});

const MOCK_GBR = [{
	"field": "tpenspecial",
	"label": "On Sale",
	"values": [{
		"count": 84,
		"name": "true"
	}]
}, {
	"field": "tpdisponibilite",
	"label": "Availability",
	"values": [{
		"count": 4573,
		"name": "En Ligne"
	}, {
		"count": 213,
		"name": "Bientôt disponible"
	}, {
		"count": 134,
		"name": "Commande Spéciale"
	}, {
		"count": 13155,
		"name": "En Succursale"
	}]
}, {
	"field": "tpcategorie",
	"label": "Category",
	"values": [{
		"count": 6348,
		"name": "Vin rouge"
	}, {
		"count": 3156,
		"name": "Vin blanc"
	}, {
		"count": 289,
		"name": "Vin rosé"
	}, {
		"count": 317,
		"name": "Champagne"
	}, {
		"count": 35,
		"name": "Rhum brun"
	}, {
		"count": 85,
		"name": "Whiskey américain"
	}, {
		"count": 433,
		"name": "Whisky écossais"
	}, {
		"count": 279,
		"name": "Vin mousseux"
	}, {
		"count": 27,
		"name": "Xérès"
	}, {
		"count": 180,
		"name": "Dry gin"
	}]
}, {
	"field": "tppays",
	"label": "Country",
	"values": [{
		"count": 5535,
		"name": "France"
	}, {
		"count": 2237,
		"name": "Italie"
	}, {
		"count": 1147,
		"name": "États-Unis"
	}, {
		"count": 93,
		"name": "Autriche"
	}, {
		"count": 232,
		"name": "Australie"
	}, {
		"count": 858,
		"name": "Espagne"
	}, {
		"count": 123,
		"name": "Allemagne"
	}, {
		"count": 541,
		"name": "Royaume Uni"
	}, {
		"count": 1002,
		"name": "Canada"
	}, {
		"count": 406,
		"name": "Portugal"
	}]
}, {
	"field": "tpmillesime",
	"label": "Vintage",
	"values": [{
		"count": 1856,
		"name": "2017"
	}, {
		"count": 2127,
		"name": "2016"
	}, {
		"count": 887,
		"name": "2018"
	}, {
		"count": 1616,
		"name": "2015"
	}, {
		"count": 983,
		"name": "2014"
	}, {
		"count": 292,
		"name": "2011"
	}, {
		"count": 209,
		"name": "2010"
	}, {
		"count": 425,
		"name": "2012"
	}, {
		"count": 104,
		"name": "2009"
	}, {
		"count": 513,
		"name": "2013"
	}]
}, {
	"field": "tpcepagenomsplitgroup",
	"label": "Variety",
	"values": [{
		"count": 1198,
		"name": "Syrah"
	}, {
		"count": 1382,
		"name": "Cabernet-sauvignon"
	}, {
		"count": 1518,
		"name": "Pinot noir"
	}, {
		"count": 1213,
		"name": "Merlot"
	}, {
		"count": 1619,
		"name": "Chardonnay"
	}, {
		"count": 430,
		"name": "Sangiovese"
	}, {
		"count": 160,
		"name": "Corvina"
	}, {
		"count": 131,
		"name": "Rondinella"
	}, {
		"count": 39,
		"name": "Molinara"
	}, {
		"count": 126,
		"name": "Shiraz"
	}]
}, {
	"field": "tpinventairenomsuccursalesplitgroup",
	"label": "Branch",
	"values": [{
		"count": 3367,
		"name": "Jonquière 33512"
	}, {
		"count": 2120,
		"name": "Galeries Charlesbourg 33616"
	}, {
		"count": 1352,
		"name": "Estimauville 33545"
	}, {
		"count": 1504,
		"name": "Valleyfield - Ch. Larocque 23071"
	}, {
		"count": 3461,
		"name": "Exclusivement pour les restaurateurs 23390"
	}, {
		"count": 2878,
		"name": "Châteauguay - Boul. d'Anjou 23129"
	}, {
		"count": 3250,
		"name": "Carrefour de la Pointe 23106"
	}, {
		"count": 3860,
		"name": "Exclusivement pour les restaurateurs 23385"
	}, {
		"count": 2089,
		"name": "Exclusivement pour les restaurateurs 33691"
	}, {
		"count": 963,
		"name": "Saint-Tite 33599"
	}]
}, {
	"field": "tppastilledegout",
	"label": "Flavour Profile",
	"values": [{
		"count": 296,
		"name": "Aromatique et charnu."
	}, {
		"count": 49,
		"name": "Corsé et complexe."
	}, {
		"count": 25,
		"name": "Agrumes."
	}, {
		"count": 89,
		"name": "Fruité et extra-doux."
	}, {
		"count": 286,
		"name": "Fruité et généreux."
	}, {
		"count": 293,
		"name": "Aromatique et souple."
	}, {
		"count": 23,
		"name": "Épicé."
	}, {
		"count": 19,
		"name": "Fruité."
	}, {
		"count": 136,
		"name": "Aromatique et rond."
	}, {
		"count": 22,
		"name": "Corsé et fumé."
	}]
}, {
	"field": "tpfamilledevinsplitgroup",
	"label": "Family of Wine",
	"values": [{
		"count": 1981,
		"name": "Sec"
	}, {
		"count": 898,
		"name": "Moyennement corsé"
	}, {
		"count": 289,
		"name": "Épicé"
	}, {
		"count": 923,
		"name": "Corsé"
	}, {
		"count": 612,
		"name": "Boisé"
	}, {
		"count": 1386,
		"name": "Fruité"
	}, {
		"count": 228,
		"name": "Doux"
	}, {
		"count": 94,
		"name": "Mousseux"
	}, {
		"count": 160,
		"name": "Léger"
	}, {
		"count": 54,
		"name": "Floral"
	}]
}, {
	"field": "tpaccordsnommenu",
	"label": "Suggested Pairings",
	"values": [{
		"count": 352,
		"name": "Agneau sur salsa d’herbes fraîches"
	}, {
		"count": 370,
		"name": "Boeuf barbecue à la marinade sèche"
	}, {
		"count": 215,
		"name": "Bavette au vin rouge, au poivre et au cumin"
	}, {
		"count": 244,
		"name": "Bobotie (hachis parmentier sud-africain)"
	}, {
		"count": 188,
		"name": "Brochettes de saucisses italiennes marinées"
	}, {
		"count": 149,
		"name": "Aubergines parmigiana"
	}, {
		"count": 64,
		"name": "Caponata sicilienne"
	}, {
		"count": 64,
		"name": "Cannellonis debout au boeuf et aux olives"
	}, {
		"count": 231,
		"name": "Boeuf braisé à la bière noire"
	}, {
		"count": 192,
		"name": "Burger de boeuf au cheddar et au bacon"
	}]
}, {
	"field": "tpobservationsgustativesacidite",
	"label": "Acidity",
	"values": [{
		"count": 2819,
		"name": "Rafraîchissante"
	}, {
		"count": 965,
		"name": "Vive"
	}, {
		"count": 186,
		"name": "Faible"
	}]
}, {
	"field": "tpobservationsgustativescorps",
	"label": "Body",
	"values": [{
		"count": 1981,
		"name": "Moyen"
	}, {
		"count": 1427,
		"name": "Corsé"
	}, {
		"count": 562,
		"name": "Léger"
	}]
}, {
	"field": "tpobservationsgustativessucre",
	"label": "Sweetness",
	"values": []
}, {
	"field": "tpobservationsgustativestannins",
	"label": "Tannins",
	"values": [{
		"count": 628,
		"name": "Souples"
	}, {
		"count": 1317,
		"name": "Charnus"
	}, {
		"count": 372,
		"name": "Fermes"
	}, {
		"count": 26,
		"name": "Rudes"
	}]
}, {
	"field": "tpobservationsgustativestexture",
	"label": "Texture",
	"values": [{
		"count": 2793,
		"name": "Ample"
	}, {
		"count": 494,
		"name": "Grasse"
	}, {
		"count": 178,
		"name": "Onctueuse"
	}, {
		"count": 505,
		"name": "Mince"
	}]
}];