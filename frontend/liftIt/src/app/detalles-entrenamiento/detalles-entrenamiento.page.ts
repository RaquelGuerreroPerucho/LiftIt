import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Entrenamiento } from '../services/entrenamiento.model';
import { EntrenamientoService } from '../services/entrenamiento.service';
import { Preferences } from '@capacitor/preferences';
import { catchError, of, share, tap } from 'rxjs';
import { UserService } from '../services/usuario.service';


import { NavController, Platform } from '@ionic/angular';
import { ImageService } from '../services/image.service';
import { Share } from '@capacitor/share';

import { Directory, Encoding, Filesystem, FilesystemDirectory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

import { Plugins } from '@capacitor/core';

import  {CameraResultType} from '@capacitor/camera';

import { Media } from "@capacitor-community/media";
declare var cordova: any;

const {ImageSaverPlugin} = Plugins;
const { createCanvas, Image } = require('canvas');

@Component({
  selector: 'app-detalles-entrenamiento',
  templateUrl: './detalles-entrenamiento.page.html',
  styleUrls: ['./detalles-entrenamiento.page.scss'],
})
export class DetallesEntrenamientoPage implements OnInit {
  
  idEntrenamiento: string | null;
  images = [
    'assets/imagenes/pakozoic1.png',
    'assets/imagenes/pakozoik2.png',
    'assets/imagenes/pakozoik3.png',
  ];

  id: string = "";
  calentamiento: string = "";
  core: string = "";
  duracion: string = "";
  ejerComplementarios: string = "";
  ejerPrincipales: string = "";
  enfriamiento: string = "";
  estado: string = "";
  estadoTexto: string = "";
  fecha: string = "";
  hora: string = "";
  intensidad: string = "";
  sensacion: string = "";
  titulo: string = "";
  calendar_id: string = "";
  user_id: string = "";
  path: string = 'TrainPhotos';


  imagesUrl: string[] = [];

  entrService: EntrenamientoService;
  imgService: ImageService

  constructor(private platform: Platform, private navCtrl: NavController, private route: ActivatedRoute, entrenamientoService: EntrenamientoService, userSev: UserService, imageService: ImageService) {
    this.idEntrenamiento = this.route.snapshot.paramMap.get('id');
    this.entrService = entrenamientoService;
    this.imgService = imageService;
  }

  swiperSliderChanged(e: any) {
    console.log('changed: ', e);
  }

  ngOnInit() {

  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter *****');

   this.obterDatosEntrenamiento();
  }

  async obterDatosEntrenamiento() {

    const { value: userId } = await Preferences.get({ key: 'userID' });
    const { value: userToken } = await Preferences.get({ key: 'userToken' });


    this.entrService.getEntrenamientoById(this.idEntrenamiento!, userToken!, userId!).pipe(
      tap(result => {
        console.log(result);

        this.id = result.id;
        this.calentamiento = result.calentamiento;
        this.core = result.core;
        this.duracion = result.duracion.toString();
        this.ejerComplementarios = result.ejerComplementarios;
        this.ejerPrincipales = result.ejerPrincipales;
        this.enfriamiento = result.enfriamiento;
        this.estado = result.estado ? "Completado" : "No completado";
        this.fecha = result.fecha.toString();
        this.hora = result.hora.toString();
        this.intensidad = result.intensidad;
        this.sensacion = result.sensacion;
        this.titulo = result.titulo;
        this.calendar_id = result.idCalendar;
        this.user_id = result.idUser;

        this.imgService.getAllUserImages(userId!, result.id, userToken!).pipe(
          tap(images => {
            console.log(result);

            images.forEach(image => {
              this.imagesUrl.push(this.getBase64Url(image.data));
            });

          }),
          catchError(err => {
            console.error(err);
            return of(err);
          })
        ).subscribe();
      }),
      catchError(err => {
        console.error(err);
        return of(err);
      })
    ).subscribe();

  }


  async borrarEntrenamiento() {
    console.log("Borrar entrenamiento");
    await this.deleteEntrenamiento();
  }

  async deleteEntrenamiento() {
    const { value: userToken } = await Preferences.get({ key: 'userToken' });

    this.entrService
      .deleteTraining(this.id, userToken!)
      .pipe(
        tap(async (result) => {
          console.log(result);
          this.navCtrl.navigateForward('calendario');
        }),
        catchError((err) => {
          console.error(err);
          return of(err);
        })
      )
      .subscribe();
  }

  getBase64Url(base64: string): string {
    // Verifica que el string en base64 comienza con el prefijo correcto (data:image/...)
    if (base64.startsWith('data:image')) {
      return base64;
    } else {
      // Si no, puedes agregar el prefijo tú mismo
      return `data:image/png;base64,${base64}`;
    }
  }

  //Instagram


  async saveImage(image : string): Promise<string> {
    console.log("SAVE IMAGE");
    //const base64Data = images.join(',');
    const base64Data = image;
    const fileName = `collage_${new Date().getTime()}.png`;

    console.log("FILE NAME -> ", fileName);
    console.log("FILESYSTEM DIRECTORY", FilesystemDirectory.Documents);

    try {
      await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: FilesystemDirectory.Documents
      });
  
      return fileName;
    } catch (error) {
      console.error('Error al guardar la imagen:', error);
      throw error;
    }
  }
  
  async shareOnInstagram(image: string) {
    console.log("SHARE ON INSTAGRAM");
  
    try {
      const fileName = await this.saveImage(image);
      const path = `file://${fileName}`;
      console.log("PATH -> ", path);
  
      await Share.share({
        title: 'Compartir en Instagram',
        text: `Titulo: ${this.titulo} \n
Fecha: ${this.fecha} \n
Hora: ${this.hora} \n
Intensidad: ${this.intensidad}\n
Sensaciones: ${this.sensacion}\n
Completado: ${this.estadoTexto}\n
Calentamiento: ${this.calentamiento} \n
Ejercicios Principales: ${this.ejerPrincipales}\n
Core: ${this.core}\n
Ejercicios Complementarios: ${this.ejerComplementarios} \n
Enfriamiento: ${this.enfriamiento}\n
Duracion: ${this.duracion}\n`,
        url: path,
        dialogTitle: 'Compartir con amigos'
      });
    } catch (error) {
      console.error('Error al compartir en Instagram:', error);
    }
  }
  

  async shareBase64ImageToInstagram(base64Image: string) {
    try {
      // Convertir base64 a blob
     
      const blob = this.base64ToBlob(base64Image, 'image/png');

      // Crear un archivo temporal
      const fileName = `image_${new Date().getTime()}.png`;
      const result = await Filesystem.writeFile({
        path: fileName,
        data: base64Image,
        directory: Directory.Cache,
        encoding: Encoding.UTF8
      });

     await this.savePhotoInGallery(base64Image)

      const fileUri = result.uri;

      // Compartir el archivo a Instagram
      if (fileUri) {
        try {
          await Share.share({
            title: 'Compartir en Instagram',
            text: `Titulo: ${this.titulo} \n
Fecha: ${this.fecha} \n
Hora: ${this.hora} \n
Intensidad: ${this.intensidad}\n
Sensaciones: ${this.sensacion}\n
Completado: ${this.estadoTexto}\n
Calentamiento: ${this.calentamiento} \n
Ejercicios Principales: ${this.ejerPrincipales}\n
Core: ${this.core}\n
Ejercicios Complementarios: ${this.ejerComplementarios} \n
Enfriamiento: ${this.enfriamiento}\n
Duracion: ${this.duracion}\n`,            files: [fileUri],  // Usa 'files' para compartir el archivo
           //url: "https://cdn.zendalibros.com/wp-content/uploads/brandon-sanderson-2.jpg", 
           dialogTitle: 'Compartir con amigos'
          });
        } catch (error) {
          console.error('Error compartiendo la imagen:', error);
        }
      }
    } catch (error) {
      console.error('Error sharing image', error);
    }
  }

 
/*
  base64ToBlob(base64: string, type: string) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type });
  }
*/
  async shareBase64Image(base64Image: string) {
    try {
      await Share.share({
        title: 'Compartir en Instagram',
        text: `Titulo: ${this.titulo} \n
Fecha: ${this.fecha} \n
Hora: ${this.hora} \n
Intensidad: ${this.intensidad}\n
Sensaciones: ${this.sensacion}\n
Completado: ${this.estadoTexto}\n
Calentamiento: ${this.calentamiento} \n
Ejercicios Principales: ${this.ejerPrincipales}\n
Core: ${this.core}\n
Ejercicios Complementarios: ${this.ejerComplementarios} \n
Enfriamiento: ${this.enfriamiento}\n
Duracion: ${this.duracion}\n`,//url: `data:image/jpeg;base64,*/${base64Image}`,
        url: base64Image,
        dialogTitle: 'Compartir con amigos'
      });
    } catch (error) {
      console.error('Error compartiendo la imagen:', error);
    }
  }
  
  
  async saveImageToFile(base64Image: string, filename: string) {
    try {
      const result = await Filesystem.writeFile({
        path: filename,
        data: base64Image,
        directory: Directory.Documents,  // Utiliza Directory.Documents
        encoding: Encoding.UTF8,
      });
  
      const fileUri = Capacitor.convertFileSrc(result.uri);
      return result.uri;
    } catch (error) {
      console.error('Error guardando la imagen:', error);
      return null;
    }
  }
  
  async shareImage(fileUri: string) {
   // const filename = 'shared-image.png'; // Nombre del archivo

   
   // const fileUri = await this.saveImageToFile(base64Image, filename);
  
    if (fileUri) {
      try {
        await Share.share({
          title: 'Compartir Entrenamiento',
          text: `Titulo: ${this.titulo} \n
Fecha: ${this.fecha} \n
Hora: ${this.hora} \n
Intensidad: ${this.intensidad}\n
Sensaciones: ${this.sensacion}\n
Completado: ${this.estadoTexto}\n
Calentamiento: ${this.calentamiento} \n
Ejercicios Principales: ${this.ejerPrincipales}\n
Core: ${this.core}\n
Ejercicios Complementarios: ${this.ejerComplementarios} \n
Enfriamiento: ${this.enfriamiento}\n
Duracion: ${this.duracion}\n`,
          files: [fileUri],  // Usa 'files' para compartir el archivo
         //url: "https://cdn.zendalibros.com/wp-content/uploads/brandon-sanderson-2.jpg", 
         dialogTitle: 'Compartir con amigos'
        });
      } catch (error) {
        console.error('Error compartiendo la imagen:', error);
      }
    }
  }
  
  



/*
  // Método para compartir una imagen
  async shareImage(imageUrl: string) {
    // Obtenemos la respuesta de la URL de la imagen
    const response = await fetch(imageUrl);
    // Convertimos la respuesta en un blob
    const blob = await response.blob();
    // Convertimos el blob en una cadena base64
    const base64Data = await this.convertBlobToBase64(blob) as string;

    console.log("IMAGE 64 BASE -> ", base64Data);
    // Guardamos el archivo en el sistema de archivos del dispositivo
    const savedFile = await Filesystem.writeFile({
      path: 'shared-image.jpg', // Nombre del archivo
      data: base64Data, // Datos del archivo en base64
      directory: Directory.Cache, // Directorio donde se guardará el archivo
    });

    // Compartimos el archivo
    await Share.share({
      title: 'Compartir en Instagram', // Título del contenido compartido
      text: 'Mira esta imagen', // Texto del contenido compartido
      url: savedFile.uri, // URL del archivo compartido
      dialogTitle: 'Compartir con' // Título del diálogo de compartir
    });
  }

  // Método para convertir un blob en una cadena base64
  private convertBlobToBase64(blob: Blob): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader(); // Creamos un nuevo FileReader
      reader.onerror = reject; // En caso de error, rechazamos la promesa
      reader.onload = () => {
        resolve(reader.result); // Cuando el FileReader ha terminado, resolvemos la promesa con el resultado
      };
      reader.readAsDataURL(blob); // Leemos el blob como una URL de datos
    });
  }
*/

base64ToBlob(base64: string, contentType: string): Blob {
  const sliceSize = 512;
  const byteCharacters = atob(base64);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }

  return new Blob(byteArrays, { type: contentType });
}

uploadImage(base64: string){
  const storage = getStorage();

    // Elimina el prefijo de la cadena de datos URL para obtener la cadena base64 pura
   // const newBase64 = base64.replace(/^data:image\/png;base64,/, '');

  // Comprueba si la cadena de entrada tiene el prefijo 'data:image/png;base64,'
  const base64Prefix = 'data:image/png;base64,';
  
  let newBase64 = base64;
  if (base64.indexOf(base64Prefix) === 0) {
    // Si es así, elimina el prefijo para obtener la cadena base64 pura
    newBase64 = base64.substring(base64Prefix.length);
  }

    const imageBlob = this.base64ToBlob(newBase64, 'image/png'); 
  
    const imageRef = ref(storage, 'images/' + 'image.png');
  
    uploadBytes(imageRef, imageBlob).then((snapshot) => {
      console.log('Imagen subida con éxito!');
    });
  }

  async savePhotoInGallery(photo?: string) : Promise<string> {
    console.log("SAVE PHOTO IN GALLERY");
  
    // Obtén la ruta del directorio padre y el nombre de la carpeta
    const parentPath = this.path.substring(0, this.path.lastIndexOf('/'));
    const folderName = this.path.substring(this.path.lastIndexOf('/') + 1);
  
    // Lista los archivos en el directorio padre
    const directoryContents = await Filesystem.readdir({
      path: parentPath,
      directory: Directory.Documents,
    });
  
    // Si la carpeta no existe, crearla
    if (!directoryContents.files.some(file => file.name === folderName)) {
      await Filesystem.mkdir({
        path: this.path,
        directory: Directory.Documents,
        recursive: true, // Esto creará las carpetas anidadas si no existen
      });
    }
  
    console.log("PATH ->" +this.path + `/image_${new Date().getTime()}.png`)
    // Ahora puedes guardar la foto
      const result = await Filesystem.writeFile({
        path: this.path + `/image_${new Date().getTime()}.png`,
        data: photo || '',
        directory: Directory.Documents,
      });

      console.log("CAPACITOR PLATFORM -> ", Capacitor.platform);  

      return result.uri;
    // Comprueba si la plataforma es iOS
    /*if (Capacitor.platform === 'ios') {
      ImageSaverPlugin['saveImage']({ imageData: ImageData}).then(() =>{
        console.log("Imagen guardada con éxito");
      }).catch((error: any) => {
        console.error("Error al guardar la imagen", error);
      })
      // Guarda la imagen en el álbum de fotos
  //   ImageSaver['writeToPhotoAlbum']({ path: result.uri });
    }*/
}

/*
async createCollage(imagesBase64: string[]) {
  // Crear un nuevo lienzo
  const canvas = document.createElement('canvas');
  canvas.width = 800; // Ajusta esto a tus necesidades
  canvas.height = 600; // Ajusta esto a tus necesidades
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No se pudo obtener el contexto de renderizado 2D');
  }

  // Combinar las imágenes en el lienzo
  for (let i = 0; i < imagesBase64.length; i++) {
    const imageBase64 = imagesBase64[i];
    const x = (i % 2) * 400; // Ajusta esto a tus necesidades
    const y = Math.floor(i / 2) * 300; // Ajusta esto a tus necesidades

    // Crear una nueva imagen a partir de la cadena en base64
    const img = new Image();
    img.src = 'data:image/png;base64,' + imageBase64;

    // Esperar a que la imagen se cargue antes de dibujarla en el lienzo
    await new Promise<string>((resolve) => {
      img.onload = () => {
        ctx.drawImage(img, x, y);
        console.log("canvas " + canvas.toDataURL());
        resolve(canvas.toDataURL());
      };
    });
  }
  */

  // Convertir el lienzo en una imagen en base64 y devolverla
 /* const outputImageBase64 = canvas.toDataURL('image/png').split(',')[1];
  return outputImageBase64;
}
*/
/*
async createCollage(imagesBase64: string[]) {
  console.log("CREATE COLLAGE");
  const canvas = createCanvas(800, 600); // Ajusta el tamaño del lienzo a tus necesidades
  console.log("GET create canvas -> ", canvas);
  const ctx = canvas.getContext('2d');

  console.log("GET CONEXGTION 2D -> ", ctx);

  let x = 0;
  let y = 0;
  if (canvas == null){
    console.log("CANVAS NULL");
  }
  if (ctx == null){
    console.log("CTX NULL");
  }

  // Crear un array para almacenar las promesas
  console.log("before PRomise create ");

  let promises = imagesBase64.map(imageBase64 => new Promise<void>((resolve, reject) => {
    console.log("PRomise create ");

    let img = new Image();
    console.log("IMAGE BASE 64 ");
    img.onload = () => {
      console.log("Loaded image", img.width, img.height);
      ctx.drawImage(img, x, y);

      x += img.width;
      if (x >= canvas.width) {
        x = 0;
        y += img.height;
      }

      resolve();
    };
    img.onerror = reject;
    img.src = imageBase64;
  }));*/

  // Esperar a que todas las promesas se resuelvan
 /* await Promise.all(promises);

  console.log("CANVAS -> ", canvas.toDataURL());
  return canvas.toDataURL(); // Devuelve el collage como una imagen en base64
}


*/

  // Método que se llama cuando se hace clic en compartir
  async onShareClick() {

    let imagesURLSinCabecera: string[] = [];
    this.imagesUrl.forEach(image => {
      const base64Prefix = 'data:image/png;base64,';

      if (image.indexOf(base64Prefix) === 0) {
        let img = image.substring(base64Prefix.length);
        // Si es así, elimina el prefijo para obtener la cadena base64 pura
       imagesURLSinCabecera.push(img);
      }else{
        imagesURLSinCabecera.push(image);    
      }
    });

    console.log("IMAGES URL -> ", this.imagesUrl.length);
    console.log("IMAGES URL SIN CABECERA -> ", imagesURLSinCabecera.length);
//    imagesURLSinCabecera.forEach(image => {
//      console.log("IMAGE -> ", image);
//    });
/*
this.createCollage(this.imagesUrl).then(async collageBase64 => {
  await this.savePhotoInGallery(collageBase64 as string); // Aquí tienes tu collage en base64
});*/

/*this.imagesUrl.forEach(async image => {
  await this.savePhotoInGallery(image as string); // Aquí tienes tu collage en base64∫
});*/

/*this.createCollage(this.imagesUrl).then(async collageBase64 => {
  await this.shareImage(
    await this.savePhotoInGallery(collageBase64 as string)
   ); // Aquí tienes tu collage en base64
});*/

await this.shareImage(await this.savePhotoInGallery(this.imagesUrl[0] as string));
   

//await this.savePhotoInGallery(this.imagesUrl[0] as string); // Aquí tienes tu collage en base64∫


 //await this.shareOnInstagram(newBase64);
   // await this.shareBase64ImageToInstagram(newBase64);


   /* // Ruta de la imagen de los assets
    const imageUrl = 'assets/imagenes/pakozoic1.jpg';
    // Llamamos al método shareImage con la ruta de la imagen de los assets
    this.shareOnInstagram(this.imagesUrl);*/

    //await this.shareOnInstagram(this.images);

    //await this.shareImage(this.images[0]);

  //const blob = this.base64ToBlob(this.imagesUrl[0], 'image/png'); // Asegúrate de usar el tipo de contenido correcto para tu imagen

 /* this.uploadImage(blob, 'path/to/image.jpg')
  .then(snapshot => {
    console.log('Imagen subida con éxito');
  })
  .catch(error => {
    console.error('Error al subir la imagen', error);
  });
*/

 // this.uploadImage(`${this.imagesUrl[0]}`);
   // await this.shareBase64ImageToInstagram(this.imagesUrl[0]);

  }

  navegarAModificarEntrenamiento() {
  console.log('Navegar a modificar entrenamiento');
  let parametros = `calentamiento=${this.calentamiento}&core=${this.core}&duracion=${this.duracion}&ejerComplementarios=${this.ejerComplementarios}&ejerPrincipales=${this.ejerPrincipales}&enfriamiento=${this.enfriamiento}&estado=${this.estado}&estadoTexto=${this.estadoTexto}&intensidad=${this.intensidad}&sensacion=${this.sensacion}&titulo=${this.titulo}&idEntrenamiento=${this.id}&estado={this.estado}&fecha=${this.fecha}&hora=${this.hora}&calendar_id=${this.calendar_id}`;
  this.navCtrl.navigateForward(`/editar-entrenamiento?${parametros}`);

}

/*
async ensureDemoAlbum(){
  const {albums } = await Media.getAlbums();
  let demoAlbum = undefined;
  if (Capacitor)
}
  */

}
