import { AfterContentInit, Component } from '@angular/core';
import { CKUploadAdapterPlugin } from './ckupload-adapter';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

declare global {
  interface Window { CkEditorBilgi: any; }
}

window.CkEditorBilgi = window.CkEditorBilgi || { disaridanEklenenIcerik: '', guncelIcerik: '' };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {

  icerikBilgisiKey = 'icerikBilgisi';


  private _icerik: string = '';
  get icerik(): string {
    return this._icerik;
  }

  set icerik(text: string) {
    this._icerik = text;
    window.CkEditorBilgi.guncelIcerik = text;
  }
  ngAfterContentInit(): void {
    let p = document.querySelector('#disaridanIcerikEklendi')!
    const observerConf = { attributes: true, childList: true, subtree: true };
    const observer = new MutationObserver((list: any) => {
      this.icerik = window.CkEditorBilgi.disaridanEklenenIcerik;
    });
    observer.observe(p, observerConf);

  }

  public _editor = DecoupledEditor;
  public _editorConfig = {
    extraPlugins: [CKUploadAdapterPlugin],
    language: 'tr',
    extraAllowedContent: 'iframe[*]',
    allowedContent: 'iframe[*]'
  };




  onReady(editor: any) {
    editor.editing.view.change((writer: any) => {
      writer.setStyle('height', '750px', editor.editing.view.document.getRoot());
      writer.setStyle('background', 'white', editor.editing.view.document.getRoot());
      writer.setStyle('border', 'solid 1px', editor.editing.view.document.getRoot());
    });
    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.getEditableElement());


  }

  icerikYaz = (text: string) => {
    document.querySelector('#icerikBilgisi')!.innerHTML = text;
  }

  onReadyPreview(editor: any) {
    editor.editing.view.change((writer: any) => {
      writer.setStyle('background', 'white', editor.editing.view.document.getRoot());
    });
    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.getEditableElement());

    editor.isReadOnly = true;
  }

}
