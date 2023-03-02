import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from '../../components/header/Header'
import { Navbar } from '../../components/navbar/Navbar'
import {format} from 'date-fns'
import './list.css'
import { DateRange } from 'react-date-range'
import { SearchItem } from '../../components/searchItem/SearchItem'
import useFetch from '../../hooks/useFetch.jsx'

export const List = () => {
  const location = useLocation();
  
  const [destination, setDestination] = useState(location.state.destination)
  const [dates, setDates] = useState(location.state.dates)
  const [openDate, setOpenDate] = useState(false)
  const [options, setOptions] = useState(location.state.options)
  const [min, setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)

  const { data, loading, error, reFetch } = useFetch(`/hotels?city=${destination}&min=${ min || 0 }&max=${ max || 9999 }`)
  
  const handleClick = () => {
    reFetch()
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input type="text" placeholder={destination} onChange={(e)=>setDestination(e.target.value)} />
            </div>
            <div className="lsItem">
              <label>Check-in date</label>
              <span onClick={()=>setOpenDate(prev=>!prev)}>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")} `}</span>
              {
                openDate && <DateRange
                  editableDateInputs={true}
                  onChange={item => setDates([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  minDate={new Date()}
                />
              }
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" onChange={(e)=>setMin(e.target.value)} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" onChange={(e)=>setMax(e.target.value)} />
                </div>
          
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    onChange={(e) => setOptions(prev => ({ ...prev, adult: e.target.value }))} 
                    type="number" 
                    className="lsOptionInput" 
                    placeholder={options.adult}
                    min={1}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input onChange={(e)=>setOptions(prev=>({...prev, children : e.target.value}))} 
                    type="number" 
                    className="lsOptionInput" 
                    placeholder={options.children}
                    min={0}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input onChange={(e)=>setOptions(prev=>({...prev, room : e.target.value}))} 
                    type="number" 
                    className="lsOptionInput" 
                    placeholder={options.room}
                    min={1}
                  />
                </div>
              </div> 
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? "loading..." : <>
              {
                data.map((item, i) =>
                  <SearchItem item={item} key={i} />
                )
              }
            </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
