import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Recipe } from '../interfaces/recipe.interface';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RecipeService {
    private _recipeRef: AngularFirestoreCollection;
    constructor(private firebaseStore: AngularFireStorage, private readonly db: AngularFirestore) {
        this._recipeRef = this.db.collection('Recipe');
    }
    uploadImage(file: File) {
        const filePath = '/recipes/' + this._getRamdomId() + file.name;
        const ref = this.firebaseStore.ref(filePath);
        return ref.put(file);

    }
    private _getRamdomId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    addRecipe(recipe: Recipe, file?: File) {
        if (file) {
            return this.uploadImage(file).then(e => {
                console.log(e);
                this._recipeRef.add({
                    Recipe: recipe.recipe,
                    Ingradients: recipe.ingradients,
                    ImgUrl: e.metadata.fullPath || '',
                    UserId: recipe.userId || '',
                });
            })
        }
        return this._recipeRef.add({
            Recipe: recipe.recipe,
            Ingradients: recipe.ingradients,
            ImgUrl: recipe.imgUrl || '',
            UserId: recipe.userId || '',
        });
    }
    getReceipByUserId(userId: string) {
        return this.db.collection('Recipe', res => res.where('UserId', '==', userId))
            .snapshotChanges().pipe(map((list: DocumentChangeAction<object>[]) => {
                return list.map((item) => {
                    const id = item.payload.doc.id;
                    return { id, ...item.payload.doc.data() } as any;
                })
            }), shareReplay(1));
    }
    getImageUrl(path: string) {
        const ref = this.firebaseStore.ref(path);
        return ref.getDownloadURL();
    }
}