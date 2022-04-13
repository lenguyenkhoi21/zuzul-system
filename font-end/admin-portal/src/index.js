import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import UserReducer from './reducer/User.Reducer'
import CookieValidation from './component/CookieValidation'
import HeaderReducer from './reducer/Header.Reducer'
import PopupContainer from './PopupContainer'

ReactDOM.render(
	<BrowserRouter>
		<UserReducer>
			<HeaderReducer>
				<CookieValidation>
					<PopupContainer>
						<App />
					</PopupContainer>
				</CookieValidation>
			</HeaderReducer>
		</UserReducer>
	</BrowserRouter>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
