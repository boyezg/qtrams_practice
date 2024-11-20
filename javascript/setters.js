let user={
    firstname:"boyez",
    lastname:"gollapalli",


get nickName(){
    return `${this.firstname} ${this.lastname}`;
},

set nickName(value){
    [this.firstname, this.lastname]= value.split(" ");
    
}
    
};

console.log(user.firstname);
console.log(user.lastname);
