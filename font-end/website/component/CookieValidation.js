import React, { useContext, useEffect } from 'react'
import { timeNow } from '../utils/Utils'
import { USER_ACTION, UserContext } from '../reducer/User.Reducer'
import { API_DOMAIN, API_USER_SERVICE } from '../utils/APIUtils'

const CookieValidation = props => {
	console.log(
		`${timeNow()} --- [CookieValidation] --- Rendering Component CookieValidation at /component/CookieValidation.js`
	)

	//Get User-Context
	const userCTX = useContext(UserContext)

	//TODO: Reading the cookie, validate it then set to reducer
	useEffect(() => {
		console.log(
			`${timeNow()} --- [useEffect()-CookieValidation] --- at /component/CookieValidation.js`
		)
		const user = JSON.parse(localStorage.getItem('data'))
		const userID = userCTX.state.userID
		// Cookie has been existed
		if (user !== undefined && user !== null && user !== '' && userID === null) {
			fetch(`${API_DOMAIN}/${API_USER_SERVICE}/v1/pub/valid_token`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${user.accessToken}`
				},
				mode: 'cors'
			})
				.then(response => {
					if (response.status === 200) {
						userCTX.addUser(USER_ACTION.ADD_USER_COOKIE, user)
					} else {
						userCTX.removeUser(USER_ACTION.REMOVE_USER)
					}
				})
				.catch(reason => {
					userCTX.removeUser(USER_ACTION.REMOVE_USER)
				})
			/*			userCTX.addUser(USER_ACTION.ADD_USER, user)*/
			console.log(`${timeNow()} --- [useEffect()-CookieValidation] --- update`)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userCTX.state.userID])

	return <>{props.children}</>
}

export default CookieValidation
