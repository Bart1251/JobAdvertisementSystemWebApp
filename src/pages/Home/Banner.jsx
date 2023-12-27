import baner from "../../assets/baner.png"

export default function Banner() {
    return (
        <div className="position-relative d-flex flex-column justify-content-center">
            <img className="img-fluid" src={baner}></img>
            <div className="position-absolute top-50 start-50 w-100 translate-middle d-flex flex-column align-items-center gap-4">
                <div className="rounded shadow bg-light-subtle w-auto p-2 ps-3 pe-3 p-md-3 ps-md-4 pe-md-4">
                    <h1 className="fs-1 d-lg-block d-none">Job Navigator</h1>
                    <h2 className="fs-2 d-md-block d-lg-none d-none">Job Navigator</h2>
                    <h3 className="fs-4 d-sm-block d-md-none d-none">Job Navigator</h3>
                    <h4 className="fs-6 d-block d-sm-none">Job Navigator</h4>
                </div>
                <div className="text-end rounded shadow bg-light-subtle w-auto p-2 ps-3 pe-3 p-md-3 ps-md-4 pe-md-4">
                <h1 className="fs-1 d-lg-block d-none m-0">81 025 sprawdzonych ofert pracy</h1>
                    <h2 className="fs-2 d-md-block d-lg-none d-none m-0">81 025 sprawdzonych ofert pracy</h2>
                    <h3 className="fs-4 d-sm-block d-md-none d-none m-0">81 025 sprawdzonych ofert pracy</h3>
                    <h4 className="fs-6 d-block d-sm-none m-0">81 025 sprawdzonych ofert pracy</h4>
                    <p className="fs-6 m-0">od najlepszych pracodawców</p>
                </div>
            </div>
        </div>
    )
}