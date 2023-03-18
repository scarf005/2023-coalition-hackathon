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