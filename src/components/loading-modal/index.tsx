import { useEffect } from "react";

function LoadingModal() {

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [])


    return (
        <div className="w-full h-full bg-[#000000B2] z-30 fixed top-0 left-0 flex justify-center items-center">
            <div className="w-12 h-12 loader"></div>
        </div>
    )
}

export default LoadingModal;