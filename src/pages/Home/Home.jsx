import Navbar from "../../components/Navbar"
import Banner from "./Banner"
import Search from "../../components/Serach"

export default function Home() {
    return (
        <div className="bg-body-secondary min-vh-100">
            <Navbar/>
            <div className="container pb-5">
                <Banner/>
                <Search/>
            </div>
        </div>      
    )
}