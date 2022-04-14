import React, { useContext } from 'react'
import { TitleContext } from '../../../reducer/Title.Reducer'
import Popup from './Popup'

const PopupContainer = ({ children }) => {
	const titleCTX = useContext(TitleContext)
	return (
		<>
			{titleCTX.state.popup.show ? (
				<Popup
					kind={titleCTX.state.popup.kind}
					content={titleCTX.state.popup.content}
				/>
			) : (
				<></>
			)}
			{children}
		</>
	)
}

export default PopupContainer
