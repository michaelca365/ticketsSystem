export const randomUser = (users: {id: string}[])=>{
    const arrayLength = users.length;
    const randomNumber = Math.floor(Math.random() * arrayLength)
    return users[randomNumber];
}