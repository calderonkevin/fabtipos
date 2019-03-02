import { Injectable} from '@angular/core';
import { Router, CanActivate} from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class AdminGuard implements CanActivate{
    
    constructor(
        private _router: Router,
        private _loginService: LoginService
        ){}

        canActivate(){
            //let identity = JSON.parse(this._loginService.getIdentity());
            var identity = this._loginService.getIdentity();
            var token = this._loginService.getToken();
            console.log("pintando:");
            console.log(token);
            //console.log(identity.payload);            
            console.log(identity);            
            //let ws = true;
            if(identity != null){
                return true;
            }else{
                this._router.navigate(['/']);
                return false;
            }
            
        }
}