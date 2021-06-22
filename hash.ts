import * as bcrypt from 'bcrypt'
const salt_rounds = 5

export async function hashPassword(userPassword:string){
    const hash=bcrypt.hash(userPassword,salt_rounds)
    return hash
}
export async function checkPassword(
    userPassword:string,
    hashPassword:string){
        const match = await bcrypt.compare(userPassword,hashPassword)
        return match
}