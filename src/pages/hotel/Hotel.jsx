import './hotel.css'
import { Footer } from '../../components/footer/Footer'
import { Header } from '../../components/header/Header'
import { MailList } from '../../components/mailList/MailList'
import { Navbar } from '../../components/navbar/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export const Hotel = () => {
  const [open, setOpen] = useState(false)
  const [slideNumber, setSlideNumber] = useState(0)
  const photos = [
    {
      src: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/220599197.jpg?k=1a807291df4e925be0bbb378ac6e47cd35648b1688f59183e724d17494759a4a&o=&hp=1'
    },
    {
      src: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/252628841.jpg?k=98dd7fd631edab83937e5d3d51df92235695116fe696dba87255a616ef53e23c&o=&hp=1'
    },
    {
      src: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/216328718.jpg?k=61775fc4e55e7c18dfa0dcada7136fdce51c14e7083399c57320cec485b9bfac&o=&hp=1'
    },
    {
      src: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/216329803.jpg?k=72c789e2ad3d170c42b10d053e4676b64900ecf74df5b53fbe09f8522cb0b5e5&o=&hp=1'
    },
    {
      src: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/216329224.jpg?k=52eb59207775718157527990511fef87013b927da5bf31a585ab733d3c269386&o=&hp=1'
    },
    {
      src: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/216331012.jpg?k=fee45668675e0ce264ea394212a428b7b5e431ccfb4f8eba862f0a17d3c7d5eb&o=&hp=1'
    },
  ]
  const handleOpen = (i) => {
    setSlideNumber(i)
    setOpen(true)
  }
  const handleMove = (direction) => {
    setSlideNumber(prev => {
      if (direction === "l") {
        return prev === 0 ? photos.length - 1 : prev - 1
      }else{
        return prev === photos.length - 1 ? 0 : prev + 1  
      }
    })
  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && <div className='slider'>
          <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=>setOpen(false)}/>
          
          <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={()=>handleMove("l")} />
          <div className="sliderWrapper">
            <img src={ photos[slideNumber].src} alt="" className="sliderImg" />
          </div>
          <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={()=>handleMove("r")} />
        </div>}
        <div className="hotelWrapper">
          <button className="bookNowBtn">Reserve or Book Now!</button>
          <h1 className="hotelTitle">Blue Lagoon Hotel</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>903/1 moo 4 Phahoyothin Road, wiang, 57000 Chiang Rai, Thailand</span>
          </div>
          <span className="hotelDistance">
            Excellent location - 500m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over $114 at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {photos.map((photo,i) => 
              <div className="hotelImgWrapper">
                <img src={photo.src} onClick={()=>handleOpen(i)} alt="" className="hotelImg" />
              </div>
            )}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsText">
              <h1 className="hotelTitle">
                Experience World-class Service at Blue Lagoon Hotel
              </h1>
              <p className='hotelDesc'>
                You're eligible for a Genius discount at Blue Lagoon Hotel! To save at this property, all you have to do is sign in.
                Blue Lagoon Hotel has accommodations in Chiang Rai. This 3-star hotel offers a shared lounge, a concierge service and free WiFi. The property is non-smoking throughout and is located a 7-minute walk from Clock Tower Chiang Rai.
                All rooms come with air conditioning, a flat-screen TV with cable channels, a fridge, a electric tea pot, a shower, free toiletries and a desk. The rooms have a private bathroom, a hairdryer and bed linen.
                The hotel offers an American or Asian breakfast.
                Blue Lagoon Hotel has a sun terrace. The area is popular for cycling, and car rental is available at this 3-star hotel.
                Free private parking and a business center are available, as well as a 24-hour front desk.
                Popular points of interest near the accommodation include Chiang Rai Saturday Night Walking Street, Wat Pra Sing and Statue of King Mengrai. The nearest airport is Mae Fah Luang - Chiang Rai International, 8 km from Blue Lagoon Hotel, and the property offers a paid airport shuttle service.
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Property Highlights</h1>
              <span>
                Located in the best-rated area in Chiang Rai, this hotel has an excellent location score of 9.2
              </span>
              <h2>
                <b>$945</b> (9 nights)
              </h2>
              <button>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
      
    </div>
  )
}
