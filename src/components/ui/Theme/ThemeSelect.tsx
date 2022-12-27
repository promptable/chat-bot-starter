import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const themeAtom = atomWithStorage<string>("theme", "light");

const daisyUIThemes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];

export default function ThemeSelect() {
  // Jotai state. It's like global useState <3
  const [theme, setTheme] = useAtom(themeAtom);

  return (
    <select
      defaultValue={theme}
      className="daisy-select daisy-select-sm max-w-xs py-0 hover:bg-base-300"
      onChange={(e) => {
        setTheme(e.currentTarget.value);
      }}
    >
      {daisyUIThemes.map((name: string) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
}
