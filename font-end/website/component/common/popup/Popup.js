import React, { useContext, useEffect, useRef } from 'react'
import { TITLE_ACTION, TitleContext } from '../../../reducer/Title.Reducer'
import Image from 'next/image'

const Popup = ({ content, kind }) => {
	const titleCTX = useContext(TitleContext)
	const clickRef = useRef(false)

	useEffect(() => {
		const timeout = setTimeout(() => {
			clickRef.current = true
		}, 1250)
		return () => clearTimeout(timeout)
	}, [])

	const closePopup = () => {
		if (clickRef.current) {
			titleCTX.removePopup(TITLE_ACTION.REMOVE_POPUP)
		}
	}

	return (
		<>
			<div className={'div-Popup-container'} onClick={closePopup}>
				<div className={'flex justify-center items-center div-Popup-cover'}>
					<div className={'div-Popup-content'}>
						<div className={'flex justify-center'}>
							<div>
								<div className={'flex justify-center div-Popup-image'}>
									{kind === true ? (
										<Image
											src={'/popup/checkmark.png'}
											width={50}
											height={50}
										/>
									) : (
										<> </>
									)}
									{kind === false ? (
										<Image
											src={'/popup/cancelmark.png'}
											width={50}
											height={50}
										/>
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
			<style jsx>{`
				.div-Popup-container {
					position: absolute;
					background-color: rgba(0, 0, 0, 0.3);
					top: 0;
					right: 0;
					bottom: 0;
					left: 0;
					width: 100vw;
					height: 100vh;
					z-index: 999;
				}

				.div-Popup-cover {
					height: 100vh;
				}

				.div-Popup-image {
					margin-bottom: 20px;
				}

				.div-Popup-content {
					background-color: #ffffff;
					border-radius: 5px;
					width: 800px;
					height: 200px;
					padding: 40px;
					opacity: unset;
				}

				.p-Popup-text {
					font-family: Open Sans;
					font-style: normal;
					font-weight: bold;
					font-size: 19px;
					line-height: 24px;
					letter-spacing: 0;
					color: #111111;
					opacity: 0.7;
				}
			`}</style>
		</>
	)
}

export default Popup
