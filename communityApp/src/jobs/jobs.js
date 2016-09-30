export class Jobs {
    canActivate(){
        var promise = new Promise((resolve) =>{
            setTimeout(_ => { resolve(false); });
        });
        return promise;
    }
}
