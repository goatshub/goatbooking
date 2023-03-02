import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './header.css'
import { useContext, useState } from 'react'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';

export const Header = ({ type }) => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [destination, setDestination] = useState("")
    const [openOptions, setOpenOptions] = useState(false)
    const [openDate, setOpenDate] = useState(false)
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    })
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const handleOption = (optionType, value) => {
        setOptions(prev => ({
                ...prev,
                [optionType]: prev[optionType] + value
         }))
    }

    const { dispatch } = useContext(SearchContext)
    
    const headerSearch = () => {
        dispatch({
            type: "NEW_SEARCH",
            payload: {
                destination,
                dates,
                options,
            }
        })
        navigate("/hotels", { state: { destination, dates, options} })
    }

    


  return (
      <div className="header">
          <div className={type==="list" ? "headerContainer listMode": "headerContainer"}>
              
            <div className="headerList">
                <div className="headerListItem active">
                    <FontAwesomeIcon icon={faBed} />
                    <span>Stays</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faPlane} />
                    <span>Flights</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faCar} />
                    <span>Car rentals</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faBed} />
                    <span>Attractions</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faTaxi} />
                    <span>Airport taxis</span>
                </div>
            </div>
            { //Shows search only at homepage
            type !== "list" && <>
                <h1 className="headerTitle">A lifetime of discounts? It's Genius.</h1>
                <p className="headerDesc">
                    Get rewarded for your travels - unlock instant savings
                    of 10% or more with a free Goatbooking account
                </p>
                { !user && <button className="headerBtn">Sign in / Register</button> }
                <div className="headerSearch">
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faBed} className="headerIcon" />
                        <input
                            type="text"
                            placeholder="Where are you going?"
                            className="headerSearchInput"  
                            onChange={(e)=>setDestination(e.target.value)}
                        />
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                        <span className='headerSearchText' onClick={()=>setOpenDate(prev=>!prev)}>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")} `}</span>
                        {openDate && (
                            <DateRange
                                editableDateInputs={true}
                                onChange={item => setDates([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={dates}
                                className="date"
                                minDate={new Date()}
                            />
                        )}
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                        <span className='headerSearchText'  onClick={()=>setOpenOptions(prev=>!prev)}>{`${options.adult} adult ${options.children} children ${options.room} room`}</span>
                        {openOptions &&
                            <div className="options">
                                <div className="optionItem">
                                    <span className="optionText">Adult</span>
                                    <div className="optionCounters">
                                        <button className="optionCounterButton"
                                            disabled={options.adult<=1}
                                            onClick={() => handleOption("adult", -1)}
                                        >-</button>
                                        <span className="optionCounterNumber">{`${options.adult}`}</span>
                                        <button className="optionCounterButton" onClick={() => handleOption("adult", +1)}>+</button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <span className="optionText">Children</span>
                                    <div className="optionCounters">
                                        <button className="optionCounterButton"
                                            disabled={options.children<=0}
                                            onClick={() => handleOption("children", -1)}
                                        >-</button>
                                        <span className="optionCounterNumber">{`${options.children}`}</span>
                                        <button className="optionCounterButton"  onClick={()=>handleOption("children", +1)}>+</button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <span className="optionText">Room</span>
                                    <div className="optionCounters">
                                        <button className="optionCounterButton"
                                            disabled={options.room<=1}
                                            onClick={() => handleOption("room", -1)}
                                        >-</button>
                                        <span className="optionCounterNumber">{`${options.room}`}</span>
                                        <button className="optionCounterButton" onClick={()=>handleOption("room", +1)}>+</button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="headerSearchItem">
                        <button className="headerBtn" onClick={headerSearch}>Search</button>
                    </div>
                </div>
            </>}
            
          </div>
      </div>
  )
}
