import Navbar from "../../components/Navbar"
import Banner from "./Banner"
import Search from "../../components/Serach"
import { useState, useEffect } from "react"
import OfferTile from "../../components/OfferTile";
import { useApi } from "../../contexts/ApiContext";

export default function Home() {
    const { apiRequest, buildQueryParams } = useApi();
    const [categories, setCategories] = useState([]);
    const [jobLevels, setJobLevels] = useState([]);
    const [jobTypes, setJobTypes] = useState([]);
    const [typesOfContract, setTypesOfContract] = useState([]);
    const [workShifts, setWorkShifts] = useState([]);
    const [searchSettings, setSearchSettings] = useState({ position: "", category: "0", location: "", distance: "30", job_level: [], job_type: [], type_of_contract: [], work_shift: [] });

    const offersPerPage = 24;
    const [displayedOffers, setDisplayedOffers] = useState([]);
    const [displayedPage, setDisplayedPage] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [typeOfOffersDisplayed, setTypeOfOffersDisplayed] = useState(0); // latest 0, last seen 2, most popular 1

    async function fetchOffers() {
        const offersData = await apiRequest(`http://127.0.0.1/offerSearch/${typeOfOffersDisplayed}?${buildQueryParams({...searchSettings, offers_per_page: offersPerPage, page: displayedPage})}`, "GET", null, {}, false, [], false);
        console.log(offersData)
        if(offersData) {
            setDisplayedOffers(offersData.offers);
            setNumberOfPages(offersData.count / offersPerPage);
        }
    }

    useEffect(() => {
        async function fetchSearchData() {
            const categoriesData = await apiRequest(`http://127.0.0.1/category`, "GET");
            const jobLevelsData = await apiRequest(`http://127.0.0.1/jobLevel`, "GET");
            const jobtypesData = await apiRequest(`http://127.0.0.1/jobType`, "GET");
            const typesOfContractData = await apiRequest(`http://127.0.0.1/typeOfContract`, "GET");
            const workShiftsData = await apiRequest(`http://127.0.0.1/workShift`, "GET");

            setCategories(categoriesData);
            setJobLevels(jobLevelsData);
            setJobTypes(jobtypesData);
            setTypesOfContract(typesOfContractData);
            setWorkShifts(workShiftsData);
        }

        fetchSearchData();
        fetchOffers();
    }, []);

    return (
        <div className="bg-body-secondary min-vh-100">
            <Navbar/>
            <div className="container-md pb-5">
                <Banner/>
                <Search fetchOffers={fetchOffers} searchSettingsSetter={setSearchSettings} searchSettings={searchSettings} searchValues={{categories: categories, jobLevels: jobLevels, jobTypes: jobTypes, typesOfContract: typesOfContract, workShifts: workShifts}}/>
                <div className="d-flex justify-content-center">
                    <div className="btn-group d-flex align-items-center" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" onSelect={() => {setTypeOfOffersDisplayed(0)}} defaultChecked={true} className="btn-check" name="btnradio" id="btnradio1" autoComplete="off"/>
                        <label className="btn btn-outline-primary rounded-start-pill px-3 h-100" htmlFor="btnradio1">Najnowsze</label>

                        <input type="radio" onSelect={() => {setTypeOfOffersDisplayed(1)}} className="btn-check" name="btnradio" id="btnradio2" autoComplete="off"/>
                        <label className="btn btn-outline-primary px-3 h-100" htmlFor="btnradio2">Najpopularniejsze</label>

                        <input type="radio" onSelect={() => {setTypeOfOffersDisplayed(2)}} className="btn-check" name="btnradio" id="btnradio3" autoComplete="off"/>
                        <label className="btn btn-outline-primary rounded-end-pill px-3" htmlFor="btnradio3">Ostatnio przeglądane</label>
                    </div>
                </div>
                <div className="d-flex flex-wrap my-5 m-sm-5">
                    {displayedOffers.map(e => { return <OfferTile offer={e}/> })}
                    {displayedOffers.map(e => { return <OfferTile offer={e}/> })}
                    {displayedOffers.map(e => { return <OfferTile offer={e}/> })}
                    {displayedOffers.map(e => { return <OfferTile offer={e}/> })}
                </div>
            </div>
        </div>  
    )
}