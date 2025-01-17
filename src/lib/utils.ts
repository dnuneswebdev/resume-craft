import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import colors from "tailwindcss/colors";
import tailwindConfig from "../../tailwind.config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sectionIsEmpty = (
  section: ResumeSections,
  data: ResumeContentData
) => {
  switch (section) {
    case "summary":
      return data.summary === "" || data.summary === "<p></p>";
    default:
      return data[section].length === 0;
  }
};

export const formatTailwindHTML = (
  html: string,
  structure: ResumeStructureData
) => {
  const colorKey = structure.colorTheme as keyof typeof colors;
  //isso aqui serve pra pegar as config do tailwind e aplicar as cores na hora de exportar o PDF
  return `
    <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
          tailwind.config = ${JSON.stringify(tailwindConfig)};
          document.documentElement.style.setProperty(
            "--resume-primary",
            "${colors[colorKey][500]}"
          );
        </script>
      </head>

      <body>
        ${html}
      </body>
    </html>
  `;
};

export const isValidJSON = (jsonString: string): boolean => {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
};
