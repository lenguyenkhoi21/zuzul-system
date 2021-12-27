import React, { useRef } from 'react'
import CategoryDetail from './CategoryDetail'
import { timeNow } from '../../utils/Utils'

const CategoryScroll = ({ categoryList }) => {
	console.log(
		`${timeNow()} --- [CategoryScroll] --- Render at component/common/CategoryScroll.js`
	)
	const scroll = useRef(null)
	const scrollStep = 75
	const executeScroll = (e, button) => {
		const sl = scroll.current.scrollLeft
		const cw = scroll.current.scrollWidth

		if (button === 'left') {
			if (sl - scrollStep <= 0) {
				scroll.current.scrollTo(0, 0)
			} else {
				scroll.current.scrollTo(sl - scrollStep, 0)
			}
		} else if (button === 'right') {
			if (sl + scrollStep >= cw) {
				scroll.current.scrollTo(cw, 0)
			} else {
				scroll.current.scrollTo(sl + scrollStep, 0)
			}
		}
	}
	return (
		<>
			<div className={'flex items-center div-CategoryScroll-container'}>
				<div>
					<button
						onClick={e => {
							executeScroll(e, 'left')
						}}
						className={'btn-CategoryScroll-sl font-poppins'}>
						{' '}
						&lt;{' '}
					</button>
				</div>
				<div
					ref={scroll}
					className={
						'flex overflow-x-auto items-center div-CategoryScroll-text'
					}>
					{categoryList.map((value, key) => (
						<React.Fragment key={key}>
							<CategoryDetail category={value} />
						</React.Fragment>
					))}
				</div>

				<div>
					<button
						onClick={e => {
							executeScroll(e, 'right')
						}}
						className={'btn-CategoryScroll-sr font-poppins'}>
						{' '}
						&gt;{' '}
					</button>
				</div>
			</div>
			<style jsx>
				{`
					.div-CategoryScroll-container {
						margin-top: 35px;
						box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
						background-color: rgba(255, 255, 255, 1);
						margin-bottom: 34px;
					}

					.btn-CategoryScroll-sl {
						width: 30px;
						max-width: 30px;
						height: 60px;
						border-bottom-right-radius: 10px;
						border-top-right-radius: 10px;
						background-color: #6a983c;
						margin-right: 10px;
					}

					.btn-CategoryScroll-sr {
						width: 30px;
						height: 60px;
						border-top-left-radius: 10px;
						border-bottom-left-radius: 10px;
						background-color: #6a983c;
						margin-left: 10px;
					}

					.div-CategoryScroll-text {
						white-space: nowrap;
						overflow: hidden;
						padding-top: 12px;
					}
				`}
			</style>
		</>
	)
}

export default React.memo(CategoryScroll)
