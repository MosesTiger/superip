import * as XLSX from "xlsx";

// xlsx 파일을 읽어서 JSON으로 변환하는 함수
export const readXlsxFile = async () => {
  try {
    // public 폴더의 movies.xlsx 파일을 읽음
    const response = await fetch("/한국영화top500.xlsx"); // 파일 경로
    const arrayBuffer = await response.arrayBuffer(); // 데이터를 ArrayBuffer로 변환
    const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: "array" }); // xlsx 파일 읽기
    const sheetName = workbook.SheetNames[0]; // 첫 번째 시트 사용
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet); // 시트를 JSON으로 변환

    return jsonData; // JSON 데이터 반환
  } catch (error) {
    console.error("Error reading XLSX file:", error);
    return null;
  }
};
