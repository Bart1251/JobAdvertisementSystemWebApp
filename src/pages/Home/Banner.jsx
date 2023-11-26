import baner from "../../assets/baner.png"

export default function Banner() {
    return (
        <div className="position-relative d-flex flex-column justify-content-center">
            <img className="img-fluid" src={baner}></img>
            <div className="position-absolute top-50 start-50 w-100 translate-middle d-flex flex-column align-items-center gap-4">
                <div className="rounded shadow bg-light-subtle w-auto p-2 ps-5 pe-5">
                    <h1>Job Navigator</h1>
                </div>
                <div className="text-end rounded shadow bg-light-subtle w-auto p-2 ps-5 pe-5">
                    <h1 className="fs-1">81 025 sprawdzonych ofert pracy</h1>
                    <p className="fs-4">od najlepszych pracodawców</p>
                </div>
            </div>
        </div>
    )
}