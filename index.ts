import https from 'https';

/**
 * идея реализовать всё без использования сторонних библиотек,
 * можно и node-fetch, но интереса нет
 */

interface Comment {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string
}

const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

const getData = <T>(url:string): Promise<T> => {

    return new Promise((resolve, reject) => {

        https.get(url, (res) => {

            let data = ''
    
            res.on('data', (chunk) => {
                data += chunk
            })
    
            res.on('end', () => {
                
                resolve(JSON.parse(data))
    
            })
    
            res.on('error', (error) => {
                
                reject(error)
                
            })
        })
    }) 

  }

// определяю тип в момент вызова, таким образом могу у data и его items смотреть методы и свойства в коде далее

getData<Comment[]>(COMMENTS_URL)
.then(data => { 
    data.forEach(item => {
        console.log(`ID: ${item.id}, Email: ${item.email}`);
    })
});
