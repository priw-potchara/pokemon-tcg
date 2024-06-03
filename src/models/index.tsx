export type GetCardBySearchReq = {
    page: number,
    pageSize: number,
    orderBy: string,
    name: string,
    setId: string,
    type: string,
    rarity: string
}

export type GetCardBySearchRes = {
    count: number,
    page: number,
    pageSize: number,
    totalCount: number,
    data: CardDetail[],
}

export type CardDetail = {
    id: string,
    name: string,
    cardmarket: CardMarket,
    set: CardSet,
    images: ImagesCard,
}

export type ImagesCard = {
    large: string,
    small: string,
}

export type CardMarket = {
    prices: CardMarketPrice,
}

export type CardMarketPrice = {
    averageSellPrice: number,
}

export type CardSet = {
    total: number,
}

export type GetTypeRes = {
    data: string[],
}

export type GetRaritiesRes = {
    data: string[],
}

export type GetSetsRes = {
    data: SetDetail[],
}

export type SetDetail = {
    id: string,
    name: string,
}

export type ItemInCart = {
    id: string,
    name: string,
    image: string,
    total: number,
    max: number,
    price: number,
}