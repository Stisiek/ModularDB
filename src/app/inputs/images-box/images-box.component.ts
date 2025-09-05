import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImageSlaveComponent } from "../../slaves/image-slave/image-slave.component";
import { NgForOf, NgIf } from '@angular/common';


@Component({
  selector: 'app-images-box',
  imports: [FormsModule, ImageSlaveComponent, NgForOf, NgIf],
  templateUrl: './images-box.component.html',
  styleUrl: './images-box.component.css'
})
export class ImagesBoxComponent {
  isBeingCreated: boolean = false;
  titleValue: string = 'Nagłówek zdjęcia';
  images: any = [];
  selectedFiles: File[] = [];
  selectedImage: number = 1;
  numberOfImages: number = 0;
  currentPhoto: any = null;

  addImage(value: any) {
    this.images = [];
    for (let item in value.target.files) {
      let val = value.target.files[item];
      if (val.name === undefined) break;
      this.images.push(val);
    }
  }

  onImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;

    for(let i = 0; i < input.files!.length; i++) {
      const file = input.files?.[i];
    
      if (file === undefined) break;
      if (!file) return;
    
      if (!file.type.startsWith('image/')) {
        alert('Proszę wybrać plik graficzny!');
        input.value = '';
        return;
      }
    
      this.selectedFiles.push(file);
    
      // Utworzenie podglądu
      const reader = new FileReader();
      reader.onload = (e) => {
        this.images.push(e.target?.result as string);
        this.currentPhoto = this.images[0];
      };
      reader.readAsDataURL(file);
    }
  }

  previousImage() {
    if (this.selectedImage > 1) {
      this.selectedImage--;
      this.currentPhoto = this.images[this.selectedImage - 1];
    }
  }

  nextImage() {
    if (this.selectedImage < this.images.length) {
      this.selectedImage++;
      this.currentPhoto = this.images[this.selectedImage - 1];
    }
  }
}
