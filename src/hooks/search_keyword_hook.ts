/** "documentList[]"에서 원하는 "keyword"의 "content"를 읽는 함수
 * 
 * @returns "keyword"에 해당하는 내용
 * @error []빈 문자열 출력
 */

type Doc = {
    keywords: string[],
    contents: string[]
}

const getTextInDoc = async (
    keyword: string,
    document: Doc[]
    ): Promise<string[]> => {
      const matchingDocs = document.filter((Doc) => Doc.keywords.includes(keyword));
      const contentPromises = matchingDocs.map(async (Doc: Doc) => Doc.contents.join(" "));

      return  await Promise.all(contentPromises);
    }


  export const searchDocKeyword = async (keywrod: string, documentList:Doc[]): Promise<string> => {
      return (await getTextInDoc(keywrod, documentList)).join(" ")
  }