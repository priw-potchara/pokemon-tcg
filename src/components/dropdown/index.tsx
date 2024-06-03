import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import IconArrow from '../../static/icon/icon-arrow.svg'
import IconClose from "../../static/icon/icon-close.svg";

type DropDownProps = {
    list: ItemDropdown[];
    value?: ItemDropdown;
    className: string;
    labelDropdown: string;
    containerPosition: string;
    onSelect: Function;
    onClear: Function;
};

export type ItemDropdown = {
    label: string;
    value: string;
};

function DropDown({
    list,
    value,
    className,
    labelDropdown,
    containerPosition,
    onSelect,
    onClear,
}: DropDownProps) {
    const containerItemRef = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<ItemDropdown>();

    useEffect(() => {
        if (value) {
            setSelected(value)
        }
    }, [value])

    useEffect(() => {
        if (open) {
            if (list.length >= 0) {
                let index = list.findIndex((x: ItemDropdown) => x.value === value?.value);
                if (index >= 0) containerItemRef.current?.scrollTo({ top: index * 37, behavior: "smooth" });
            }
        }
    }, [open])

    const handleClickBtn = () => {
        setOpen(!open)
    }

    const handleBlurBtn = () => {
        setOpen(false)
    }

    const handleClickItem = (param: ItemDropdown) => {
        setSelected(param)
        onSelect && onSelect(param)
        setOpen(false)
    }

    const handleClear = (event: MouseEvent) => {
        event.stopPropagation()
        setSelected(undefined)
        onClear && onClear(undefined)
        setOpen(false)
    }

    return (
        <button className={`${className} h-9 relative z-20`}
            onClick={handleClickBtn}
            onBlur={handleBlurBtn}
        >
            <div className='h-full px-6 absolute top-0 left-0 rounded-lg border border-solid border-[#393C49] bg-[#1F1D2B] flex justify-center items-center'>
                <span className='text-white text-sm font-normal'>{labelDropdown}</span>
                <img className={`ml-2 ${open? "scale-y-[-1]":""} duration-300`} src={IconArrow} />
            </div>
            {open &&
                <div ref={containerItemRef} className={`w-44 min-h-9 max-h-36 absolute top-10 ${containerPosition === "end" ? "right-0" : "left-0"} rounded-lg border border-solid border-[#393C49] bg-[#1F1D2B] drop-shadow-lg overflow-y-auto overflow-x-hidden`}>
                    {list.map((valueItem: ItemDropdown, indexItem: number) => {
                        return (
                            <div key={indexItem} className={`w-full flex items-center place-content-between text-white text-sm font-normal text-left border-b border-solid border-[#393C49] px-4 py-2 ${valueItem.value === selected?.value ? "bg-[#252836]" : ""
                                } hover:bg-[#393C49] duration-300`}
                                title={valueItem.label}
                                onClick={(e) => { handleClickItem(valueItem) }}
                            >
                                <div className='overflow-hidden break-words whitespace-nowrap text-ellipsis'>
                                    {valueItem.label}
                                </div>
                                {(valueItem.value === selected?.value) &&
                                    <div className='w-4 min-w-4 h-4 ml-2' onClick={handleClear}>
                                        <img src={IconClose} />
                                    </div>
                                }
                            </div>
                        )
                    })}
                    {list.length === 0 &&
                        <div className='w-full text-white text-sm font-normal p-2'>
                            No Data.
                        </div>
                    }
                </div>
            }
        </button>
    );
};

export default DropDown;
