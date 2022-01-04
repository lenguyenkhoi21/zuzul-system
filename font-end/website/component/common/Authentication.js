import React from 'react'

const Authentication = ({
	titleHeader,
	titleSub,
	nameBtn,
	textRegister,
	textRegisterSub
}) => {
	return (
		<>
			<div
				className={'flex justify-center px-330 div-Authentication-container'}>
				<form
					className={
						'grid grid-cols-1 gap-4 place-content-start form-Authentication-size'
					}>
					<div className={'row-span-3 '}></div>

					<div className={'grid grid-cols-2 grid-flow-col'}>
						<div className={'flex justify-center'}>
							<div className={'flex'}>
								<div className={'flex-initial w-40'}>
									<label className={'label-Authentication-login'}>
										{titleHeader}
									</label>
								</div>
							</div>
						</div>
						<div className={''}></div>
					</div>

					<div className={'flex gap-4 justify-center p-4'}>
						<label className={'label-Authentication-subtitle'}>
							Bạn chưa có tài khoản?
						</label>
						<label className={'label-Authentication-subtitle2'}>
							{titleSub}
						</label>
					</div>

					<div className={'grid grid-cols-1'}>
						<div className={'grid grid-cols-2 grid-flow-col'}>
							<div className={'flex justify-center '}>
								<div className={'flex'}>
									<div className={'flex-initial w-32'}>
										<label
											name={'phoneNumber'}
											className={'label-Authentication-phoneNumberAndPass'}>
											Số điện thoại
										</label>
										<label
											className={'label-Authentication-phoneNumberAndPass2'}>
											*
										</label>
									</div>
								</div>
							</div>
						</div>

						<div className={'flex justify-center'}>
							<input
								type={'text'}
								name={'phoneNumberInput'}
								className={'input-Authentication-size'}></input>
						</div>
					</div>

					<div className={'grid grid-cols-1 '}>
						<div className={'grid grid-cols-2 grid-flow-col'}>
							<div className={'flex justify-center'}>
								<div className={'flex'}>
									<div className={'flex-initial w-32'}>
										<label
											name={'passWord'}
											className={'label-Authentication-phoneNumberAndPass'}>
											Mật khẩu
										</label>
										<label
											className={'label-Authentication-phoneNumberAndPass2'}>
											*
										</label>
									</div>
								</div>
							</div>
						</div>
						<div className={'flex justify-center'}>
							<input
								type={'text'}
								name={'passWordInput'}
								className={'input-Authentication-size'}></input>
						</div>
					</div>

					<div className={'grid grid-cols-1 gap-4 content-center h-20'}>
						<div className={'flex justify-center'}>
							<button className={' btn-Authentication-size'}>
								<p className={'p-Authentication-btnLogin'}>{nameBtn}</p>
							</button>
						</div>
					</div>

					<div className={'grid grid-cols-6 content-end h-56'}>
						<div className={'col-start-2 col-end-6 '}>
							<div className={'flex justify-center'}>
								<label className={'text-center label-Authentication-text2'}>
									{textRegister}
									<label className={'label-Authentication-text'}>
										{textRegisterSub}
									</label>
								</label>
							</div>
						</div>
					</div>
				</form>
			</div>
			<style jsx>
				{`
					.div-Authentication-container {
						background: #ebebeb;
					}
					.hr-Authentication-size {
						width: 151px;
						height: 0px;
						border: 1px solid #a8a6a7;
						transform: rotate(-180deg);
					}
					.form-Authentication-size {
						width: 568px;
						height: 721px;
						box-shadow: 0px 12px 16px rgba(0, 0, 0, 0.04),
							0px 4px 56px rgba(0, 0, 0, 0.04);
						border-radius: 10px;
						background: #ffffff;
					}
					.label-Authentication-login {
						font-family: Poppins;
						font-style: normal;
						font-weight: 400;
						font-size: 29px;
						line-height: 43px;
						color: rgba(0, 0, 0, 0.85);
					}
					.label-Authentication-subtitle {
						font-family: Open Sans;
						font-style: normal;
						font-weight: normal;
						font-size: 16px;
						line-height: 26px;
						color: #444150;
					}
					.label-Authentication-subtitle2 {
						font-family: Open Sans;
						font-style: normal;
						font-weight: normal;
						font-size: 16px;
						line-height: 26px;
						color: #6a983c;
					}
					.label-Authentication-phoneNumberAndPass {
						font-family: Poppins;
						font-style: normal;
						font-weight: normal;
						font-size: 16px;
						line-height: 24px;
						color: #444150;
					}
					.label-Authentication-phoneNumberAndPass2 {
						font-family: Poppins;
						font-style: normal;
						font-weight: normal;
						font-size: 16px;
						line-height: 24px;
						color: #6a983c;
					}
					.input-Authentication-size {
						width: 416px;
						height: 48px;
						background: #fbfbfb;
						border: 1px solid #d9d9d9;
						box-sizing: border-box;
						border-radius: 12px;
					}
					.btn-Authentication-size {
						width: 200px;
						height: 41px;
						background: #6a983c;
						border: 2px solid #46760a;
						box-sizing: border-box;
						border-radius: 12px;
					}
					.p-Authentication-btnLogin {
						font-family: Poppins;
						font-style: normal;
						font-weight: bold;
						font-size: 18px;
						line-height: 27px;
						text-align: center;
						color: #ffffff;
					}
					.label-Authentication-text {
						font-family: Open Sans;
						font-style: normal;
						font-weight: normal;
						font-size: 14px;
						line-height: 22px;
						text-align: center;
						color: #6a983c;
					}
					.label-Authentication-text2 {
						font-family: Open Sans;
						font-style: normal;
						font-weight: normal;
						font-size: 14px;
						line-height: 22px;
						text-align: center;
						color: #778699;
					}
				`}
			</style>
		</>
	)
}

export default React.memo(Authentication)
