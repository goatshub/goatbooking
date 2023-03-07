import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from '../../components/header/Header'
import { Navbar } from '../../components/navbar/Navbar'
import {format} from 'date-fns'
import './list.css'
import { DateRange } from 'react-date-range'
import { SearchItem } from '../../components/searchItem/SearchItem'

export const List = () => {
  const location = useLocation();
  
  const [destination, setDestination] = useState(location.state.destination)
  const [date, setDate] = useState(location.state.date)
  const [openDate, setOpenDate] = useState(false)
  const [options, setOptions] = useState(location.state.options)
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
              <input type="text" placeholder={destination} />
            </div>
            <div className="lsItem">
              <label>Check-in date</label>
              <span onClick={()=>setOpenDate(prev=>!prev)}>{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")} `}</span>
              {
                openDate && <DateRange
                  editableDateInputs={true}
                  onChange={item => setDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
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
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
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
            <button>Search</button>
          </div>
          <div className="listResult">
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
          </div>
        </div>
      </div>
    </div>
  )
}
