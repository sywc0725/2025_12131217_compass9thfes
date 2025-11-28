/** @type {import('tailwindcss').Config} */
export default {
  // 告訴 Tailwind 要掃描哪些檔案來尋找 CSS 類別
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}