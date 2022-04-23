import '../styles/globals.css'
import Metadata from '../component/Metadata'
import Footer from '../component/Footer'
import TitleReducer from '../reducer/Title.Reducer'
import UserReducer from '../reducer/User.Reducer'

import { timeNow } from '../utils/Utils'
import CookieValidation from '../component/CookieValidation'
import ConnectSocket from '../component/ConnectSocket'
import NavigationBar from '../component/nav/NavigationBar'
import NotifyReducer from '../reducer/Notify.Reducer'
import ChatReducer from '../reducer/Chat.Reducer'
import CartReducer from '../reducer/Cart.Reducer'
import LeftMenuUserReducer from '../reducer/LeftMenuUser.Reducer'
import PopupContainer from '../component/common/popup/PopupContainer'
import SearchReducer from '../reducer/Search.Reducer'

const MyApp = ({ Component, pageProps }) => {
	console.log(`${timeNow()} --- [Component MyApp] --- Render at pages/_app.js`)

	return (
		<>
			<TitleReducer>
				<UserReducer>
					<NotifyReducer>
						<ChatReducer>
							<CartReducer>
								<SearchReducer>
									<LeftMenuUserReducer>
										<CookieValidation>
											{/*<ConnectSocket />*/}
											<PopupContainer>
												<Metadata />
												<NavigationBar />
												<Component {...pageProps} />
												<Footer />
											</PopupContainer>
										</CookieValidation>
									</LeftMenuUserReducer>
								</SearchReducer>
							</CartReducer>
						</ChatReducer>
					</NotifyReducer>
				</UserReducer>
			</TitleReducer>
		</>
	)
}

export default MyApp
