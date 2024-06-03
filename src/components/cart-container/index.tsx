import { useEffect, useState } from "react";
import IconClose from "../../static/icon/icon-close.svg";
import { ItemInCart } from "../../models";
import CartItem from "../cart-item";

type CartContainerProps = {
    list: ItemInCart[];
    onClose: Function;
    onChange: Function;
    onPayment: Function;
};

function CartContainer({
    list,
    onClose,
    onChange,
    onPayment,
}: CartContainerProps) {
    const [totalAmount, setTotalAmount] = useState<number>(0)
    const [totalPrice, setTotalPrice] = useState<number>(0.00)
    const [listItem, setListItem] = useState<ItemInCart[]>([])

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [])

    useEffect(() => {
        setListItem(list)
    }, [list])

    useEffect(() => {
        let amount = 0;
        let sum = 0;
        for (let item of listItem) {
            amount = amount + item.total;
            sum = sum + (item.total * item.price);
        }
        setTotalAmount(amount);
        setTotalPrice(sum);
    }, [listItem])

    const onFormatTotalPrice = (param: number) => {
        const formatted = param.toLocaleString('en', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        return formatted
    }

    const onFormatTotalAmount = (param: number) => {
        const formatted = param.toLocaleString('en');
        return formatted
    }

    const handlePayment = () => {
        onClose && onClose();
    }

    const handleClearAll = () => {
        onChange && onChange([]);
    }

    const handleChange = (index: number, type: string) => {
        const sum = type === "add" ? 1 : -1;
        let list: ItemInCart[] = JSON.parse(JSON.stringify(listItem));
        list[index].total = list[index].total + sum;
        if (list[index].total === 0) {
            list.splice(index, 1);
        }
        setListItem(list)
        onChange && onChange(list);
    }

    const handleClose = () => {
        onClose && onClose();
    }

    return (
        <div className="w-full h-full bg-[#000000B2] z-30 fixed top-0 left-0">
            <div className="w-96 h-full bg-[#1F1D2B] ml-auto mr-0 p-4 overflow-auto">

                {/* ========== ========== Header ========== ========== */}
                <div className="w-full h-14 flex place-content-between items-center">
                    <div className="flex flex-col place-content-between">
                        <div className="text-white text-2xl font-semibold">Cart</div>
                        <div className="text-[#ABBBC2] text-xs font-normal cursor-pointer hover:text-[#ABBBC2CC] duration-300"
                            onClick={handleClearAll}
                        ><u>Clear all</u></div>
                    </div>
                    <div className="w-12 h-12 ml-2 rounded-lg flex justify-center items-center bg-[#EA7C69] hover:bg-[#EA7C69CC] duration-300 drop-shadow-1 cursor-pointer"
                        onClick={handleClose}>
                        <img src={IconClose} />
                    </div>
                </div>

                {/* ========== ========== Header Column ========== ========== */}
                <div className="w-full h-8 gap-2 flex items-center border-b border-solid border-[#FFFFFF14]">
                    <div className="w-14 min-w-14 text-white text-sm font-normal">Item</div>
                    <div className="w-full text-white text-sm font-normal">Qty</div>
                    <div className="w-14 min-w-14 text-end text-white text-sm font-normal">Price</div>
                </div>

                {/* ========== ========== List ========== ========== */}
                <div className="w-full mt-4 gap-6 flex flex-col overflow-y-auto"
                    style={{ height: "calc(100% - 296px)" }}>
                    {listItem.map((valueItem: ItemInCart, index: number) => {
                        return (
                            <div key={index}>
                                <CartItem
                                    item={valueItem}
                                    onAdd={() => { handleChange(index, "add") }}
                                    onRemove={() => { handleChange(index, "remove") }}
                                />
                            </div>
                        )
                    })}
                    {listItem.length === 0 &&
                        <div className='w-full text-white text-xs font-medium p-2 text-center'>
                            No Item.
                        </div>
                    }
                </div>

                {/* ========== ========== Payment ========== ========== */}
                <div className="w-full h-44 py-6 flex flex-col place-content-between">
                    <div className="flex place-content-between items-center">
                        <span className="text-[#ABBBC2] text-xs font-normal">Total card amount</span>
                        <span className="text-white text-base font-medium">{onFormatTotalAmount(totalAmount)}</span>
                    </div>
                    <div className="flex place-content-between items-center">
                        <span className="text-[#ABBBC2] text-xs font-normal">Total price</span>
                        <span className="text-white text-base font-medium">$ {onFormatTotalPrice(totalPrice)}</span>
                    </div>
                    <div className="w-full h-12 rounded-lg flex justify-center items-center bg-[#EA7C69] hover:bg-[#EA7C69CC] duration-300 drop-shadow-1 cursor-pointer"
                        onClick={handlePayment}>
                        <span className="text-white text-xs font-medium">Continue to Payment</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartContainer;