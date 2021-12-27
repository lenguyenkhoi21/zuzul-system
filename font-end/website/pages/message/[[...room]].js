import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { CHAT_CONSTANT, ChatContext } from '../../reducer/Chat.Reducer'
import { useRouter } from 'next/router'
import { UserContext } from '../../reducer/User.Reducer'
import Login from '../../component/common/Login'

const RoomChatPage = () => {
	const chatCTX = useContext(ChatContext)
	const userCTX = useContext(UserContext)
	const router = useRouter()

	const [message, setMessage] = useState('')

	const onChangeText = e => {
		setMessage(e.target.value)
		console.log(e.target.value)
	}

	const onSendMessage = (e, roomID) => {
		e.preventDefault()
		const socket = chatCTX.state.socket
		const data = {
			senderID: userCTX.state.userID,
			roomID: roomID,
			message: message,
			dateSend: new Date()
		}
		socket.emit('send-message', data)
	}

	const onReadMessage = (e, roomID) => {
		e.preventDefault()
		const box = chatCTX.state.box
		for (let i = 0; i < box.length; i++) {
			if (box[i].roomID === roomID) {
				if (box[i].inComeMessage > 0) {
					const socket = chatCTX.state.socket
					socket.emit('read-message', {
						readerID: userCTX.state.userID,
						roomID: roomID
					})
				}
				break
			}
		}
	}

	if (userCTX.state.userID === null) {
		// User don't login
		return <Login />
	} else if (chatCTX.state.socket === null) {
		return (
			<>
				<p> Error Connect To Socket.IO </p>
				<style jsx>{``}</style>
			</>
		)
	} else if (userCTX.state.role === 'NO_INFO') {
		// User don't update information
		return <></>
	} else if (chatCTX.state.status === CHAT_CONSTANT.STATUS_NOT_READY) {
		// The message that hasn't finished fetch data
		return (
			<>
				<div>
					<p> Loading... </p>
				</div>
				<style jsx>{``}</style>
			</>
		)
	} else if (chatCTX.state.box.length === 0) {
		// User don't have friend
		return <></>
	} else {
		const arr = router.asPath.split('/')

		if (arr.length === 2) {
			// No Room Chat Specific
			return (
				<>
					<div>
						{chatCTX.state.box.map((value, key) => (
							<React.Fragment key={key}>
								<Link href={`/message/${value.roomID}`}>
									<a>
										<p> {value.roomID} </p>
									</a>
								</Link>
							</React.Fragment>
						))}
					</div>
					<style jsx>{``}</style>
				</>
			)
		} else if (arr.length === 3) {
			// Room Chat Specific
			const roomID = arr[arr.length - 1]
			const list = chatCTX.state.message.get(roomID)
			return (
				<>
					<div className={'flex'}>
						<div>
							{chatCTX.state.box.map((value, key) => (
								<React.Fragment key={key}>
									<Link href={`/message/${value.roomID}`}>
										<a>
											<p> {value.roomID} </p>
										</a>
									</Link>
								</React.Fragment>
							))}
						</div>
						<div className={'m-2.5 rounded-lg border-2'}>
							{list === undefined ? (
								<></>
							) : (
								<>
									{list.map((value, key) => (
										<React.Fragment key={key}>
											<p>
												{' '}
												{value.senderID} -{' '}
												{value.message} -{value.status}
											</p>
										</React.Fragment>
									))}
								</>
							)}
							<form onSubmit={e => onSendMessage(e, roomID)}>
								<input
									name={'message'}
									onChange={onChangeText}
									onFocus={event =>
										onReadMessage(event, roomID)
									}
								/>
								<button> Gửi tin nhắn </button>
							</form>
						</div>
					</div>
					<style jsx>{``}</style>
				</>
			)
		} else {
			throw 'No URL'
		}
	}
}

export default RoomChatPage

/*
 * JSON send to Socket.IO on event send-message: { roomID, senderID, message, dateSend }
 * JSON received from Socket.IO on event receive-message: { roomID, senderID, message, dateSend, dateRead, status } same as api fetch message
 * */
