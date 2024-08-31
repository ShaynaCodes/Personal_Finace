function budget(){
    var income = document.getElementById("budget").value;
    let save; let fun; let needs;
    if(isNaN(income)){
        window.alert("This is not a number. Try again")
    }
    save = income * .20
    fun = income * .30
    needs = income * .50 
    console.log( save, fun, needs)
}

function confirm_password(){
    var password = document.getElementById('password')
    var c_password= document.getElementById('cpassword')

    if(password.value != c_password.value){
        c_password.setCustomValidity("Passwords Don't Match");
        return false;
    }else{
        c_password.setCustomValidity('');
    }
}
