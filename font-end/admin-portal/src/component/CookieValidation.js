import React, { useContext, useEffect } from 'react'
import { USER_ACTION, UserContext } from '../reducer/User.Reducer'

const CookieValidation = props => {
	const userCTX = useContext(UserContext)

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('data'))
		const userID = userCTX.state.userID
		if (user !== undefined && user !== null && userID === null) {
			userCTX.addUser(USER_ACTION.ADD_USER_COOKIE, user)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userCTX.state.userID])

	return <>{props.children}</>
}

export default CookieValidation
