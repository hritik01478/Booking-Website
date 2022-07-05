import React from 'react';
import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import './list.css';
import { format } from 'date-fns';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import SearchItem from '../../components/searchItem/SearchItem';

const List = () => {
    const location = useLocation();
    const [openDate, setOpenDate] = useState(false);
    const [destination, setDestination] = useState(location.state.destination);
    const [date, setDate] = useState(location.state.date);
    const [options, setOptions] = useState(location.state.options);


    return (
        <div>
            <Navbar />
            <Header type="list" />
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="lsTitle">Search</h1>
                        <div className="lsItem">
                            <label >Destionation</label>
                            <input type="text" placeholder={destination} onChange={(e) => setDestination(e.target.value)} />
                        </div>
                        <div className="lsItem">
                            <label >Check in Date</label>
                            <span onClick={() => setOpenDate(!openDate)}>{`${format(date[0].startDate, "MM/dd/yyyy")}`} to {`${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                            {openDate && <DateRange onChange={item => setDate([item.selection])} minDate={new Date()} ranges={date} />}
                        </div>
                        <div className="lsItem">
                            <label >Options</label>
                            <div className="lsOptions">
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Min Price <small>/per night</small></span>
                                    <input type="number" className='lsOptionInput' />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Max Price <small>/per night</small></span>
                                    <input type="number" className='lsOptionInput' />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Adult</span>
                                    <input type="number" className='lsOptionInput' placeholder={options.adult} min={1} onChange={(e) => setOptions(options.adult = e.target.value)} />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Children</span>
                                    <input type="number" className='lsOptionInput' placeholder={options.children} min={0} onChange={(e) => setOptions(options.children = e.target.value)} />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Room</span>
                                    <input type="number" className='lsOptionInput' placeholder={options.room} min={1} onChange={(e) => setOptions(options.room = e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <button>Search</button>
                    </div>
                    <div className="listResult">
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List