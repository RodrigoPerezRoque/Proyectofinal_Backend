const {request, response} = require('express');
const narmodels = require('../models/naruto');
const pool=require('../db');


const listNar = async (req = request, res = response) => {
    let conn; 

    try{
        conn = await pool.getConnection();

    const uchi = await conn.query (narmodels.getAll, (err)=>{
        if(err){
            throw err
        }
    });

    res.json(uchi);
    } catch (error){
        console.log(error);
        res.status(500).json(error);
    } finally{
        if (conn) conn.end();
    }
    
}

const listNarByID = async (req = request, res = response) => {
    
    const { id } = req.params;

    if (isNaN(id)) {
        res.status(400).json({msg: 'Invalid ID'});
        return;
    }

    let conn; 
    try{
        conn = await pool.getConnection();

    const [uchi] = await conn.query (narmodels.getByID, [id], (err)=>{
        if(err){
            throw err
        }
    });

    if (!uchi) {
        res.status(404).json({msg: 'User not foud'});
        return;
    }
    
    
    res.json(uchi);
    } catch (error){
        console.log(error);
        res.status(500).json(error);
    } finally{
        if (conn) conn.end();
    }
}





const adduchi =async(req = request, res= response)=>{
    let conn;
    const {
        Name,
        Gender,
        Clan,
        Village,
        Sharingan,
        Mangekyo_s,
        Amaterasu,
        Susano
    } = req.body;
    if (!Village|| !Clan|| !Name|| !Sharingan || !Mangekyo_s|| !Amaterasu|| !Susano||!Gender){
res.status(400).json({msg:'Missing informarion'});
return;
        }
       

        const naruto= [Name,
            Gender,
            Clan,
            Village,
            Sharingan,
            Mangekyo_s,
            Amaterasu,
            Susano]

       
    
    try {

        conn = await pool.getConnection();
        
        const [Narname] = await conn.query(
            narmodels.getByName,
            [Name],
            (err) => {if (err) throw err;}
        );
        if (Narname){
            res.status(409).json({msg:`Uchiha with name ${Name} already exists`});
            return;
        }
        
        const uchiAdded = await conn.query(narmodels.addRow,[...naruto],(err)=>{

        })
        
        if (uchiAdded.affecteRows === 0) throw new Error ({msg:'Failed to add Uchiha'});
        res.json({msg:'Uchiha add succesfully'});
    }catch(error){
console.log(error);
res.status(500).json(error);
    } finally {
        if (conn) conn.end();
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Update del profe Julio 

const updateNar=async(req = request, res= response)=>{
    const {
        Name,
        Gender,
        Clan,
        Village,
        Sharingan,
        Mangekyo_s,
        Amaterasu,
        Susano 
    } = req.body;

const {id} = req.params;
let newUserData=[
    Name,
        Gender,
        Clan,
        Village,
        Sharingan,
        Mangekyo_s,
        Amaterasu,
        Susano  
];
let conn;
try{
    conn = await pool.getConnection();
const [uchiExists]=await conn.query(
    narmodels.getByID,
    [id],
    (err) => {if (err) throw err;}
);
if (!uchiExists ){
    res.status(404).json({msg:'Uchiha not found'});
    return;
}

const [usernameuchi] = await conn.query(
    narmodels.getByName,
    [Name],
    (err) => {if (err) throw err;}
);
if (usernameuchi){
    res.status(409).json({msg:`Uchiha with Name ${Name} already exists`});
    return;
}


const oldUserData = [
        uchiExists.Name,
        uchiExists.Gender,
        uchiExists.Clan,
        uchiExists.Village,
        uchiExists.Sharingan,
        uchiExists.Mangekyo_s,
        uchiExists.Amaterasu,
        uchiExists.Susano ,
];

newUserData.forEach((uchiData, index)=> {
    if (!uchiData){
        newUserData[index] = oldUserData[index];
    }
})

const uchiUpdate = await conn.query(
    narmodels.updateuchiha,
    [...newUserData, id],
    (err) => {if (err) throw err;}
);
if(uchiUpdate.affecteRows === 0){
    throw new Error ('Uchiha not updated');
}
res.json({msg:'Uchiha updated successfully'})
}catch (error){
        console.log(error);
        res.status(500).json(error);
    } finally{
        if (conn) conn.end();
    }
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const deleteNar = async (req = request, res= response)=>{
    let conn;

    try{
        conn = await pool.getConnection();
        const {id} =req.params;
        const [uchiExists] =await conn.query(
            narmodels.getByID,
            [id],
            (err) => {if (err) throw err;}
        );
        if(!uchiExists){
            res.status(404).json({msg:'Uchiha not Found'});
            return;
        }

        const userDelete = await conn.query(
            narmodels.deleteRow,
            [id],
            (err) => {if(err)throw err;}
        );
        if (userDelete.affecteRows===0){
            throw new Error({msg:'failed to delete Uchiha'})
        };
        res.json({msg:'Uchiha deleted succesfully'});
    }catch(error){
        console.log(error);
        res.status(500).json(error);

    }finally{
       if(conn) conn.end(); 
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////


module.exports={listNar, listNarByID, adduchi, updateNar, deleteNar};