import { createContext, useContext, useState, useMemo, useEffect, ReactNode, Dispatch, SetStateAction } from "react";
import { ConfigProvider, theme } from "antd";
import enUS from "antd/lib/locale/en_US";
import jaJP from "antd/lib/locale/ja_JP";
import { useTranslation } from "react-i18next";
import { getCookie } from "@/components/webapp/scripts/Server/Cookie";
import DarkClick from "@/components/webapp/scripts/Data/DarkClick";

type ThemeContextType = {
    primaryColor: string;
    isDarkMode: boolean;
    setIsDarkMode: Dispatch<SetStateAction<boolean>>;
    localeLang: typeof jaJP | typeof enUS;
    setLocaleLang: Dispatch<SetStateAction<typeof jaJP | typeof enUS>>;
    isPerformanceMode: boolean;
    setIsPerformanceMode: Dispatch<SetStateAction<boolean>>;
};

type ThemeProviderProps = {
    children: ReactNode;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const { i18n } = useTranslation();
    const primaryColor = "#1f1f1f"; 
    const { defaultAlgorithm, darkAlgorithm } = theme;
    
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isPerformanceMode, setIsPerformanceMode] = useState(true);
    const [localeLang, setLocaleLang] = useState(i18n.languages[0] == "ja" ? jaJP : enUS);

    useEffect(() => {
        const root = document.querySelector(".webapp-root") as HTMLElement || document.querySelector(":root") as HTMLElement;
        
        if (getCookie("dark") === "true") {
            setTimeout(() => {
                setIsDarkMode(true);
                DarkClick(true);
            }, 0);
        }

        if (root) {
            root.style.setProperty("--main-color", primaryColor);
        }
    }, []);

    const themeValue = useMemo(
        () => ({
            primaryColor,
            isDarkMode,
            setIsDarkMode,
            localeLang,
            setLocaleLang,
            isPerformanceMode,
            setIsPerformanceMode,
        }),
        [isDarkMode, localeLang, isPerformanceMode]
    );

    return (
        <ThemeContext.Provider value={themeValue}>
            <ConfigProvider
                locale={localeLang}
                theme={{
                    algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
                    token: {
                        colorPrimary: primaryColor,
                        colorInfo: primaryColor,
                    },
                    components: {
                        Select: {
                            optionSelectedColor: "#ffffff",
                            optionSelectedBg: "#1f1f1f",
                        },
                    },
                }}
            >
                {children}
            </ConfigProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
