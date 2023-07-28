import express from 'express'

import postgresClient from '../config/db.js'

const router = express.Router()

// Create user
router.post('/', async (req, res) => {
    try {
        const text = "INSERT INTO users (email, password, fullname) VALUES ($1, crypt($2, gen_salt('bf')), $3) RETURNING *"

        const values = [req.body.email, req.body.password, req.body.fullname]

        const { rows } = await postgresClient.query(text, values)

        return res.status(201).json({ createdUser: rows[0] })
    } catch (error) {
        console.log('Error occured', error.message)
        return res.status(400).json({ message: error. message })
    }
})

// Authenticate user
router.post('/login', async (req, res) => {
    try {
        console.log("1router.postcelebi memet");


        const text = "SELECT * FROM users WHERE email = $1 AND password =$2"

        const values = [req.body.email, req.body.password]

        const { rows } = await postgresClient.query(text, values)
        if(!rows.length){
            console.log("celebi memet");
            return res.status(401).json({ message: 'User not found.' })

        }
            
            // res.setHeader("Access-Control-Allow-Origin", "*")
        return res.status(200).json({ message: 'Authentication successful.' })
    } catch (error) {
        console.log('Error occured', error.message)
        return res.status(400).json({ message: error.message })   
    

    }
})

// Update user
router.put('/update/:userId', async (req, res) => {
    try {
        const { userId } = req.params

        const text = "UPDATE users SET email = $1, fullname = $2 WHERE id = $3 RETURNING *"

        const values = [req.body.email, req.body.fullname, userId]

        const { rows } = await postgresClient.query(text, values)
        if(!rows.length)
            return res.status(404).json({ message: 'User not found.' })

        return res.status(200).json({ updatedUser: rows[0] })
    } catch (error) {
        console.log('Error occured', error.message)
        return res.status(400).json({ message: error.message })   
    }
})

// Delete user
router.delete('/:userId', async (req, res) => { //Bu satır, Express Router'ının bir DELETE isteği için yeni bir endpoint oluşturduğunu belirtir. Endpoint, /:userId yolu üzerinden dinlenir, bu da kullanıcının ID'sini istek URL'sinin bir parçası olarak alacağı anlamına gelir.
    try {
        const { userId } = req.params //Kullanıcının ID'sini istek parametrelerinden alır. Endpoint, DELETE /users/:userId şeklinde olacak ve kullanıcı ID'si userId değişkenine atanır.

        const text = "DELETE FROM users WHERE id = $1 RETURNING *" // Bu, PostgreSQL sorgusunu tanımlar. Sorgu, "users" tablosundan, belirtilen kullanıcı ID'sine sahip kullanıcıyı siler ve silinen kullanıcının tüm alanlarını (RETURNING *) geri döner.

        const values = [userId] // Bu, PostgreSQL sorgusunu tanımlar. Sorgu, "users" tablosundan, belirtilen kullanıcı ID'sine sahip kullanıcıyı siler ve silinen kullanıcının tüm alanlarını (RETURNING *) geri döner.

        const { rows } = await postgresClient.query(text, values) //PostgreSQL veritabanına bağlanmak için kullanılan bir postgresClient nesnesi tarafından veritabanına sorguyu gönderir. Sonuçlar rows değişkenine atanır. await ifadesi, sorgunun tamamlanmasını beklemek için kullanılır, çünkü postgresClient.query asenkron bir işlevdir.
        if(!rows.length)
            return res.status(404).json({ message: 'User not found.' }) // Sorgu sonuçlarından dönen rows dizisinin uzunluğunu kontrol eder. Eğer dizide herhangi bir satır yoksa, yani kullanıcı veritabanında bulunamamışsa, 404 HTTP durum kodu ile "User not found." mesajını içeren bir JSON yanıtı döner.

        return res.status(200).json({ deletedUser: rows[0] }) //Eğer kullanıcı bulunursa, 200 HTTP durum kodu ile kullanıcının silinen verilerini içeren bir JSON yanıtı döner. Sorgu sonuçlarının ilk satırı (silinen kullanıcı) rows[0] ile elde edilir.
    } catch (error) { //: Kodda herhangi bir hata oluşursa, yakalanır ve hata mesajı 400 HTTP durum kodu ile JSON yanıtı olarak döner.
        console.log('Error occured', error.message)
        return res.status(400).json({ message: error.message })   
    }
})
 //Kod, kullanıcının ID'sini alarak veritabanından ilgili kullanıcıyı siler ve sonucu bir JSON yanıtı olarak döner. 
 //Ayrıca, kullanıcının bulunamaması veya başka bir hata durumunda uygun hata yanıtlarını döndürür.
// Get users
router.get('/', async (req, res) => {
    try {
        const text = "SELECT * FROM users ORDER BY id ASC"

        const { rows } = await postgresClient.query(text)

        return res.status(200).json(rows)
    } catch (error) {
        console.log('Error occured', error.message)
        return res.status(400).json({ message: error.message })   
    }
})
// get users/ıd
router.get('/:userId', async (req,res)=>{  
    try {
        const { userId } = req.params
        const text =`SELECT *FROM users WHERE id= ${userId}`
        //const values = [userId];
        const { rows } = await postgresClient.query(text);
        console.log(rows);
        return res.status(200).json(rows)
        
    } catch (error)
     {

        console.log('Error occured', error.message)
        return res.status(400).json({ message: error.message }) 
        
    }



})






















export default router