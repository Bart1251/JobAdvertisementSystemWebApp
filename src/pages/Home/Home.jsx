import Navbar from "../../components/Navbar"
import Banner from "./Banner"

export default function Home() {
    return (
        <div className="bg-body-secondary min-vh-100">
            <Navbar/>
            <Banner/>
        </div>      
    )
}