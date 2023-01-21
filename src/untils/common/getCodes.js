import { getNumberAreas, getNumberPrices } from "./fn";

export const getCodePrices = (totals, min, max) => {
    return totals?.map((item) => {
        const arrMaxMin = getNumberPrices(item.value);

        return {
            ...item,
            min: arrMaxMin.length === 2 ? +arrMaxMin[0] : +arrMaxMin[0] === min ? 0 : +arrMaxMin[0],
            max:
                arrMaxMin.length === 2
                    ? +arrMaxMin[1]
                    : +arrMaxMin[0] === max
                    ? 999999
                    : +arrMaxMin[0],
        };
    });
};
export const getCodeAreas = (totals, min, max) => {
    return totals?.map((item) => {
        const arrMaxMin = getNumberAreas(item.value);
        return {
            ...item,
            min: arrMaxMin.length === 2 ? +arrMaxMin[0] : +arrMaxMin[0] < max ? 0 : +arrMaxMin[0],
            max:
                arrMaxMin.length === 2
                    ? +arrMaxMin[1]
                    : +arrMaxMin[0] === max
                    ? 999999
                    : +arrMaxMin[0],
        };
    });
};

export const getCodesPricesNeedFind = (prices, entry, min, max) => {
    const codeMinMax = getCodePrices(prices, min, max);
    const resultCode = codeMinMax.find((item) => item.min <= entry && item.max > entry);
    return resultCode;
};

export const getCodesAreasNeedFind = (areas, entry, min, max) => {
    const codeMinMax = getCodeAreas(areas, min, max);
    const resultCode = codeMinMax.find((item) => item.min <= entry && item.max > entry);
    return resultCode;
};
