import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "redux/actions/_config";
import { IRootState } from "redux/reducers";
import { ILanguage } from "common/formatTypes";
import i18n, { languages } from "language";

const LanguageModifier: React.FC = () => {
    const {
        _config: { language = "vi" },
    } = useSelector((state: IRootState) => state);

    const dispatch = useDispatch();

    const changeStateLanguage = (lng: ILanguage) => {
        i18n.changeLanguage(lng);
        dispatch(setLanguage(lng));
    };

    return (
        <div className="flex flex-row">
            {languages.map(({ name }, index) => {
                const textColor =
                    name === language ? "text-black" : "text-body";
                return (
                    <Fragment key={name}>
                        <p
                            className={`uppercase text-lg font-bold cursor-pointer ${textColor}`}
                            onClick={() =>
                                changeStateLanguage(name as ILanguage)
                            }
                        >
                            {name}
                        </p>
                        {index !== language.length - 1 && (
                            <p className="px-1">|</p>
                        )}
                    </Fragment>
                );
            })}
        </div>
    );
};

export default LanguageModifier;
