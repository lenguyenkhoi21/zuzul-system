import React, { useContext, useEffect } from 'react'
import { timeNow } from '../utils/Utils'
import { USER_ACTION, UserContext } from '../reducer/User.Reducer'

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
			/*
			 * TODO: Validated the Token
			 * Solution 1: Send the Token to the services authentication
			 * Solution 2: Logout. I'm lazy to fetch API
			 * */
			userCTX.addUser(USER_ACTION.ADD_USER, user)
			console.log(`${timeNow()} --- [useEffect()-CookieValidation] --- update`)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userCTX.state.userID])

	return <>{props.children}</>
}

export default React.memo(CookieValidation)
