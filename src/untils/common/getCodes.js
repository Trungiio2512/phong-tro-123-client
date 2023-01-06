import { getNumberAreas, getNumberPrices } from "./fn";

export const getCodePrices = (totals, min, max) => {
    const arr = [];
    return totals.map((item) => {
        const arrMaxMin = getNumberPrices(item.value);
        if (arrMaxMin.length === 1) arr.push(+arrMaxMin[0]);

        const arrSort = arr.sort();
        const indexItemSort = arrSort.indexOf(+arrMaxMin[0]);

        return {
            ...item,
            min: indexItemSort === 0 && arrMaxMin.length === 1 ? 0 : +arrMaxMin[0],
            max:
                indexItemSort === 0 && arrMaxMin.length === 1
                    ? +arrMaxMin[0]
                    : indexItemSort === 1 && arrMaxMin.length === 1
                    ? 999999
                    : +arrMaxMin[1],
        };
    });
};
export const getCodeAreas = (totals, min, max) => {
    const arr = [];
    return totals.map((item) => {
        const arrMaxMin = getNumberAreas(item.value);
        if (arrMaxMin.length === 1) arr.push(+arrMaxMin[0]);

        const arrSort = arr.sort();
        const indexItemSort = arrSort.indexOf(+arrMaxMin[0]);

        return {
            ...item,
            min: indexItemSort === 0 && arrMaxMin.length === 1 ? 0 : +arrMaxMin[0],
            max:
                indexItemSort === 0 && arrMaxMin.length === 1
                    ? +arrMaxMin[0]
                    : indexItemSort === 1 && arrMaxMin.length === 1
                    ? 999999
                    : +arrMaxMin[1],
        };
    });
};

export const getCodesPricesNeedFind = (arrMinMax, prices) => {
    const codeMinMax = getCodePrices(prices);
    const resultCode = codeMinMax.filter(
        (item) =>
            (item.min >= +arrMinMax[0] && item.min <= +arrMinMax[1]) ||
            (item.max >= +arrMinMax[0] && item.max <= +arrMinMax[1]),
    );
    return resultCode;
};

export const getCodesAreasNeedFind = (arrMinMax, areas) => {
    const codeMinMax = getCodeAreas(areas);

    const resultCode = codeMinMax.filter(
        (item) =>
            (item.min >= +arrMinMax[0] && item.min <= +arrMinMax[1]) ||
            (item.max >= +arrMinMax[0] && item.max <= +arrMinMax[1]),
    );
    return resultCode;
};
