//bir Express.js uygulamasını ve PostgreSQL veritabanı bağlantısını yapılandıran temel bir yapıya sahip.
import express from 'express' // Express.js uygulama çerçevesini projeye dahil eder. "express" modülü, web sunucusu ve yönlendirme işlemleri için kullanılan ana modüldür.

import postgresClient from './config/db.js' //: Bu satır, projenin "/config/db.js" dosyasından PostgreSQL veritabanı istemcisini (postgresClient) içe aktarır. Veritabanına bağlantı sağlamak için kullanılacak.

import userRouter from './routers/userRouter.js'//Bu, "/users" yolu altındaki kullanıcılarla ilgili tüm istekleri ele alacak.

import cors from 'cors' //Bu satır, Cross-Origin Resource Sharing (CORS) desteği için "cors" modülünü içe aktarır. CORS, istemcilerin farklı bir kök alanından gelen kaynaklara erişimini kontrol etmek için kullanılır

const app = express() // Express uygulamasını oluşturur.
app.use(express.json()) // Express'in yerleşik bir ara yazılım olan express.json() işlevini kullanarak gelen istekleri JSON verilerini işlemek için kullanır. Bu sayede gelen JSON verilerini kolayca okuyabilir ve kullanabilirsiniz.

// const corsOptions ={
//     origin:'http://localhost:3000',
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }

// app.use(function(req, res) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
    
// });

app.use(cors()); // CORS desteği için ara yazılımı kullanır. Bu, tüm istemcilere izin veren varsayılan ayarlarla CORS'ü etkinleştirir. Bu, herhangi bir istemcinin sunucuya erişimine izin verir.


app.use('/users', userRouter) //

const PORT = process.env.PORT || 5000 //Uygulamanın dinleyeceği port numarasını belirler. Port numarası öncelikle process.env.PORT çevresel değişkeninden alınır. Eğer çevresel değişken belirtilmemişse, 5000 numaralı port kullanılır.

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`) //Uygulamayı belirtilen port üzerinde dinlemeye başlar. Dinlemeye başladığında konsola ilgili mesajları yazdırır ve PostgreSQL veritabanına bağlanmayı dener.
    postgresClient.connect(err => { //PostgreSQL veritabanına bağlanmayı dener. connect işlevi, bir hata oluştuğunda veya bağlantı başarılı olduğunda geri çağrılır ve duruma göre konsola ilgili mesajları yazdırır.
        if(err) {
            console.log('connection error', err.stack)
        }else {
            console.log('db connection successful')
        }
    })
})
 //Bu kod, belirli bir yol altında gelen istekleri ele alarak PostgreSQL veritabanına bağlanan basit bir Express.js API'sini temsil eder. 
 //"userRouter.js" dosyasında "/users" yolu altındaki istekleri işlemek üzere tanımlanmış yönlendirici işlevleri bulunmalıdır.
 // Bu işlevler, veritabanında kullanıcıları oluşturmak,
 // güncellemek, silmek veya sorgulamak için gerekli PostgreSQL sorgularını içermelidir.