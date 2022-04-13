import React, { useContext, useEffect } from 'react'
import { HeaderContext } from './reducer/Header.Reducer'
import Popup from './component/common/popup/Popup'

const PopupContainer = ({ children }) => {
	const headerCTX = useContext(HeaderContext)

	return (
		<>
			{headerCTX.state.popup.show ? (
				<Popup
					kind={headerCTX.state.popup.kind}
					content={headerCTX.state.popup.content}
				/>
			) : (
				<></>
			)}
			{children}
		</>
	)
}

export default PopupContainer
