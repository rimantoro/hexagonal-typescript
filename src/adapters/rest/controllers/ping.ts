export default function pingFactory(){
    return async function ping(req: any, res: any, next: any){
        res.status(200).json('pong');
    }
}