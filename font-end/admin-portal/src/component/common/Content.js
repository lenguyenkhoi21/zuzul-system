import React from 'react'
import './Content.css'

const Content = props => {
	return (
		<>
			<div className={'div-Content-container'}>{props.children}</div>
		</>
	)
}

export default Content
