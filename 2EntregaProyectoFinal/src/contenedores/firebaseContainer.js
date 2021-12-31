const admin = require('firebase-admin');
const serviceAccount = require('../db/ecommerce-83400-firebase-adminsdk-uxq0p-a01243f663.json')


admin.initializeApp({
    credential:admin.cert(serviceAccount),
    databaseURL:"ecommerce-83400.firebaseio.com"
})

const db = admin.firestore();
const currentCollection = db.collection('products');

saveOne() = async(object) => {
    try{
        let doc = currentCollection.doc()
        let result= await doc.create(object)
        return {status:"success", message:"creado",payload:result}

    }catch(err){
        return {status:"error", error:error}
    }
}

getAll = async() =>{
    try {
        const data = await currentCollection.get();
        const dataDocs = data.docs;
        const formatted = dataDocs.map(documento=>documento.data())
        return {status:"success",payload:formatted}
    } catch (error) {
        return {status:"error", error:error}
    }
}

getById = async(productoId)=>{
    try {
        const doc = currentCollection.doc(productoId)
        let product = await doc.get();
        return {status:"success",payload:product.data()}
    } catch (error) {
        return {status:"error", error:error}
    }
}

UpdateById = async(productoId,body)=>{
    try {
        const doc = currentCollection.doc(productoId)
        await doc.update(body)
    } catch (error) {
        return {status:"error", error:error}
    }
}

async deleteById(productoId){
    try{
        const doc = currentCollection.doc(productoId)
        await doc.delete();
        }catch{
            return {status:"error", message:"El id del producto es incorrecto"}
        }
    }catch{
        return{status:"error",message: "Error al eliminar el producto"}
    }
}

deleteAll = async() =>{
    try {
         await currentCollection.drop();
    } catch (error) {
        return {status:"error", error:error}
    }
}
}
