import './featured.css'

export const Featured = () => {
  return (
      <div className='featured'>
        <div className="featuredItem">
            <img src="https://cf.bstatic.com/xdata/images/city/540x270/688667.webp?k=a27d07b128ee2b9fd0a6446611916345282fba52d1840d494cda3e039ea407d2&o=" alt="" className="featuredImg" />
            <div className="featuredTitles">
                <h1>Chiang Mai</h1>
                <h2>123 properties</h2>
            </div>
        </div>    
        <div className="featuredItem">
            <img src="https://cf.bstatic.com/xdata/images/city/540x270/688676.webp?k=440730a200923c25a96246674a3acaa35521c1919e25ba51eeb7b4eb22917382&o=" alt="" className="featuredImg" />
            <div className="featuredTitles">
                <h1>Chiang Rai</h1>
                <h2>123 properties</h2>
            </div>
        </div>    
        <div className="featuredItem">
            <img src="https://cf.bstatic.com/xdata/images/city/540x270/688683.webp?k=806fb4619835abf88a68b4d3a505d91f2f1173d0470306acb3e06c2ad5d6b63a&o=" alt="" className="featuredImg" />
            <div className="featuredTitles">
                <h1>Hua Hin</h1>
                <h2>123 properties</h2>
            </div>
        </div>    
      </div>
  )
}
