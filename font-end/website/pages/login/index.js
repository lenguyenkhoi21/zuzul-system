import React, { useContext, useEffect } from 'react'
import { timeNow } from '../../utils/Utils'
import { TITLE_ACTION, TitleContext } from '../../reducer/Title.Reducer'
import Authentication from '../../component/common/Authentication'
import { SEARCH_ACTION, SearchContext } from '../../reducer/Search.Reducer'

const LoginPage = () => {
	console.log(`${timeNow()} --- [LoginPage] --- pages/login/index.js`)
	const titleCTX = useContext(TitleContext)
	const searchCTX = useContext(SearchContext)

	useEffect(() => {
		titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, 'Đăng nhập')
		searchCTX.setSearchPage(SEARCH_ACTION.RESET)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<>
			<Authentication
				titleHeader={'Đăng nhập'}
				titleSub={'Đăng ký'}
				nameBtn={'Đăng nhập'}
			/>
			<style jsx>{``}</style>
		</>
	)
}

export default LoginPage
