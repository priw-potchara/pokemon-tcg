import IconCart from "../../static/icon/icon-cart.svg";

type CardBoxProps = {
    id: string;
    name: string;
    image: string;
    price: number;
    total: number;
    inCart: boolean;
    onAddCart: Function;
};

function CardBox({
    id,
    name,
    image,
    price,
    total,
    inCart,
    onAddCart,
}: CardBoxProps) {

    const handleClick = () => {
        if (inCart) return;
        onAddCart && onAddCart(id)
    }

    return (
        <div className="sm:w-44 w-full sm:h-72 h-[424px] relative flex flex-col items-center">
            {/* ========== ========== Image ========== ========== */}
            <div className="sm:h-36 h-72 top-0 z-10">
                <img className="w-auto h-full" alt="Pokemon TCG" src={image} />
            </div>
            {/* ========== ========== Detail ========== ========== */}
            <div className="w-full sm:h-44 h-52 absolute bottom-0 rounded-2xl bg-[#1F1D2B] sm:pt-12 pt-20 pb-4 px-4">
                <div className="w-full h-full place-content-between flex flex-col">
                    <div className="w-full h-9 text-white text-xs font-medium text-center line-clamp-2 overflow-hidden break-words text-ellipsis"
                        style={{ lineHeight: "1.02rem" }}>
                        {name}
                    </div>
                    <div className="w-full h-4 flex justify-center items-center">
                        <span className="text-[#ABBBC2] text-xs font-normal">$ {price}</span>
                        <div className="w-1 h-1 rounded-full bg-[#FFFFFF14] mx-2"></div>
                        <span className="text-[#ABBBC2] text-xs font-normal">{total === 0 ? "Out of stock" : total + " Cards"}</span>
                    </div>
                    <div className={`w-full h-9 rounded-lg flex justify-center items-center bg-[#FFFFFF14] ${inCart ? "opacity-40" : "cursor-pointer hover:bg-[#FFFFFF2E]"}  duration-300`}
                        onClick={handleClick}>
                        <img className="mr-2" src={IconCart} />
                        <span className="text-[#FFFFFF] text-xs font-medium">Add to cart</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardBox;