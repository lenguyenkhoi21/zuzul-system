import React, { useContext, useEffect } from 'react'
import { USER_ACTION, UserContext } from '../reducer/User.Reducer'
import { API_DOMAIN, API_USER_SERVICE } from '../utils/Constant'

const CookieValidation = props => {
	const userCTX = useContext(UserContext)

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('data'))
		const userID = userCTX.state.userID
		if (user !== undefined && user !== null && userID === null) {
			fetch(`${API_DOMAIN}/${API_USER_SERVICE}/v1/admin/valid_token`, {
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
						userCTX.logout(USER_ACTION.LOGOUT)
					}
				})
				.catch(reason => {
					userCTX.logout(USER_ACTION.LOGOUT)
				})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userCTX.state.userID])

	return <>{props.children}</>
}

export default CookieValidation
