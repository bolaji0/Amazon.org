import React,{useState} from 'react'
import Slider from "react-slick"
// import { bannerImgFive } from '../../assets';
// import { bannerImgFour } from '../../assets';
// import { bannerImgThree } from '../../assets';
// import { bannerImgTwo } from '../../assets';
// import { bannerImgOne } from '../../assets';



import { 
    bannerImgFive, 
    bannerImgOne, 
    bannerImgThree, 
    bannerImgTwo ,
    bannerImgFour
} from '../../assets';


const Banner = () => {
const [dotActive, setDoActive] = useState(0);

    const settings = {
        dots: true,
        Infinite: true,
        autoplay:true,
        slidesToShow:1,
        slideToScroll:2,
        arrows:false,
        beforeChange: (prev, next) => {
            setDoActive(next)
        },
        appendDots: (dots) => (
            <div
            style={{
                position:"absolute",
                        top: "70%",
                        left: "150px",
                        right: "0",
                        margin: "0 auto",
                        transform: "translate(-50%, -50%)",
                        width: "210px",
                // position: "absolute",
                // top: "70%",
                // left: "0",
                // right: "0",
                // margin: "0 auto",
                // transform: "translate(-50% -50%)",
                // width: "210px",
            }}
            >
                <ul style={{  
                    width:'100%',
                    display:'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
            > 
            {" "}
            {dots}{" "}
            </ul>
            </div>
        ),
        customPaging: (i) => (
            <div
            style={
            i === dotActive
          ?{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: "white",
                background: '#131921',
                padding: '8px 0',
                cursor: 'pointer',
                border: "1px blue #f3a847",
            }
          : 
            {
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: "white",
                background: '#232F3E',
                padding: '8px 0',
                cursor: 'pointer',
                border: "1px blue #f3a847",
            }
            }
            >
             {i + 1}
            </div>
        ),
        responsive:[
           {
            breakpoint: 576,
            settings:{
                dots: true,
                appendDots: (dots) => (
                    <div
                    style={{
                        position:"absolute",
                        top: "70%",
                        left: "150px",
                        right: "0",
                        margin: "0 auto",
                        transform: "translate(-50%, -50%)",
                        width: "150px",
                    }}
                    >
                        <ul style={{
                                width: "100%",
                                display:"flex",
                                alignItems:"center",
                                justifyContent: "space-between",
                            }}
                        >
                            {dots}
                        </ul>
                    </div>
                ),
                customPaging: (i) => (
                    <div
                    style={
                        i === dotActive
                        ? {
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            color: "white",
                            border: "1px solid #f3a847",
                            fontSize: "12px",
                        }
                        :{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            background: "#232F3E",
                            padding: "8px 0",
                            cursor: "pointer",
                            border: "1px solid #f3a847",
                            fontSize: "12px",
                        }
                    }
                    >
                        {i + 1}
                    </div>
                )
            }
        }
        ]
    };


  return (
    <div className='w-full'>
        {/* <div className='w-full h-full'></div>
        <h2>Single Item</h2> */}
        <div className='w-full h-full z-10'>
        <Slider  {...settings}>
        <div>
         <img src={bannerImgOne} alt='First Slide Img' />
        </div>
        <div>
         <img src={bannerImgTwo} alt='Second Slide Img'/>
        </div>
        <div>
         <img src={bannerImgThree} alt='Third Slide Img'/>
        </div>
        <div>
         <img src={bannerImgFour} alt='Fourth Slide Img'/>
        </div>
        <div>
         <img src={bannerImgFive} alt='Fifth Slide Img'/>
        </div>
        </Slider>
        </div>
    </div>
  )
}

export default Banner