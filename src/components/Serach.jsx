import Dropdown from "./Dropdown"

export default function Search() {
    return (
        <form className="bg-light-subtle shadow rounded m-5 p-4">
            <div className="row mb-4">
                <div className="col-4 p-0">
                    <div className="form-floating">
                        <input type="text" className="form-control rounded-end-0" id="floatingInput1" placeholder=""/>
                        <label htmlFor="floatingInput">Stanowisko, firma, słowo kluczowe</label>
                    </div>
                </div>
                <div className="col-3 p-0">
                    <select className="form-select h-100 rounded-0">
                        <option>Kategoria</option>
                        <option value="1">One</option>
                    </select>
                </div>
                <div className="col-3 p-0">
                    <div className="form-floating">
                        <input type="text" className="form-control rounded-0" id="floatingInput2" placeholder=""/>
                        <label htmlFor="floatingInput">Lokalizacja</label>
                    </div>
                </div>
                <div className="col-2 p-0">
                    <div className="input-group h-100">
                        <div className="form-floating">
                            <input type="text" className="form-control rounded-start-0" id="floatingInput3" defaultValue="30" placeholder=""/>
                            <label htmlFor="floatingInput">Odległość</label>
                        </div>
                        <button className="btn btn-outline-secondary border-secondary-subtle disabled">KM</button>
                    </div>
                </div>
            </div>
            <div className="row w-100">
                <div className="col d-flex flex-row gap-2">
                    <Dropdown text="Poziom stanowiska" className="mt-auto mb-auto" btnClassName="btn-outline-secondary"/>
                    <Dropdown text="Rodzaj umowy" className="mt-auto mb-auto" btnClassName="btn-outline-secondary"/>
                    <Dropdown text="Wymiar pracy" className="mt-auto mb-auto" btnClassName="btn-outline-secondary"/>
                    <Dropdown text="Tryb pracy" className="mt-auto mb-auto" btnClassName="btn-outline-secondary"/>
                </div>
                <div className="col-auto">
                    <button type="button" className="btn btn-primary rounded-pill p-3 fs-5 ps-4 pe-4">Szukaj<i className="bi bi-search ps-1"></i></button>
                </div>
            </div>
        </form>
    )
}