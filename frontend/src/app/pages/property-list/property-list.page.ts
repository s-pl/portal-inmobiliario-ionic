import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { PropertyDto, PropertyService } from '../../services/property';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.page.html',
  styleUrls: ['./property-list.page.scss'],
  standalone: false,
})
export class PropertyListPage implements OnInit {
  loading = false;
  properties: PropertyDto[] = [];
  filtered: PropertyDto[] = [];
  query = '';

  constructor(
    private propertyService: PropertyService,
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.load();
  }

  // Ionic lifecycle: called each time the view is about to enter
  ionViewWillEnter() {
    this.load();
  }

  async load(event?: any) {
    this.loading = true;
    this.propertyService.getAll().subscribe({
      next: (data) => {
        this.properties = data;
        this.applySearch();
        this.loading = false;
        event?.target?.complete?.();
      },
      error: async (err) => {
        this.loading = false;
        event?.target?.complete?.();
        const t = await this.toastCtrl.create({
          message: 'Error cargando propiedades',
          duration: 2000,
          color: 'danger',
        });
        t.present();
        console.error(err);
      },
    });
  }

  addNew() {
    this.router.navigateByUrl('/property-form');
  }

  edit(item: PropertyDto) {
    if (!item.id) return;
    this.router.navigate(['/property-form', item.id]);
  }

  async confirmDelete(item: PropertyDto) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar',
      message: '¿Seguro que quieres eliminar esta propiedad?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => this.remove(item),
        },
      ],
    });
    await alert.present();
  }

  async remove(item: PropertyDto) {
    if (!item.id) return;
    this.propertyService.delete(item.id).subscribe({
      next: async () => {
        this.properties = this.properties.filter((p) => p.id !== item.id);
        this.applySearch();
        const t = await this.toastCtrl.create({
          message: 'Propiedad eliminada',
          duration: 1500,
          color: 'success',
        });
        t.present();
      },
      error: async (err) => {
        const t = await this.toastCtrl.create({
          message: 'No se pudo eliminar',
          duration: 2000,
          color: 'danger',
        });
        t.present();
        console.error(err);
      },
    });
  }

  applySearch() {
    const q = this.query.trim().toLowerCase();
    if (!q) {
      this.filtered = [...this.properties];
      return;
    }
    this.filtered = this.properties.filter((p) => {
      const title = (p.title || '').toLowerCase();
      const city = (p.city || '').toLowerCase();
      return title.includes(q) || city.includes(q);
    });
  }
}
