import { useEffect, useRef, useState } from "react";
import CoreAPI from "../../services";
import { CardDetail, GetCardBySearchReq, GetCardBySearchRes, GetRaritiesRes, GetSetsRes, GetTypeRes, ItemInCart, SetDetail } from "../../models";
import CardBox from "../../components/card-box";
import DropDown, { ItemDropdown } from "../../components/dropdown";
import Input from "../../components/input";
import IconCart from "../../static/icon/icon-cart-1.svg";
import CartContainer from "../../components/cart-container";
import Paginator from "../../components/paginator";
import LoadingModal from "../../components/loading-modal";

type PageDetail = {
    page: number,
    pageTotal: number,
}

function MainPage() {
    const containerItemRef = useRef<HTMLDivElement>(null)
    const [listDropdownSet, setListDropdownSet] = useState<ItemDropdown[]>([])
    const [valueDropdownSet, setValueDropdownSet] = useState<ItemDropdown>()
    const [listDropdownRarity, setListDropdownRarity] = useState<ItemDropdown[]>([])
    const [valueDropdownRarity, setValueDropdownRarity] = useState<ItemDropdown>()
    const [listDropdownType, setListDropdownType] = useState<ItemDropdown[]>([])
    const [valueDropdownType, setValueDropdownType] = useState<ItemDropdown>()
    const [valueInputSearch, setValueInputSearch] = useState<string>("")

    const [listCard, setListCard] = useState<GetCardBySearchRes>()
    const [listInCart, setListInCart] = useState<ItemInCart[]>([])
    const [pageDetail, setPageDetail] = useState<PageDetail>({
        page: 1,
        pageTotal: 1,
    })
    const [openCart, setOpenCart] = useState<boolean>(false)
    const [openLoading, setOpenLoading] = useState<boolean>(false)


    useEffect(() => {
        const func = async () => {
            onGetSets();
            onGetRarities();
            onGetTypes();
            onGetCard(pageDetail.page, "", "", "", "");
        }
        func();
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [listCard])

    const onGetCard = async (page: number, name: string, set: string, rarity: string, type: string) => {
        setOpenLoading(true);
        let res: GetCardBySearchRes = {
            count: 0,
            page: 0,
            pageSize: 0,
            totalCount: 0,
            data: []
        };
        try {
            const body: GetCardBySearchReq = {
                name: name || "",
                page: page || 1,
                pageSize: 20,
                orderBy: "",
                setId: set || "",
                rarity: rarity || "",
                type: type || "",
            }
            res = await CoreAPI.pokemonTCGHttpService.getCardBySearch(body);
            const pageTotal = Math.ceil(res.totalCount / res.pageSize);
            setPageDetail({
                page: page,
                pageTotal: pageTotal,
            })
        } catch { }
        setListCard(res)
        setOpenLoading(false);
    }

    const onGetSets = async () => {
        let list: ItemDropdown[] = [];
        try {
            const response: GetSetsRes = await CoreAPI.pokemonTCGHttpService.getSets();
            list = response.data.map((x: SetDetail) => {
                const detail: ItemDropdown = {
                    label: x.name,
                    value: x.id,
                }
                return detail
            })
        } catch { }
        setListDropdownSet(list)
    }

    const onGetRarities = async () => {
        let list: ItemDropdown[] = [];
        try {
            const response: GetRaritiesRes = await CoreAPI.pokemonTCGHttpService.getRarities();
            list = response.data.map((x: string) => {
                const detail: ItemDropdown = {
                    label: x,
                    value: x,
                }
                return detail
            })
        } catch { }
        setListDropdownRarity(list)
    }

    const onGetTypes = async () => {
        let list: ItemDropdown[] = [];
        try {
            const response: GetTypeRes = await CoreAPI.pokemonTCGHttpService.getTypes();
            list = response.data.map((x: string) => {
                const detail: ItemDropdown = {
                    label: x,
                    value: x,
                }
                return detail
            })
        } catch { }
        setListDropdownType(list)
    }

    const handleSelectSet = (param: ItemDropdown) => {
        onGetCard(
            1,
            valueInputSearch || "",
            param?.value || "",
            valueDropdownRarity?.value || "",
            valueDropdownType?.value || "",
        );
        setValueDropdownSet(param)
    }

    const handleSelectRarity = (param: ItemDropdown) => {
        onGetCard(
            1,
            valueInputSearch || "",
            valueDropdownSet?.value || "",
            param?.value || "",
            valueDropdownType?.value || "",
        );
        setValueDropdownRarity(param)
    }

    const handleSelectType = (param: ItemDropdown) => {
        onGetCard(
            1,
            valueInputSearch || "",
            valueDropdownSet?.value || "",
            valueDropdownRarity?.value || "",
            param?.value || "",
        );
        setValueDropdownType(param)
    }

    const handleEnterSearch = (param: string) => {
        onGetCard(
            1,
            param || "",
            valueDropdownSet?.value || "",
            valueDropdownRarity?.value || "",
            valueDropdownType?.value || "",
        );
        setValueInputSearch(param)
    }

    const handleAddCart = (param: CardDetail) => {
        let list: ItemInCart[] = JSON.parse(JSON.stringify(listInCart))
        let detail: ItemInCart = {
            id: param.id,
            total: 1,
            max: param.set.total,
            price: param.cardmarket.prices.averageSellPrice,
            name: param.name,
            image: param.images.large,
        }
        list.push(detail)
        setListInCart(list)
    }

    const handleOpenCart = () => {
        setOpenCart(true)
    }

    const handleChangeCart = (param: ItemInCart[]) => {
        setListInCart(param)
    }

    const handleChagePage = (param: number) => {
        onGetCard(
            param,
            valueInputSearch || "",
            valueDropdownSet?.value || "",
            valueDropdownRarity?.value || "",
            valueDropdownType?.value || "",
        );
    }
    return (
        <>
            {openLoading &&
                <LoadingModal />
            }
            {openCart &&
                <CartContainer
                    list={listInCart}
                    onClose={() => setOpenCart(false)}
                    onChange={handleChangeCart}
                    onPayment={() => setOpenCart(false)}
                />
            }
            <div ref={containerItemRef} className="2xl:w-[1240px] xl:w-[1036px] lg:w-[820px] md:w-[610px] sm:w-[610px] w-[320px] absolute top-0 duration-300"
                style={{
                    left: "50%",
                    transform: "translateX(-50%)"
                }}>
                {/* ========== ========== Header Normal ========== ========== */}
                <div className="w-full sm:flex hidden py-4 border-b border-solid border-[#FFFFFF14] items-center place-content-between">
                    <div className="text-white text-2xl font-semibold">Pokemon market</div>
                    <div className="flex">
                        <Input
                            value={valueInputSearch}
                            placeHolder={"Search by Name"}
                            onInput={() => { }}
                            onEnter={handleEnterSearch}
                            widthFull={false}
                        />
                        <div className="w-12 h-12 ml-2 rounded-lg flex justify-center items-center bg-[#EA7C69] hover:bg-[#EA7C69CC] duration-300 drop-shadow-1 cursor-pointer"
                            onClick={handleOpenCart}>
                            <img src={IconCart} />
                        </div>
                    </div>
                </div>
                {/* ========== ========== Header Small ========== ========== */}
                <div className="w-full sm:hidden block py-4 border-b border-solid border-[#FFFFFF14]">
                    <div className="flex items-center place-content-between mb-4">
                        <div className="text-white text-2xl font-semibold">Pokemon market</div>
                        <div className="w-12 h-12 ml-2 rounded-lg flex justify-center items-center bg-[#EA7C69] hover:bg-[#EA7C69CC] duration-300 drop-shadow-1 cursor-pointer"
                            onClick={handleOpenCart}>
                            <img src={IconCart} />
                        </div>
                    </div>
                    <Input
                        widthFull
                        value={valueInputSearch}
                        placeHolder={"Search by Name"}
                        onInput={() => { }}
                        onEnter={handleEnterSearch}
                    />
                </div>
                {/* ========== ========== Filter Normal ========== ========== */}
                <div className="w-full py-4 sm:flex hidden items-center place-content-between">
                    <div className="text-white text-lg font-semibold">Choose Card</div>
                    <div className="flex gap-2">
                        <DropDown
                            className={"w-20"}
                            list={listDropdownSet}
                            value={valueDropdownSet}
                            containerPosition={"start"}
                            labelDropdown={"Set"}
                            onSelect={handleSelectSet}
                            onClear={handleSelectSet}
                        />
                        <DropDown
                            className={"w-24"}
                            list={listDropdownRarity}
                            value={valueDropdownRarity}
                            containerPosition={"start"}
                            labelDropdown={"Rarity"}
                            onSelect={handleSelectRarity}
                            onClear={handleSelectRarity}
                        />
                        <DropDown
                            className={"w-24"}
                            list={listDropdownType}
                            value={valueDropdownType}
                            containerPosition={"end"}
                            labelDropdown={"Type"}
                            onSelect={handleSelectType}
                            onClear={handleSelectType}
                        />
                    </div>
                </div>
                {/* ========== ========== Filter Small ========== ========== */}
                <div className="w-full py-4 sm:hidden block">
                    <div className="text-white text-lg font-semibold mb-4">Choose Card</div>
                    <div className="flex gap-2">
                        <DropDown
                            className={"w-20"}
                            list={listDropdownSet}
                            value={valueDropdownSet}
                            containerPosition={"start"}
                            labelDropdown={"Set"}
                            onSelect={handleSelectSet}
                            onClear={handleSelectSet}
                        />
                        <DropDown
                            className={"w-24"}
                            list={listDropdownRarity}
                            value={valueDropdownRarity}
                            containerPosition={"start"}
                            labelDropdown={"Rarity"}
                            onSelect={handleSelectRarity}
                            onClear={handleSelectRarity}
                        />
                        <DropDown
                            className={"w-24"}
                            list={listDropdownType}
                            value={valueDropdownType}
                            containerPosition={"end"}
                            labelDropdown={"Type"}
                            onSelect={handleSelectType}
                            onClear={handleSelectType}
                        />
                    </div>
                </div>
                {/* ========== ========== Card Container ========== ========== */}
                <div className="flex sm:flex-wrap sm:flex-row flex-col gap-4 mb-4">
                    {listCard?.data.map((valueItem: CardDetail, index: number) => {
                        return (
                            <div key={index} className="mx-2">
                                <CardBox
                                    id={valueItem.id}
                                    name={valueItem.name}
                                    image={valueItem.images?.large}
                                    price={valueItem.cardmarket?.prices?.averageSellPrice || 0}
                                    total={valueItem.set?.total || 0}
                                    inCart={listInCart?.find((x: ItemInCart) => x.id === valueItem.id) ? true : false}
                                    onAddCart={(e: string) => { handleAddCart(valueItem) }}
                                />
                            </div>
                        )
                    })}
                    {(!listCard || listCard?.data.length === 0) &&
                        <div className='w-full text-white text-sm font-normal p-2 text-center'>
                            No Data.
                        </div>
                    }
                </div>
                {/* ========== ========== Paginator ========== ========== */}
                {((Array.isArray(listCard?.data) && listCard?.data && (listCard?.data?.length > 0)) || (!listCard?.data)) &&
                    <div className="w-full flex justify-center items-center mb-4">
                        <Paginator
                            current={pageDetail.page}
                            total={pageDetail.pageTotal}
                            onChange={handleChagePage}
                        />
                    </div>
                }
            </div>
        </>
    )
}

export default MainPage;