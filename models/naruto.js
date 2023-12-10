const narmodels = {
    getAll: `
    SELECT 
    * 
    FROM 
    uchiha`,

    getByID: `
    SELECT
    *
    FROM
    uchiha
    WHERE
    id= ?
    `,
    addRow:`
    INSERT INTO
    uchiha(
        Name,
        Gender,
        Clan,
        Village,
        Sharingan,
        Mangekyo_s,
        Amaterasu,
        Susano
    )
    VALUES (
        ?,?,?,?,?,?,?,?
    )`,
getByName:`
    SELECT 
    * 
    FROM 
    uchiha 
    WHERE Name =?
    `,

    updateuchiha:`
    UPDATE
    uchiha
    SET
    Name = ?,
    Gender = ?,
    Clan = ?,
    Village = ?,
    Sharingan = ?,
    Mangekyo_s = ?,
    Amaterasu = ?,
    Susano = ?
        WHERE 
        id =?
    `,

    deleteRow:`
    DELETE FROM 
    uchiha
    WHERE 
    id=?
    `,
    
    
}

module.exports=narmodels;