import { useCallback, useState } from "react";
import { useHistory } from "react-router";

type IQueryPage = string | string[] | null;

export const usePage = (
    page: IQueryPage,
): [number, (newPage: number) => void] => {
    const initialPage = page ? Number(page) : 1;
    const history = useHistory();
    const [state, setState] = useState(Number(initialPage));
    const setPage = useCallback((newPage: number) => {
        setState(newPage);
        history.push(`${history.location.pathname}?page=${newPage}`);
    }, []);

    return [state, setPage];
};
