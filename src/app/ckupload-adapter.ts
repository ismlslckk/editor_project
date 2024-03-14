/*
 * Copyright (c)  Arif Onur Şen
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Arif Onur Şen <a.onursen@gmail.com> 20/4/2019.
 */


/**
 * This class handles ckeditor image uploading by convert images to base64
 */
export class CKUploadAdapter {
  loader;
  url;

  constructor(loader: any, url: string) {
    this.loader = loader;
    this.url = url;
  }

  /**
   * This function get image and turning to base64
   * Accepted max file size is 2MB
   */
  upload() {
    return this.loader.file.then((file: Blob) => {
      return new Promise((resolve, reject) => {
        if (file.size / 1024 > 2048) {
          alert('Eklemiş olduğunuz dosya boyutu maksimum sınırı geçmektedir. (Maksimum = 2MB)');
          reject();
        }
        const myReader = new FileReader();
        myReader.onloadend = e => {
          resolve({ default: myReader.result });
        };

        myReader.readAsDataURL(file);
      });
    });
  }
}

/**
 * This function add {@link CKUploadAdapter} for handling image upload to ck-editor
 */
export function CKUploadAdapterPlugin(editor:any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    return new CKUploadAdapter(loader, '/image');
  };
}