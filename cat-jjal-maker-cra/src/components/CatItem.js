function CatItem(props) {
    return (
        <li>
            <img
                src={props.img}
                alt="고양이"
                style={{ width: "150px" }}
            />
        </li>
    );
}

export default CatItem;
