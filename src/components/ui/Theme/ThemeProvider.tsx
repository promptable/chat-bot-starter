import { themeAtom } from "@components/ui/Theme/ThemeSelect";
import { useAtom } from "jotai";

export default function ThemeProvider(props: { children: React.ReactNode }) {
  const [theme, setTheme] = useAtom(themeAtom);

  return (
    <div data-theme={theme} className="h-full">
      {props.children}
    </div>
  );
}
