

export default function Dropdown(props) {
    return (
        <li className="dropdown">
            <button type="button" className="btn btn-secondary rounded-pill ps-3 pe-3 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                {props.text}
            </button>
            <ul className={"dropdown-menu text-center p-2 " + props.align}>
                {props.children}
            </ul>
        </li>
    )
}

//props:
//align - to where dropdown snaps; exampe: dropdown-menu-end
//text - dropdown toggle text