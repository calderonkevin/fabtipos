import { Component , OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { GLOBAL } from '../common/services/global';
import { LoginService } from '../common/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
  
})
export class LoginComponent implements OnInit  {    
    title:string;
    emailForm:string;
    pwdForm:string;
    codError:number;
    msgError:string;
    status:string;
            
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _loginService: LoginService
    ){
        this.title = "Identificate";
        this.emailForm = "demo@mix.com";
        this.pwdForm = "123";
        //this.emailForm = "";
        //this.pwdForm = "";
        this.codError = -999;
        this.msgError = "";
    } 
    
    ngOnInit(){
        
        console.log("login.component  cargado!!");        
    }

    onSubmit():void{
        console.log("entrando a validar");
        this.codError = -999;

  /*      this._loginService.singup(this.emailForm, this.pwdForm).subscribe(
            response => {
                console.log(response);
                this.codError = response.code;
                this.msgError = response.msg; 
      
            },
            error => {
                console.log(<any>error);
                //console.log("error 454545.");
                var errorMessage = <any>error;
                if (errorMessage != null){
                    var body = JSON.parse(error._body);
                    
                }
            })

            */



        this._loginService.singup(this.emailForm, this.pwdForm).subscribe(
            response => {
                console.log(response);
                this.codError = response.code;
                this.msgError = response.msg;
                if(this.codError == 1){
                    this.status = "success";
                    localStorage.setItem('identity', JSON.stringify(response.data));
                    localStorage.setItem('token', JSON.stringify(response.token));
                    localStorage.setItem('datadef', JSON.stringify(response.datadef));
                    this._router.navigate(['/catalogo']);                    
                }else{
                    this.status = "danger";
                }

            },
            error => {
                console.log(<any>error);
                //console.log("error 454545.");
                var errorMessage = <any>error;
                if (errorMessage != null){
                    var body = JSON.parse(error._body);
                    this.codError = -1;
                }
            }
        )
        

    }   
    
 }
