import React, { FormEvent, KeyboardEvent, useEffect, useState } from 'react';
import IconArrow from '../../static/icon/icon-arrow.svg'

type PaginatorProps = {
    current: number;
    total: number;
    onChange: Function;
};

function Paginator({
    current,
    total,
    onChange,
}: PaginatorProps) {
    const [pageCurrent, setPageCurrent] = useState<number>(1)
    const [pageTotal, setPageTotal] = useState<number>(1)
    const [pageShowMiddle, setPageShowMiddle] = useState<number>(3)
    const [pageMiddle, setPageMiddle] = useState<number[]>([])

    useEffect(() => {
        setPageCurrent(current || 1)
    }, [current])

    useEffect(() => {
        setPageTotal(total || 1)
    }, [total])

    useEffect(() => {
        let list: number[] = [];
        if (pageTotal - 2 > pageShowMiddle) {
            if (pageCurrent === 1) {
                {/* ========== ========== Page 1 ========== ========== */ }
                for (let i = 1; i <= pageShowMiddle; i++) {
                    list.push(i + 1)
                }
            } else if (pageCurrent === pageTotal) {
                {/* ========== ========== Page Last ========== ========== */ }
                for (let i = (pageTotal - pageShowMiddle); i < pageTotal; i++) {
                    list.push(i)
                }
            } else {
                if (pageMiddle.indexOf(pageCurrent) === (pageShowMiddle - 1)) {
                    if (pageTotal - pageCurrent < pageShowMiddle) {
                        {/* ========== ========== Shift to Last ========== ========== */ }
                        for (let i = (pageTotal - pageShowMiddle); i < pageTotal; i++) {
                            list.push(i)
                        }
                    } else {
                        {/* ========== ========== Shift to Middle ========== ========== */ }
                        for (let i = pageCurrent - 1; i <= pageCurrent + 1; i++) {
                            list.push(i)
                        }
                    }
                } else if (pageMiddle.indexOf(pageCurrent) === 0) {
                    if (pageCurrent - 1 < pageShowMiddle) {
                        {/* ========== ========== Shift to 1 ========== ========== */ }
                        for (let i = 1; i <= pageShowMiddle; i++) {
                            list.push(i + 1)
                        }
                    } else {
                        {/* ========== ========== Shift to Middle ========== ========== */ }
                        for (let i = pageCurrent - 1; i <= pageCurrent + 1; i++) {
                            list.push(i)
                        }
                    }
                } else {
                    {/* ========== ========== Prev Value ========== ========== */ }
                    list = JSON.parse(JSON.stringify(pageMiddle));
                }
            }
        } else {
            {/* ========== ========== Show Page Middle Perfect ========== ========== */ }
            for (let i = 1; i < pageTotal - 1; i++) {
                list.push(i + 1)
            }
        }
        setPageMiddle(list)
    }, [pageCurrent, pageTotal])

    const handleClickPage = (param: number) => {
        setPageCurrent(param)
        onChange && onChange(param)
    }

    const handleClickBack = () => {
        if (pageCurrent === 1) return
        const _page = pageCurrent - 1;
        setPageCurrent(_page)
        onChange && onChange(_page)
    }

    const handleClickNext = () => {
        if (pageCurrent === pageTotal) return
        const _page = pageCurrent + 1;
        setPageCurrent(_page)
        onChange && onChange(_page)
    }

    return (
        <div className='w-fit h-12 px-2 flex items-center gap-2'>
            {/* ========== ========== First ========== ========== */}
            <div className={`flex justify-center items-center w-9 h-9 rounded-lg bg-[#FFFFFF14] ${pageCurrent === 1 ? "opacity-40" : "cursor-pointer hover:bg-[#FFFFFF2E]"}  duration-300`}
                onClick={handleClickBack}
            >
                <img className="rotate-90" src={IconArrow} />
            </div>
            <div className={`flex justify-center items-center w-9 h-9 rounded-lg ${pageCurrent === 1 ? 'bg-[#1F1D2B]' : 'bg-[#FFFFFF14] hover:bg-[#FFFFFF2E]'} cursor-pointer duration-300`}
                title="1"
                onClick={(e) => { handleClickPage(1) }}
            >
                <div className="text-white text-sm font-normal">1</div>
            </div>
            {/* ========== ========== Dot ========== ========== */}
            {(((pageTotal - 2) > pageShowMiddle) &&
                ((pageCurrent - 1) >= pageShowMiddle)) &&
                <div className={`flex items-center gap-1`}>
                    <div className={`w-2 h-2 rounded-full bg-[#FFFFFF14]`}></div>
                    <div className={`w-2 h-2 rounded-full bg-[#FFFFFF14]`}></div>
                    <div className={`w-2 h-2 rounded-full bg-[#FFFFFF14]`}></div>
                </div>
            }
            {/* ========== ========== Middle ========== ========== */}
            {pageMiddle.map((value: number, index: number) => {
                return (
                    <div
                        key={index}
                        className={`flex justify-center items-center w-9 h-9 rounded-lg ${pageCurrent === value ? 'bg-[#1F1D2B]' : 'bg-[#FFFFFF14] hover:bg-[#FFFFFF2E]'} cursor-pointer duration-300`}
                        title={`${value}`}
                        onClick={(e) => { handleClickPage(value) }}
                    >
                        <div className="text-white text-sm font-normal">{value}</div>
                    </div>
                )
            })}
            {/* ========== ========== Dot ========== ========== */}
            {((pageTotal - 2) > pageShowMiddle) &&
                (((pageTotal - pageCurrent) >= pageShowMiddle)) &&
                <div className={`flex items-center gap-1`}>
                    <div className={`w-2 h-2 rounded-full bg-[#FFFFFF14]`}></div>
                    <div className={`w-2 h-2 rounded-full bg-[#FFFFFF14]`}></div>
                    <div className={`w-2 h-2 rounded-full bg-[#FFFFFF14]`}></div>
                </div>
            }
            {/* ========== ========== Last ========== ========== */}
            {(pageTotal !== 1) &&
                <div className={`flex justify-center items-center w-9 h-9 rounded-lg ${pageCurrent === pageTotal ? 'bg-[#1F1D2B]' : 'bg-[#FFFFFF14] hover:bg-[#FFFFFF2E]'} cursor-pointer duration-300`}
                    title={`${pageTotal}`}
                    onClick={(e) => { handleClickPage(pageTotal) }}
                >
                    <div className="text-white text-sm font-normal">{pageTotal}</div>
                </div>
            }
            <div className={`flex justify-center items-center w-9 h-9 rounded-lg bg-[#FFFFFF14] ${pageCurrent === pageTotal ? "opacity-40" : "cursor-pointer hover:bg-[#FFFFFF2E]"}  duration-300`}
                onClick={handleClickNext}
            >
                <img className="-rotate-90" src={IconArrow} />
            </div>
        </div>
    );
};

export default Paginator;