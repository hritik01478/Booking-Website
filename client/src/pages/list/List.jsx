import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import './list.css';
import { format } from 'date-fns';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import SearchItem from '../../components/searchItem/SearchItem';
import useFetch from "../../hooks/useFetch.js";

const List = () => {
    const location = useLocation();
    const [openDate, setOpenDate] = useState(false);
    const [destination, setDestination] = useState(location.state.destination);
    const [dates, setDates] = useState(location.state.dates);
    const [options, setOptions] = useState(location.state.options);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(999);

    const { data, loading, error, reFetch } = useFetch(`/hotels?city=${destination}&min=${min}&max=${max}`);

    const handleClick = () => {
        reFetch();
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
                            <label >Destination</label>
                            <input type="text" placeholder={destination} onChange={(e) => setDestination(e.target.value)} />
                        </div>
                        <div className="lsItem">
                            <label >Check in Date</label>
                            <span onClick={() => setOpenDate(!openDate)}>{`${format(dates[0].startDate, "MM/dd/yyyy")}`} to {`${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                            {openDate && <DateRange onChange={item => setDates([item.selection])} minDate={new Date()} ranges={dates} />}
                        </div>
                        <div className="lsItem">
                            <label >Options</label>
                            <div className="lsOptions">
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Min Price <small>/per night</small></span>
                                    <input type="number" className='lsOptionInput' onChange={e => setMin(e.target.value)} />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Max Price <small>/per night</small></span>
                                    <input type="number" className='lsOptionInput' onChange={e => setMax(e.target.value)} />
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
                        <button onClick={handleClick}>Search</button>
                    </div>
                    <div className="listResult">
                        {loading ? "loading please wait..." :
                            <>
                                {data.map(item => (

                                    <SearchItem item={item} key={item._id} />
                                ))}
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List