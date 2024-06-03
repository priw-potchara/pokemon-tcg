import { useEffect, useState } from "react";
import { ItemInCart } from "../../models";

type CartItemProps = {
    item: ItemInCart;
    onAdd: Function;
    onRemove: Function;
};

function CartItem({
    item,
    onAdd,
    onRemove,
}: CartItemProps) {
    const [disableAdd, setDisableAdd] = useState<boolean>(false)
    const [disableRemove, setDisableRemove] = useState<boolean>(false)

    useEffect(() => {
        if (item.total === item.max) {
            setDisableAdd(true)
        } else {
            setDisableAdd(false)
        }
    }, [item])

    const onSumTotal = () => {
        const sum: number = item.total * item.price;
        const formatted = sum.toLocaleString('en', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        return formatted
    }

    const handleAdd = () => {
        if (disableAdd) return;
        onAdd && onAdd();
    }

    const handleRemove = () => {
        if (disableRemove) return;
        onRemove && onRemove();
    }

    return (
        <div className="w-full h-32 flex flex-col place-content-between">
            {/* ========== ========== Detail ========== ========== */}
            <div className="w-full h-16 gap-2 flex">
                <div className="w-14 min-w-14">
                    <img className="h-full" src={item.image} />
                </div>
                <div className="w-full overflow-hidden">
                    <div className="w-full overflow-hidden break-words whitespace-nowrap text-ellipsis text-white text-xs font-normal">
                        {item.name}
                    </div>
                    <span className="text-[#ABBBC2] text-xs font-normal">$ {item.price}</span>
                </div>
                <div className="w-14 min-w-14 text-end text-white text-xs font-normal">$ {onSumTotal()}</div>
            </div>

            {/* ========== ========== Amount ========== ========== */}
            <div className="w-full h-14 gap-2 flex items-center">
                <div className="w-14 min-w-14">
                    <div className={`w-14 h-14 rounded-lg flex justify-center items-center bg-[#FFFFFF14] ${disableRemove ? "opacity-40" : "cursor-pointer hover:bg-[#FFFFFF2E]"}  duration-300`}
                        onClick={handleRemove}>
                        <span className="text-[#FFFFFF] text-lg font-medium">-</span>
                    </div>
                </div>
                <div className="w-full text-white text-sm font-normal">
                    <div className={`w-full h-14 rounded-lg flex justify-center items-center bg-[#FFFFFF14]`}>
                        <span className="text-[#FFFFFF] text-lg font-medium">{item.total}</span>
                    </div>
                </div>
                <div className="w-14 min-w-14 text-end text-white text-sm font-normal">
                    <div className={`w-14 h-14 rounded-lg flex justify-center items-center bg-[#FFFFFF14] ${disableAdd ? "opacity-40" : "cursor-pointer hover:bg-[#FFFFFF2E]"}  duration-300`}
                        onClick={handleAdd}>
                        <span className="text-[#FFFFFF] text-lg font-medium">+</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem;