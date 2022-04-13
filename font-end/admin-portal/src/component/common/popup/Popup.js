import React, { useContext, useEffect, useRef, useState } from 'react'
import './Popup.css'
import { HEADER_ACTION, HeaderContext } from '../../../reducer/Header.Reducer'

const Popup = ({ content, kind }) => {
	const headerCTX = useContext(HeaderContext)
	const clickRef = useRef(false)

	useEffect(() => {
		const timeout = setTimeout(() => {
			clickRef.current = true
		}, 1250)
		return () => clearTimeout(timeout)
	}, [])

	const closePopup = () => {
		if (clickRef.current) {
			headerCTX.removePopup(HEADER_ACTION.REMOVE_POPUP)
		}
	}

	return (
		<>
			<div className={'div-Popup-container'} onClick={closePopup}>
				<div
					className={
						'div-Popup-cover d-flex justify-content-center align-items-center'
					}>
					<div className={'div-Popup-content'}>
						<div className={'d-flex justify-content-center align-items-center'}>
							<div>
								<div
									className={
										'div-Popup-image d-flex justify-content-center align-items-center'
									}>
									{kind === true ? (
										<img src={'/popup/checkmark.png'} />
									) : (
										<> </>
									)}
									{kind === false ? (
										<img src={'/popup/cancelmark.png'} />
									) : (
										<></>
									)}
								</div>
								<p className={'p-Popup-text'}> {content} </p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Popup
