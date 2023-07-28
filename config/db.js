import pg from 'pg' // "pg" modülü, Node.js uygulamalarında PostgreSQL veritabanına erişim sağlamak için kullanılan resmi PostgreSQL istemcisi ve sürücüsüdür.
import dotenv from 'dotenv' // "dotenv" modülü, projenin kök dizininde yer alan ".env" dosyasından çevresel değişkenleri yüklemek için kullanılır. Bu, gizli verileri (örneğin, veritabanı bağlantı bilgileri gibi) proje kodu içine gömmek yerine dışarıdan almanızı sağlar.

dotenv.config() //Bu satır, ".env" dosyasından çevresel değişkenleri yüklemeyi başlatır. ".env" dosyası, projenin kök dizininde yer almalı ve içinde çevresel değişkenlerin tanımlandığı bir liste olmalıdır.

const postgresClient = new pg.Pool({ // PostgreSQL veritabanı için bir havuz (pool) oluşturur. Havuz, veritabanı bağlantılarını yönetmek için kullanılır ve performansı artırmak için tekrar tekrar bağlantı açılıp kapatmak yerine var olan bağlantıları yeniden kullanır.
    connectionString: process.env.DB_CONNECTION_STRING  //PostgreSQL veritabanına bağlanmak için kullanılan bağlantı dizesini belirtir. Bu bağlantı dizesi, ".env" dosyasında DB_CONNECTION_STRING adı altında tanımlanmış bir çevresel değişken içermelidir. Bu şekilde, gerçek veritabanı bağlantı bilgilerini proje kodundan ayırabilirsiniz.
})

export default postgresClient
//Özetle, bu kod, PostgreSQL veritabanına bağlanmak için kullanılan bir istemci oluşturur
// ve veritabanı bağlantı dizesini ".env" dosyasından alır.
 // Bu sayede, veritabanı bağlantı bilgilerini proje kodundan ayrı tutabilir ve güvenliğinizi artırabilirsiniz.