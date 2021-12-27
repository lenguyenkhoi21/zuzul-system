import React, { useContext, useEffect, useState } from 'react'
import { TITLE_ACTION, TitleContext } from '../../reducer/Title.Reducer'
import { timeNow } from '../../utils/Utils'
import { UserContext } from '../../reducer/User.Reducer'
import { ChatContext } from '../../reducer/Chat.Reducer'

const DummyTestPage = () => {
	console.log(`${timeNow()} --- [DummyTest] --- at pages/dummyTest/index.js`)

	const chatCTX = useContext(ChatContext)
	const userCTX = useContext(UserContext)
	const titleCTX = useContext(TitleContext)

	const [text, setText] = useState('')

	//Change title of page
	useEffect(() => {
		titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, 'Dummy Test')
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const sendMessage = () => {
		const socket = chatCTX.state.socket
		if (socket !== null) {
			socket.emit('send-message', {
				sender: userCTX.state.userID,
				receiver: 'user-02',
				message: text
			})
		}
	}

	const onChangeMessage = e => {
		setText(e.target.value)
	}

	return (
		<div>
			<p>Message</p>
			{chatCTX.state.message === null ||
			chatCTX.state.message === undefined ? (
				<> </>
			) : (
				chatCTX.state.message.map((value, key) => (
					<p key={key}>
						{' '}
						{value.sender} : {value.message}{' '}
					</p>
				))
			)}
			<input name={'text-area'} onChange={onChangeMessage} /> <br />
			<button onClick={sendMessage}> Gửi </button>
		</div>
	)
}

export default DummyTestPage
