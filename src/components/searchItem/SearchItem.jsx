import './searchItem.css'

export const SearchItem = () => {
  return (
    <div className='searchItem'>
      <img 
        src="https://cf.bstatic.com/xdata/images/hotel/square200/426584556.webp?k=5cce65ca3c1b03b8e5d7887707fc1c07901d89a37a41b910024f96b571a6298e&o=&s=1" 
        alt="" 
        className="searchItemImg" 
      />
      <div className="siDesc">
        <h1 className="siTitle">Le Meridien Chiang Rai Resort, Thailand</h1>
        <span className="siDistance">500m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio apartment with air conditioning
        </span>
        <span className="siFeatures">Entire studio ● 1 bathroom ● 21m² 1 full bed</span>
        <span className="siCancelOp">Free cancelation</span>
        <span className="siCancelOpSubtitle">You can cancel later, so lock in this great price today!</span>
      </div>
      <div className="siDetails">
        <div className="siDetailsRating">
          <span>Excellence</span>
          <button>8.9</button>
        </div>
        <div className="siDetailsText">
          <span className="siPrice">$123</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton">See availabilities</button>
        </div>
      </div>
    </div>
  )
}
