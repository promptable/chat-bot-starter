import { themeAtom } from "@components/ui/Theme/ThemeSelect";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function ThemeProvider(props: { children: React.ReactNode }) {
  const [theme, setTheme] = useAtom(themeAtom);

  useEffect(() => {
    // on mount
    if (!theme) {
      const cachedTheme = localStorage.getItem("theme");
      if (!cachedTheme) {
        localStorage.setItem("theme", theme || "light");
      } else {
        setTheme(cachedTheme);
      }
    } else {
      // theme changed
      localStorage.setItem("theme", theme || "light");
    }
  }, [theme, setTheme]);

  // todo: find a way to remove the flash or add loading state
  if (!theme) {
    return null;
  }
  return (
    <div data-theme={theme} className="h-full">
      {props.children}
    </div>
  );
}
