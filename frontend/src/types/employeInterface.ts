export interface statusType {
    marie    : boolean,
    parent  : boolean  
}

export interface Employe {
    _id     ?:   string,  
    nom    :string,
    prenom :string,
    email :string,
    date_naissance :string,
    sexe : string,
    status  : statusType,
    photos ?: File | null

}
