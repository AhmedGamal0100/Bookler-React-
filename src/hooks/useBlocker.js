import { useEffect, useContext } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";

export function useBlocker(blocker, when = true) {
    const { navigator } = useContext(NavigationContext);

    useEffect(() => {
        if (!when) return;

        const originalPush = navigator.push;
        const originalReplace = navigator.replace;

        navigator.push = (...args) => {
            if (!blocker()) {
                return;
            }
            originalPush(...args);
        };

        navigator.replace = (...args) => {
            if (!blocker()) {
                return;
            }
            originalReplace(...args);
        };

        return () => {
            navigator.push = originalPush;
            navigator.replace = originalReplace;
        };
    }, [navigator, blocker, when]);
}