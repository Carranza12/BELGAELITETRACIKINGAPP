import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public sesionIsStart:boolean;

  constructor(){
    this.sesionIsStart = false
  }
  startSesion(){
    this.sesionIsStart = true
  }

  endSesion(){
    this.sesionIsStart = false
  }
}
