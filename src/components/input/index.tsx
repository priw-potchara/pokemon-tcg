import React, { FormEvent, KeyboardEvent, useEffect, useState } from 'react';
import IconSearch from '../../static/icon/icon-search.svg'

type InputProps = {
    value: string;
    placeHolder: string;
    widthFull: boolean;
    onInput: Function;
    onEnter: Function;
};

function Input({
    value,
    placeHolder,
    widthFull,
    onInput,
    onEnter,
}: InputProps) {
    const [inputValue, setInputValue] = useState<string>("")

    useEffect(() => {
        setInputValue(value)
    }, [value])

    const handleInput = (param: FormEvent<HTMLInputElement>) => {
        const value = param.currentTarget.value;
        setInputValue(value)
        onInput && onInput(value)
    }

    const handleKeyDown = (param: KeyboardEvent<HTMLInputElement>) => {
        const value = param.currentTarget.value;
        if (param.key === 'Enter') {
            setInputValue(value)
            onEnter && onEnter(value)
        }
    }

    return (
        <div className={`${widthFull ? "w-full" : "w-44"} h-12 relative rounded-lg border border-solid border-[#393C49] bg-[#1F1D2B14] flex items-center`}>
            <img className='left-3 absolute ' src={IconSearch} />
            <input
                className='w-full h-12 top-0 left-0 absolute bg-[#1F1D2B14] text-white text-sm py-1 pr-3 pl-10'
                placeholder={placeHolder}
                value={inputValue}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

export default Input;
