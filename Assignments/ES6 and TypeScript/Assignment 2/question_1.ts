class Fibo{
    private previousNo : number = 0;
    private currentNo : number = 1;
    private res : number = 0;
    private count : number = 0;

    next(){
        if(this.count===0)
        {
            console.log(this.previousNo);
            this.count++;
        }
        else if(this.count===1)
        {
            console.log(this.currentNo);
            this.count++;
        }
        else
        {
            this.res=this.previousNo+this.currentNo;
            console.log(this.res);
            this.previousNo=this.currentNo;
            this.currentNo=this.res;
            this.count++;
        }
    }

}

let fiboObj=new Fibo();
fiboObj.next();
fiboObj.next();
fiboObj.next();
fiboObj.next();
fiboObj.next();
fiboObj.next();
fiboObj.next();
fiboObj.next();
fiboObj.next();
fiboObj.next();
fiboObj.next();