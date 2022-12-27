import { themeAtom } from "@components/ui/Theme/ThemeSelect";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export default function ThemeProvider(props: { children: React.ReactNode }) {
  const [theme, setTheme] = useAtom(themeAtom);

  // https://jotai.org/docs/utils/atom-with-storage#server-side-rendering
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <div data-theme={theme} className="h-full">
      {props.children}
    </div>
  );
}
