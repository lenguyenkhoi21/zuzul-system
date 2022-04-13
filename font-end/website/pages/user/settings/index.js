import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../../reducer/User.Reducer'
import Authentication from '../../../component/common/Authentication'
import { TITLE_ACTION, TitleContext } from '../../../reducer/Title.Reducer'
import LeftMenuUser from '../../../component/user/settings/LeftMenuUser'
import {
	LEFT_MENU_USER_ACTION,
	LeftMenuUserContext
} from '../../../reducer/LeftMenuUser.Reducer'

const UserSettingsPage = () => {
	const userCTX = useContext(UserContext)
	const titleCTX = useContext(TitleContext)
	const leftMenuUserCTX = useContext(LeftMenuUserContext)

	useEffect(() => {
		titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, 'Cài Đặt')
		leftMenuUserCTX.setSubTitle(LEFT_MENU_USER_ACTION.RESET)
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
				<div className={'px-330 page-body'}>
					<LeftMenuUser />
				</div>
				<style jsx>{``}</style>
			</>
		)
	}
}

export default UserSettingsPage
