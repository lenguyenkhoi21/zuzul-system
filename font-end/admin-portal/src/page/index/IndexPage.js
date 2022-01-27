import React, { useContext, useEffect } from 'react'
import { HEADER_ACTION, HeaderContext } from '../../reducer/Header.Reducer'
import { PATH } from '../../utils/Constant'
import './IndexPage.css'

const IndexPage = () => {
	const headerCTX = useContext(HeaderContext)
	useEffect(() => {
		headerCTX.changeTitle(HEADER_ACTION.SET_TITLE, PATH.INDEX)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<div className={'col index-bg-color div-IndexPage-container'}></div>
		</>
	)
}

export default IndexPage
