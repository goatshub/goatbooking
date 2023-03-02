import useFetch from '../../hooks/useFetch'
import './featuredProperties.css'

export const FeaturedProperties = () => {
    const { data, error, loading } = useFetch("/hotels?featured=true&limit=4")
    return (
      <div className='fp'>
          {loading ? "Loading..." : <>
              {data.map((item, i) => <div className="fpItem" key={i}>
                  <img
                      src={item.photos[0]}
                      alt=""
                      className="fpImg"
                  />
                  <span className="fpName">{item.name}</span>
                  <span className="fpCity">{item.address}</span>
                  <span className="fpPrice">Starting from THB {item.cheapestPrice}</span>
                  {item.rating && <div className="fpRatings">
                      <button>{item.rating}</button>
                      <span>Very good</span>
                  </div>}
              </div>
            )}
          </>}
      </div>
  )
}


        /* <div className="fpItem">
            <img src="https://cf.bstatic.com/xdata/images/hotel/square600/421853145.webp?k=140bfc6c54ee753d4a748ee7b5a86c00c988e6fc9bb340c87172ead66a3ea9d5&o=&s=1" alt="" className="fpImg" />
            <span className="fpName">6 Continents Apartments by Prague Residences</span>
            <span className="fpCity">Prague 1, Czech Republic, Prague</span>
            <span className="fpPrice">Starting from THB 4,845</span>
            <div className="fpRatings">
                <button>8.3</button>
                <span>Very good</span>
            </div>
        </div>      
        <div className="fpItem">
            <img src="https://cf.bstatic.com/xdata/images/hotel/square600/421852968.webp?k=f3889222c82f4a8e3783dddb5f1cc04d6140eeb2d5cb8297817a15aacfe4d191&o=&s=1" alt="" className="fpImg" />
            <span className="fpName">3 Epoques Apartments by Prague Residences</span>
            <span className="fpCity">Prague 1, Czech Republic, Praha 1</span>
            <span className="fpPrice">Starting from THB 4,079</span>
            <div className="fpRatings">
                <button>8.7</button>
                <span>Fabulous</span>
            </div>
        </div>      
        <div className="fpItem">
            <img src="https://cf.bstatic.com/xdata/images/hotel/square600/87428762.webp?k=9a065fcd92168145d8c8358701662c76793535597b678efc8f6921c8e3c188e6&o=&s=1" alt="" className="fpImg" />
            <span className="fpName">7Seasons Apartments Budapest</span>
            <span className="fpCity">06. Terézváros, Hungary, Budapest</span>
            <span className="fpPrice">Starting from THB 3,071</span>
            <div className="fpRatings">
                <button>8.8</button>
                <span>Fabulous</span>
            </div>
        </div>      
        <div className="fpItem">
            <img src="https://cf.bstatic.com/xdata/images/hotel/square600/95058973.webp?k=979587fd2ac8f7777a34758264d557eef57d0e98e58bdaeb121f5b968a20f810&o=&s=1" alt="" className="fpImg" />
            <span className="fpName">Oriente Palace Apartments</span>
            <span className="fpCity">Centro, Spain, Madrid</span>
            <span className="fpPrice">Starting from THB 5,122</span>
            <div className="fpRatings">
                <button>8.9</button>
                <span>Fabulous</span>
            </div>
        </div>       */
