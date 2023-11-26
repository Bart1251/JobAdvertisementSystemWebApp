

export default function Dropdown(props) {
    return (
        <div className={"dropdown " + props.className}>
            <button type="button" className={"btn rounded-pill ps-3 pe-3 dropdown-toggle " + props.btnClassName} data-bs-toggle="dropdown" aria-expanded="false">
                {props.text}
            </button>
            <ul className={"dropdown-menu text-center p-2 " + props.align}>
                {props.children}
            </ul>
        </div>
    )
}

//props:
//align - to where dropdown snaps; exampe: dropdown-menu-end
//text - dropdown toggle text