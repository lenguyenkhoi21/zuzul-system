import React, {useContext, useEffect} from 'react'
import {useRouter} from 'next/router'
import {imageLoader, timeNow} from '../../utils/Utils'
import {TITLE_ACTION, TitleContext} from "../../reducer/Title.Reducer"
import Image from "next/image";
import Link from "next/link";
import ProductFilter from "../../component/index/ProductFilter";
// import style from "styles/Product.module.css"
// import Image from "next/image";

//TODO: Using props to get value from statics
// eslint-disable-next-line no-unused-vars

const ProductPage = ({ bestProduct }) => {
  console.log(`${timeNow()} --- [ProductPage] --- at ./pages/[[...param]].js`)
  const router = useRouter()
  const path = router.asPath
  const arr = path.split('/')
  const containFileName = arr.filter(path => path.includes('[[...param]]'))

  const titleCTX = useContext(TitleContext)

  //TODO: Change the title to name of product



  useEffect(() => {
    titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, path)
  }, [path])

  if (containFileName.length === 0) {
    // Render loading Screen
    return <>

      <div className="container-outsite  mx-auto md:grid md:grid-cols-1 lg:grid-cols-2 ">
        <div className="left-content">

          <div className="pic-first  ">
            <img className="pics " alt="hero" src="https://dummyimage.com/569x436 "/>

          </div>
          <div className="pic-second  ">
            <img className="pics" alt="hero" src="https://dummyimage.com/569x436 "/>

          </div>
          <div className="pic-third  ">
            <img className="pics" alt="hero" src="https://dummyimage.com/569x436 "/>

          </div>

        </div>
        <div className="right-content ">
          <h1 className="Product-name font-semibold text-xl text-fontColor-bl1 ">Tên sản phẩm</h1>
          <h4 className="Product-titleShort  text-lg text-fontColor-bl1 ">Tiêu đề mô tả ngắn gọn</h4>
          <div className="Product-infor flex ">
            <div className="">
              <h6 className=" text-fontColor-gr flex ">Xuất xứ <p
                className=" text-fontColor-bl1 align-content-center ml-20"> Trung quốc</p></h6>
              <h6 className=" text-fontColor-gr flex mt-3">Ngày sản xuất <p
                className=" text-fontColor-bl1 align-content-center ml-8"> 1/4/2022</p></h6>

            </div>
            <div className="ml-14">
              <h6 className=" text-fontColor-gr flex ml-24">Danh mục<p
                className=" text-fontColor-bl1 align-content-center ml-6"> Đồ chơi</p></h6>
              <h6 className=" text-fontColor-gr flex mt-3 ml-24">Giảm giá<p
                className=" text-fontColor-bl1 align-content-center ml-8"> 10 %</p></h6>

            </div>
          </div>


          <br/>
          <div className="shopping flex ">
            <div className="Product-price grow ">
              <p className=" text-xl text-fontColor-g1 font-semibold "> 99.000
                <span>đ</span>
                <p className="Product-subPrice text-fontColor-gr line-through text-sm">156.000 <span>đ</span></p>


              </p>
            </div>

            <div className="btn-Product mr-2 mt-1 flex-auto inline">
              <Link href={'/'}>
                <a>
                  <button

                    className={' font-poppins btn-ProductShort btn-buy '}>

                    <span className="text-lg">+</span> Mua ngay
                  </button>
                </a>
              </Link>
              <Link href={'/'}>
                <a>

                  <button

                    className={' font-poppins btn-ProductShort btn-add-cart flex-auto '}>

                    <span className="text-lg">+</span> Thêm vào giỏ hàng
                  </button>
                </a>
              </Link>

            </div>


          </div>
          <div className="Product-disciption">
            <h1 className="Product-disciption-titile font-semibold text-lg text-fontColor-bl1 ">Mô tả sản phẩm</h1>
            <hr/>
            <div className="">
              <h4 className="Product-disciption-subTitile text-base font-semibold">Tiêu đề</h4>
              <p>Tã giấy dán người lớn Sunmate size XL10 _ tã người lớn SunmateChất liệu siêu thấmTã giấy SunMate XL10
                (10 Miếng / gói) có khả năng thấm hút nhanh nhờ lõi bông thấm hút chất lỏng nhanh chóng. Giúp chất lỏng
                phân tán đều khắp lõi bông, giữ bề mặt luôn ..</p>

            </div>
          </div>
        </div>

      </div>

      <style jsx>
        {`
        .container-outsite{
        
        padding: 16px 45px;
        width: 1260px;
        // height: 1454px;
        left: 330px;
        top: 229px;
        
        background-color: rgb(255, 255, 255)
        }
        .left-content{
        width: 569px;
        height: 1374px;
        left: 0px;
        top: 0px;
        display: flex;
        flex-direction: column;
        align-items: center;
        // margin-bottom:63px;
        /* Inside Auto Layout */
         // background-color: green;
        }
        .pics{
        width: 569px;
        height: 436px;
        border-radius: 12px;
        
        
        }
        .pic-first{
        margin-bottom:32px;
        }
        .pic-second{
        margin-bottom:32px;
        }
        .pic-third{
        // margin-bottom:63px;
        }
        .right-content{
        
        
        width: 574px;
        height: 1247px;
        left: 601px;
        top: 0px;
        
        
        /* Inside Auto Layout */
        
      
        margin: 0px 32px;
        // background-color: #777777;
        }
        .Product-name{
        
        
        }
       .Product-price{
        // padding-left:18px;
        // margin-top:29px;
       }
       
      
       .btn-ProductShort {
						background: #46D362;
						padding-top: 6.5px;
						padding-bottom: 6.5px;
						padding-left: 6.5px;
						padding-right: 6.5px;
						border: 2px solid #2AA71A;
						
						box-sizing: border-box;
						border-radius: 12px;
						color: #ffffff;
						
						hight:47px;
					}
					.btn-add-cart{
					margin-left:12px;
					}
					.shopping{
					position: relative;
				 border: 2px solid #F5F5F5;
          padding: 10px;
          border-radius: 12px;
          
          width:534px;
          margin-top:40px;
					}
					.Product-disciption{
					margin-top:177px;
					
					
					}
					.Product-disciption-subTitile{
					margin-top:48px;
					}
					.Product-disciption-subTitile{
					margin-top:8px;
					}
					.hr{
					
					}
				.Product-titleShort{
				margin-top:40px;
				}
				.Product-infor{
				margin-top:40px;
				
			}
			.btn-Product{
				margin-left:85px;
				}
					
        `}</style>

    </>

  } else
    {
      if (containFileName.length === 2) {

      } else if (containFileName.length === 3) {
        // /proudct/cate
      } else if (containFileName.length === 4) {
        // /proudct/cate/sub

      } else {
        // /proudct/cate/sub/productid

        return <>
          <div>demooooooooo 222</div>
        </>
      }

      // Not found
      return <>
      </>
    }

  //TODO: Display the hierarchical tree:
  // Trang chủ -> Category -> Sub-category -> Sản phẩm


  //TODO: Display the information detail of product
  // Fetch API to get the Image in Client-Side


  }

  export default ProductPage
