import { STATIC_RESOURCE_MOCK } from './APIUtils'

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
	return `${STATIC_RESOURCE_MOCK}/${src}?w=${width}&q=${quality || 75}`
}
