import React, { useContext, useEffect } from 'react'
import { TITLE_ACTION, TitleContext } from '../../../reducer/Title.Reducer'
import { UserContext } from '../../../reducer/User.Reducer'
import {
	LEFT_MENU_USER_ACTION,
	LeftMenuUserContext
} from '../../../reducer/LeftMenuUser.Reducer'
import Authentication from '../../../component/common/Authentication'
import LeftMenuUser from '../../../component/user/settings/LeftMenuUser'

const AccountPage = () => {
	const titleCTX = useContext(TitleContext)
	const userCTX = useContext(UserContext)
	const leftMenuUserCTX = useContext(LeftMenuUserContext)

	useEffect(() => {
		titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, 'Hồ sơ người dùng')
		leftMenuUserCTX.setSubTitle(LEFT_MENU_USER_ACTION.SET_PROFILE)
	}, [])

	if (userCTX.state.userID === null) {
		return (
			<>
				<Authentication
					titleHeader={'Đăng nhập'}
					titleSub={'Đăng ký'}
					nameBtn={'Đăng nhập'}
				/>
			</>
		)
	} else {
		return (
			<>
				<div className={'px-330'}>
					<LeftMenuUser />
				</div>
				<style jsx>{``}</style>
			</>
		)
	}
}

export default AccountPage
