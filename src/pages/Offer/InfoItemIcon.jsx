

export default function InfoItemIcon(props) {
    return (
        <div className={"d-flex flex-row gap-3 p-1 align-items-center " + props.className}>
            <i className={"bi bi-" + props.icon + " bg-warning-subtle fs-5 text-warning rounded-2 p-1"}></i>
            <p className="mt-auto mb-auto">{props.text}</p>
        </div>
    )
}