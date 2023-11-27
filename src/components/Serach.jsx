import Dropdown from "./Dropdown"

export default function Search() {
    return (
        <form className="bg-light-subtle shadow rounded m-sm-5 p-4">
            <div className="row mb-4">
                <div className="col-12 col-xl-4 p-0">
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput1" placeholder=""/>
                        <label htmlFor="floatingInput">Stanowisko, firma, słowo kluczowe</label>
                    </div>
                </div>
                <div className="col-12 col-xl-3 p-0">
                    <div className="form-floating">
                        <select className="form-select h-100 p-3">
                            <option>Kategoria</option>
                            <option value="1">One</option>
                        </select>
                    </div>
                </div>
                <div className="col-12 col-xl-3 p-0">
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput2" placeholder=""/>
                        <label htmlFor="floatingInput">Lokalizacja</label>
                    </div>
                </div>
                <div className="col-12 col-xl-2 p-0">
                    <div className="input-group h-100">
                        <div className="form-floating">
                            <input type="text" className="form-control" id="floatingInput3" defaultValue="30" placeholder=""/>
                            <label htmlFor="floatingInput">Odległość</label>
                        </div>
                        <button className="btn btn-outline-secondary border-secondary-subtle disabled">KM</button>
                    </div>
                </div>
            </div>
            <div className="row w-100">
                <div className="col-xl-auto col-md-6 p-3">
                    <Dropdown text="Poziom stanowiska" btnClassName="btn-outline-secondary w-100"/>
                </div>
                <div className="col-xl-auto col-md-6 p-3">
                    <Dropdown text="Rodzaj umowy" btnClassName="btn-outline-secondary w-100"/>
                </div>
                <div className="col-xl-auto col-md-6 p-3">
                    <Dropdown text="Wymiar pracy" btnClassName="btn-outline-secondary w-100"/>
                </div>
                <div className="col-xl-auto col-md-6 p-3">
                    <Dropdown text="Tryb pracy" btnClassName="btn-outline-secondary w-100"/>
                </div>
                <div className="col-auto ms-auto">
                    <button type="button" className="btn btn-primary rounded-pill p-3 fs-5 ps-4 pe-4">Szukaj<i className="bi bi-search ps-1"></i></button>
                </div>
            </div>
        </form>
    )
}