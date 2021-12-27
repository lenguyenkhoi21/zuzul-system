import React from 'react'
import { timeNow } from '../../utils/Utils'

const Search = () => {
	console.log(
		`${timeNow()} --- [Search] --- Render at component/nav/Search.js`
	)
	return (
		<>
			<div className={'mr-6'}>
				<select id={'type'}>
					<option value={'product'}> Các Loại Sản Phẩm </option>
					<option value={'user'}> Người dùng/ Shop </option>
				</select>
				<input type={'search'} className={`rounded-sm`} />
			</div>
			<style jsx>{``}</style>
		</>
	)
}

export default React.memo(Search)
