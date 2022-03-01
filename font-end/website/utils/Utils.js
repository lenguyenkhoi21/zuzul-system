import {
	API_DOMAIN,
	API_PRODUCT_SERVICE,
	STATIC_RESOURCE_MOCK
} from './APIUtils'

export const timeNow = () => {
	const now = new Date()
	return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}:${now.getMilliseconds()}`
}

export const fetchAPI = async (url, option) => {
	try {
		const response = await fetch(url, option)
		return await response.json()
	} catch (error) {
		return undefined
	}
}

export const imageLoader = ({ src, width, quality }) => {
	const split = src.split('|')

	let storage = ''

	const source = split[0]
	const id = split[1]

	if (source.substring(0, 4) === 'cate') storage = 'category'
	else if (source.substring(0, 3) === 'prd') storage = 'product'

	return `${API_DOMAIN}/${API_PRODUCT_SERVICE}/v1/pub/${storage}/${id}/${source}?w=${width}&q=${
		quality || 75
	}`
}
