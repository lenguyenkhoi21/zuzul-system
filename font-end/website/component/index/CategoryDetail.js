import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { imageLoader, timeNow } from '../../utils/Utils'

const CategoryDetail = ({ category, key }) => {
	console.log(
		`${timeNow()} --- [CategoryDetail] --- Render at component/common/CategoryDetail.js`
	)
	return (
		<>
			<div key={key} className={'mr-2'}>
				<Link href={'/'}>
					<a>
						<div className={'flex flex-col items-center'}>
							<Image
								src={category.image}
								width={70}
								height={70}
								loader={imageLoader}
								className={'rounded-full'}
								alt={'image'}
							/>
							<p className={'font-sloway p-CategoryDetail-name'}>
								{' '}
								{category.name}
							</p>
						</div>
					</a>
				</Link>
			</div>
			<style jsx>
				{`
					.p-CategoryDetail-name {
						text-align: center;
						width: 200px;
					}
				`}
			</style>
		</>
	)
}

export default React.memo(CategoryDetail)
