import React from 'react'
import Image from 'next/image'

const UserAccountBackground = () => {
	return (
		<>
			<div>
				<div
					className={'grid grid-cols-1 div-UserAccountBackground-defineUser'}>
					<div>
						<Image width={1260} height={330} src={'/png/imageBackground.png'} />
					</div>
					<div className={'grid grid-cols-2 grid-flow-col'}>
						<div className={'grid grid-cols-12 grid-flow-col items-center'}>
							<div
								className={
									'col-start-2 col-end-4 div-UserAccountBackground-image'
								}>
								<Image width={104} height={104} src={'/png/userImage.png'} />
							</div>
							<div className={'col-start-4 col-end-10'}>
								<span className={'span-UserAccountBackground-userName'}>
									Tên Người Dùng
								</span>
								<br />
								<span className={'span-UserAccountBackground-address'}>
									Địa chỉ, Thành phố, 669 Likes
								</span>
							</div>
						</div>

						{/*<div className={'flex justify-end mt-5 mr-24'}>
              <button className={'div-UserAccountBackground-btn'}>
                Theo Dõi
              </button>
              <button className={'div-UserAccountBackground-btn'}>
                Kết Bạn
              </button>
            </div>*/}
					</div>
				</div>
			</div>
			<style jsx>{`
				.div-UserAccountBackground-defineUser {
					height: 446px;
					background: #ffffff;
					box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
					border-radius: 2px 2px 12px 12px;
				}
				.div-UserAccountBackground-image {
					border-radius: 20px;
				}
				.span-UserAccountBackground-userName {
					font-family: Open Sans;
					font-style: normal;
					font-weight: 400;
					font-size: 24px;
					line-height: 33px;
					color: #000000;
				}
				.span-UserAccountBackground-address {
					font-family: Helvetica Neue;
					font-style: normal;
					font-weight: 400;
					font-size: 14px;
					line-height: 17px;
					display: flex;
					align-items: center;
					color: #707070;
				}
				.div-UserAccountBackground-btn {
					border: 2px solid #2aa71a;
					box-sizing: border-box;
					border-radius: 12px;

					font-family: Poppins;
					font-style: normal;
					font-weight: bold;
					font-size: 15px;
					line-height: 22px;
					color: #151515;

					padding: 5px;
					width: 90px;
					height: 36px;
				}
			`}</style>
		</>
	)
}

export default UserAccountBackground
