import React, { useContext, useEffect } from 'react'
import Authentication from '../../component/common/Authentication'
import { timeNow } from '../../utils/Utils'
import { TITLE_ACTION, TitleContext } from '../../reducer/Title.Reducer'

const RegisterPage = () => {
	console.log(`${timeNow()} --- [RegisterPage] --- pages/register/index.js`)
	const titleCTX = useContext(TitleContext)

	useEffect(() => {
		titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, 'Đăng ký')
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<>
			<Authentication
				titleHeader={'Đăng ký'}
				titleSub={'Đăng nhập'}
				nameBtn={'Đăng ký'}
				textDK={'Bằng việc Đăng ký, bạn đã đồng ý với '}
				textDK2={'Điều khoản sử dụng của Zuzul'}
			/>
			<style jsx>{``}</style>
		</>
	)
}

export default RegisterPage
