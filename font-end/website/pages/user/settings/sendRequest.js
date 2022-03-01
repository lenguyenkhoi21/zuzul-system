import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../../reducer/User.Reducer'
import { TITLE_ACTION, TitleContext } from '../../../reducer/Title.Reducer'
import Authentication from '../../../component/common/Authentication'
import LeftMenuUser from '../../../component/user/settings/LeftMenuUser'
import UserAccountBackground from '../../../component/common/UserAccountBackground'

const SendRequestPage = () => {
	const userCTX = useContext(UserContext)
	const titleCTX = useContext(TitleContext)

	useEffect(() => {
		titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, 'Gửi yêu cầu')
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
				<div className={'px-330 div-SendRequest-container'}>
					<div className={'grid grid-cols-1'}>
						<UserAccountBackground />

						<div className={'flex grid-flow-col mt-6'}>
							<div className={'div-SendRequest-leftMenu min-h-fit'}>
								<LeftMenuUser />
							</div>
							<div className={'ml-5 div-SendRequest-formAccount'}>
								<div className={'mt-10 ml-10'}>
									<p className={'span-SendRequest-textTitle'}>Gửi yêu cầu</p>
									<br />
									<span className={'span-SendRequest-textSubtitle'}>
										Để bắt đầu bán hàng, bạn hãy nhấn vào nút gửi yêu cầu ngay
										dưới đây
									</span>
								</div>
								<hr className={'mt-7 mr-10 ml-10 hr-SendRequest-size'} />
								<div className={'grid grid-col-1'}>
									<div>
										<button className={'btn-SendRequest-sendRequest'}>
											Gửi yêu cầu
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<style jsx>{`
					.div-SendRequest-container {
						background: #f9f9f9;
					}
					.hr-SendRequest-size {
						height: 0px;
						border-radius: 12px;
					}
					.div-SendRequest-leftMenu {
						width: 217px;
						height: fit-content;
						background: #ffffff;
						box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
						border-radius: 12px;
						margin-bottom: 25px;
					}
					.div-SendRequest-formAccount {
						width: 100%;
						margin-bottom: 25px;
						border-radius: 12px;
						background: #ffffff;
					}
					.span-SendRequest-textTitle {
						font-family: Poppins;
						font-style: normal;
						font-weight: 600;
						font-size: 32px;
						line-height: 23px;
						color: #151515;
					}
					.span-SendRequest-textSubtitle {
						font-family: Open Sans;
						font-style: normal;
						font-weight: 400;
						font-size: 12px;
						line-height: 23px;
						color: #151515;
					}
					.btn-SendRequest-sendRequest {
						width: 200px;
						height: 45px;

						margin-top: 30px;
						margin-left: 38px;

						background: #46d362;
						border: 2px solid #2aa71a;
						box-sizing: border-box;
						border-radius: 12px;

						font-family: Roboto;
						font-style: normal;
						font-weight: 700;
						font-size: 15px;
						line-height: 17px;

						align-items: center;
						text-align: center;

						color: #ffffff;
					}
				`}</style>
			</>
		)
	}
}

export default SendRequestPage
