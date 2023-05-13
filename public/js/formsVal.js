class validateForm{
    constructor(form,fields){
        this.form=form;
        this.fields=fields;
    }
    initialize(){
        this.validateOnSubmit();
        return true;
    }
    validateOnSubmit(){
        let self=this;
        this.form.addEventListener('submit',Event=>{
           // Event.preventDefault();
            self.fields.forEach(fields=>{
            const input=document.querySelector(`#${fields}`);
            self.validateFields(input);
             })
        })
    }
    validateFields(field){
        if(field.value.length==0){
            this.setStatus(field, field.previousElementSibling.innerText + ' cannot be blank',"error");
        }
        else if(field.type ==="email"){
            const re=/\S+@\S+\.\S+/;
            if(re.test(field.value)){
             this.setStatus(field,null,"success");
            }
            else{
             this.setStatus(field,"Please enter valid email address","error");
            }
         }
        else if(field.id==="username" || field.id==="uname"){
            var letters = /^[A-Za-z]+$/;
            if(!field.value.match(letters))
                this.setStatus(field,"Must enter letters only","error");
            else
                this.setStatus(field,null,"success");

         }
        else if(field.id==="password_confirmation"){
            const passwordField=this.form.querySelector('#password');
            if(field.value.trim()==""){
                this.setStatus(field,"Password confirmation required","error");
            }
            else if(field.value!=passwordField.value){
                this.setStatus(field,"Passwords don't match","error");
            }
            else{
                this.setStatus(field,null,"success");
            }
        }
        else if(field.type === "number"){
            const x =/^[0-9]+$/;
            if(x.test(field.value)){
                this.setStatus(field,null,"success");
            }
            else{
                this.setStatus(field,"Please enter numbers only", "error");
            }
        }
        else{
            this.setStatus(field,null,"success");
        }
    }


    setStatus(field,message,status){
        const errorMessage=field.parentElement.querySelector('.error-message');
        if(status==="success"){
            if(errorMessage){
                errorMessage.innerText="";
            }
            field.classList.remove('input-error');
        }
        if(status==="error"){
            field.parentElement.querySelector('.error-message').innerText=message;
            field.classList.add('input-error');
        }
    }
}


/*const form=document.querySelector('.form');
const fields=["uname","femail","number","password","password_confirmation"];
const validator=new validateForm(form,fields);
validator.initialize();*/

const form1=document.querySelector('.sform');
const fields1=["username","password1"];
const signin =new validateForm(form1,fields1);
signin.initialize();

/*const form2=document.querySelector('.form');
const fields=["uname","femail","number","password","password-confirmation"];
const adminAddUser = new validateForm(form2,fields);
adminAddUser.initialize();*/