import IndexPage from './page/index/IndexPage'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './page/login/LoginPage'
import ShopRequestPage from './page/shop_request/ShopRequestPage'
import CategoryManagementPage from './page/category_management/CategoryManagementPage'
import { UserContext } from './reducer/User.Reducer'
import { useContext } from 'react'
import ProductCensorshipPage from './page/product_censorship/ProductCensorshipPage'
import NavBar from './component/navbar/NavBar'
import CategoryNew from './page/category_management/new/CategoryNew'
import SubManager from './page/category_management/sub/SubManager'

const App = () => {
	const userCTX = useContext(UserContext)

	const homePage = userCTX.state.userID === null ? <LoginPage /> : <IndexPage />

	const loginPage =
		userCTX.state.userID === null ? <LoginPage /> : <IndexPage />

	const shopRequestPage =
		userCTX.state.userID === null ? <LoginPage /> : <ShopRequestPage />

	const productCensorshipPage =
		userCTX.state.userID === null ? (
			<LoginPage />
		) : (
			<ProductCensorshipPage path={'/'} />
		)

	const categoryManagementPage =
		userCTX.state.userID === null ? <LoginPage /> : <CategoryManagementPage />

	const categoryNew =
		userCTX.state.userID === null ? (
			<LoginPage />
		) : (
			<CategoryNew title={'Thêm danh mục mới'} />
		)

	const categoryUpdate =
		userCTX.state.userID === null ? (
			<LoginPage />
		) : (
			<CategoryNew title={'Cập nhật danh mục'} />
		)

	const subCateNew =
		userCTX.state.userID === null ? (
			<LoginPage />
		) : (
			<SubManager title={'Thêm danh mục con mới'} />
		)

	const subCateUpdate =
		userCTX.state.userID === null ? (
			<LoginPage />
		) : (
			<SubManager title={'Cập nhật danh mục con'} />
		)

	return (
		<>
			<div className={'container-fluid p-0'}>
				<div className={'row no-gutters'}>
					{userCTX.state.userID === null ? <></> : <NavBar />}
					<Routes>
						<Route index={true} path={'/'} element={homePage} />
						<Route path={'/login'} element={loginPage} />
						<Route path={'/shop_request'} element={shopRequestPage} />
						<Route
							path={'/product_censorship'}
							element={productCensorshipPage}
						/>
						<Route
							path={'/category_management'}
							element={categoryManagementPage}
						/>
						<Route path={'/category_management/new'} element={categoryNew} />
						<Route
							path={'/category_management/update'}
							element={categoryUpdate}
						/>
						<Route path={'/category_management/sub_new'} element={subCateNew} />
						<Route
							path={'/category_management/sub_update'}
							element={subCateUpdate}
						/>
					</Routes>
				</div>
			</div>
		</>
	)
}

export default App
