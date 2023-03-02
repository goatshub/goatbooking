import './hotel.css'
import { Footer } from '../../components/footer/Footer'
import { Header } from '../../components/header/Header'
import { MailList } from '../../components/mailList/MailList'
import { Navbar } from '../../components/navbar/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { useLocation, useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'
import { Reserve } from '../../components/reserve/Reserve'

export const Hotel = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const id = location.pathname.split('/')[2]
  const {data, loading, error } = useFetch(`/hotels/find/${id}`)
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [slideNumber, setSlideNumber] = useState(0)
  const { dates, options } = useContext(SearchContext)
  const { user } = useContext(AuthContext)
  
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  const dayDifference = (date1, date2) => {
    if(!date1 || !date2) return 1
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
    return (diffDays > 0) ? diffDays : 1 
  }

  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate)
  /*
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
  */
  const handleOpen = (i) => {
    setSlideNumber(i)
    setOpen(true)
  }
  const handleMove = (direction) => {
    setSlideNumber(prev => {
      if (direction === "l") {
        return prev === 0 ? data.photos.length - 1 : prev - 1
      }else{
        return prev === data.photos.length - 1 ? 0 : prev + 1  
      }
    })
  }
  const handleClick = () => {
    if (user) {
      setOpenModal(true)
    } else {
      navigate('/login')
    }
  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? "Loading..." : <>

        <div className="hotelContainer">
          {open && <div className='slider'>
            <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)} />
          
            <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove("l")} />
            <div className="sliderWrapper">
              <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove("r")} />
          </div>}
          <div className="hotelWrapper">
            <button className="bookNowBtn">Reserve or Book Now!</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location - {data.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over THB {data.cheapestPrice} at this property and get a free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) =>
                <div className="hotelImgWrapper" key={i}>
                  <img src={photo} onClick={() => handleOpen(i)} alt="" className="hotelImg" />
                </div>
              )}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsText">
                <h1 className="hotelTitle">
                  {data.title}
                </h1>
                <p className='hotelDesc'>
                  {data.desc}
                </p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the best-rated area in Chiang Rai, this hotel has an excellent location score of 9.2
                </span>
                <h2>
                  <b>THB {days * data.cheapestPrice * (options.room || 1) }</b> ({days} nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      </>}
      {
        openModal && <Reserve hotelId={id} setOpen={setOpenModal} />
      }
    </div>
  )
}
