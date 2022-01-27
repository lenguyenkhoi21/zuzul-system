import React, { useContext, useState } from 'react'
import './Logout.css'
import { USER_ACTION, UserContext } from '../../reducer/User.Reducer'

const Logout = () => {
	const [hover, setHover] = useState(false)
	const userCTX = useContext(UserContext)

	const onMouseEnter = e => {
		console.log(e)
		setHover(true)
	}

	const onMouseLeave = e => {
		console.log(e)
		setHover(false)
	}

	const onClick = e => {
		userCTX.logout(USER_ACTION.LOGOUT)
	}

	if (hover) {
		return (
			<>
				<div>
					<div
						className={
							'div-Logout-optCtn d-inline-flex align-items-center div-Logout-Active div-Logout-space'
						}
						onClick={onClick}
						onMouseLeave={onMouseLeave}>
						<button className={'button-Logout-bg'}>
							<div className={'d-inline-flex align-items-center'}>
								<img
									src={'/navbar/logout.png'}
									alt={'edit'}
									className={'img-Logout-space2'}
								/>
								<span className={'span-Logout-ActiveOption'}> Đăng xuất </span>
							</div>
						</button>
					</div>
				</div>
			</>
		)
	} else {
		return (
			<>
				<div>
					<div
						className={
							'div-Logout-optCtn d-inline-flex align-items-center div-Logout-space'
						}
						onClick={onClick}
						onMouseEnter={onMouseEnter}>
						<button className={'button-Logout-bg'}>
							<div className={'d-inline-flex align-items-center'}>
								<img
									src={'/navbar/logout.png'}
									alt={'edit'}
									className={'img-Logout-space2'}
								/>
								<span className={'span-Logout-Option'}> Đăng xuất </span>
							</div>
						</button>
					</div>
				</div>
			</>
		)
	}
}

export default Logout
