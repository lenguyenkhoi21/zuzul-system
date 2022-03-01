import React from 'react'

const Menu = ({ category, pathname }) => {
	return (
		<>
			{category.map((element, index) => (
				<React.Fragment key={index}>
					{pathname === element.id ? (
						<p className={'p-Menu-text'}> {element.name} </p>
					) : (
						<p> {element.name} </p>
					)}
				</React.Fragment>
			))}

			<style jsx>
				{`
					.p-Menu-text {
						background-color: darkolivegreen;
					}
					p {
						padding-bottom: 12px;
						cursor: pointer;
						display: block;
					}
					p:hover {
						color: #46d362;
					}
				`}
			</style>
		</>
	)
}

export default Menu
