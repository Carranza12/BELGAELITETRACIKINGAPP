import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public alumnos = this.initAlumnos()
  constructor(public db: AngularFirestore) {}

  public addDocument(
    collection: string,
    data: any
  ): Promise<any> {
    return this.db.collection(collection).add(data);
  }
  
  public async initAlumnos(){
    return await this.getDocuments('alumnos',{})
  }

  public removeDocument(
    collection: string,
    id: string
  ): Promise<any> {
    return this.db.collection(collection).doc(id).delete();
  }

  public addDocumentWithID(
    collection: string,
    data: any,
    id: any
  ): Promise<any> {
    return this.db.collection(collection).doc(id).set(data);
  }

  public async getDocument(collection: string, id: string): Promise<any> {
    let doc: any = await this.db.collection(collection).doc(id).ref.get();
    if (!doc.exists) {
      throw 'No se encontro elemento';
    }
    return {
      ...doc.data(),
      id: doc.id,
    };
  }

  public async getRef(collection: string, query: any): Promise<any[]> {
    try {
      const filters = query.filters || [];
      const sort = query.sort;
      let ref: any = this.db.collection(collection).ref;
      filters.forEach((q: any) => {
        ref = ref.where(q.attr, q.operation, q.value);
      });
      if (sort) {
        if (sort.attr) {
          ref = ref.orderBy(sort.attr, sort.asc ? 'asc' : 'desc');
        }
        if (sort.limit > 0) {
          ref = ref.limit(sort.limit);
        }
      }
      return ref;
    } catch (error) {
      console.error('error: ', error);
      return [];
    }
  }

  public async getDocuments(collection: string, query: any): Promise<any[]> {
    try {
      const filters = query.filters || [];
      const sort = query.sort;
      let ref: any = this.db.collection(collection).ref//.limit(20);
      filters.forEach((q: any) => {
        ref = ref.where(q.attr, q.operation, q.value);
      });
      if (sort) {
        if (sort.attr) {
          ref = ref.orderBy(sort.attr, sort.asc ? 'asc' : 'desc');
        }
        if (sort.limit > 0) {
          ref = ref.limit(sort.limit);
        }
      }
      let res = await ref.get();
      if (res.empty) {
        return [];
      }
      const docs = res.docs;
      let data = docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return data;
    } catch (error) {
      console.error('error: ', error);
      return [];
    }
  }

  public updateDocument(
    collection: string,
    data: any,
    id: string
  ): Promise<void> {
    return this.db.collection(collection).doc(id).set(data, { merge: true });
  }

  public getCollectionRef(collection: any) {
    return this.db.collection(collection).ref;
  }
}

