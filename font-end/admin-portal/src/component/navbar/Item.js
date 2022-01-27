import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './Item.css'
import { HeaderContext } from '../../reducer/Header.Reducer'

const Item = ({ link, image, content, imageA }) => {
	const headerCTX = useContext(HeaderContext)

	if (headerCTX.state.path === link) {
		return (
			<>
				<div>
					<div
						className={
							'd-inline-flex align-items-center div-Item-optCtn div-Item-Active'
						}>
						<Link to={`${link}`}>
							<div className={'d-inline-flex align-items-center'}>
								<img
									src={`${imageA}`}
									alt={'edit'}
									className={'img-Item-space2'}
								/>
								<span className={'span-Item-ActiveOption'}> {content} </span>
							</div>
						</Link>
					</div>
				</div>
			</>
		)
	} else {
		return (
			<>
				<div>
					<div className={'div-Item-optCtn d-inline-flex align-items-center'}>
						<Link to={`${link}`}>
							<div className={'d-inline-flex align-items-center'}>
								<img
									src={`${image}`}
									alt={'edit'}
									className={'img-Item-space2'}
								/>
								<span className={'span-Item-Option'}> {content} </span>
							</div>
						</Link>
					</div>
				</div>
			</>
		)
	}
}

export default Item
