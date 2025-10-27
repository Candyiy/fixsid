import { Router,CanActivateFn } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService1 } from "../../services/auth/auth-service1";

export const authGuard: CanActivateFn=()=>{
    const auth=inject(AuthService1);
    const router=inject(Router);

    if(auth.isLoggedIn()){
        return true;
    }
    router.navigate(['/']);
    return false;

}