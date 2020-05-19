import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { UserDetail } from './user-detail.mode';

@Injectable({
  providedIn: 'root',
})
export class UserDetailService {
  db = firebase.firestore();
  constructor(private firestore: AngularFirestore) {}

  private dbPath = '/userDetails';

  getUserDetails() {
    return this.firestore.collection('userDetails').snapshotChanges();
  }

  createUserDetails(userDetail: UserDetail, uid: string) {
    return this.firestore
      .collection('userDetails')
      .doc(uid)
      .set(userDetail)

      .then((result) => {
        console.log('You have been successfully logged in!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateUserDetails(userDetail: UserDetail) {
    delete userDetail.email;
    this.firestore.doc('userDetails/' + userDetail.email).update(userDetail);
  }

  getUser(uid) {
    return this.firestore.collection('userDetails').doc(uid).get();
  }
}
