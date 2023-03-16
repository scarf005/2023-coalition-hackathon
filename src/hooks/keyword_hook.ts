import fs from "fs"

// 디렉토리에서 파일의 목록을 가져오는 함수, 키워드 체크용
function getFilesInDirectory(path: string): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(path, (error, files) => {
      if (error) {
        reject(error);
      } else {
        resolve(files);
      }
    });
  });
}

// 위 함수 핸들러?
async function readDirHandler(path: string): Promise<string[]> {
	try {
		const contents: string[] = await getFilesInDirectory(path)
		return contents
	} catch(err) {
		console.error('Faile to read File', err)
		return []
	}	
}

//  키워드를 받아서 "42docs/keyword.txt"로 파일을 참조하여 내용을 반환하는 함수
async function readFileAsync(keyword: string): Promise<string> {
	const path: string = './42docs/'.concat(keyword, '.txt')
	return new Promise((resolve, reject) => {
		fs.readFile(path, 'utf8', (err, data)=>{
			if (err) {
				reject(err)
			} else {
				resolve(data)
			}
		})
	})
}

// 위 함수 핸들러
async function loadShortDesc(keyword: string): Promise<string> {
	try {
		const contents = await readFileAsync(keyword)
		return contents
	} catch(err) {
		return 'Not Found Keyword!!'
	}	
}
