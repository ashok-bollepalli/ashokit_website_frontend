import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

  saveFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target?.result as string;
      localStorage.setItem('/assets/upload', base64Data);
      console.log('File saved to src/assets/uploads:', file.name);
    };
   
  }
}
