import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PropertyDto, PropertyService } from '../../services/property';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.page.html',
  styleUrls: ['./property-form.page.scss'],
  standalone: false,
})
export class PropertyFormPage implements OnInit {
  id?: number;
  model: PropertyDto = {
    title: '',
    description: '',
    price: undefined,
    propertyType: 'piso',
    transactionType: 'venta',
    bedrooms: undefined,
    city: '',
    images: '',
    contactPhone: '',
  };
  saving = false;
  imageUrl: string = '';
  generating = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.load(this.id);
    }
  }

  load(id: number) {
    this.propertyService.getById(id).subscribe((data) => {
      this.model = { ...data };
      this.imageUrl = this.model.images || '';
    });
  }

  async save() {
    this.saving = true;
    const payload: PropertyDto = {
      ...this.model,
      images: this.imageUrl || '',
    };
    const req = this.id ? this.propertyService.update(this.id, payload) : this.propertyService.create(payload);
    // notify user of success or failure and redirect to list
    req.subscribe({
      next: async () => {
        this.saving = false;
        const t = await this.toastCtrl.create({
          message: 'Guardado correctamente',
          duration: 1500,
          color: 'success',
        });
        t.present();
        this.router.navigateByUrl('/property-list');
      },
      error: async (err) => {
        this.saving = false;
        const t = await this.toastCtrl.create({
          message: 'No se pudo guardar',
          duration: 2000,
          color: 'danger',
        });
        t.present();
        console.error(err);
      },
    });
  }
  // Check if we can generate AI description 
  canGenerateAI(): boolean {
    return !!(this.model.title && this.model.propertyType && this.model.transactionType && this.model.bedrooms != null && this.model.bedrooms !== undefined && this.model.city);
  }

  async generateAI() {
    if (!this.canGenerateAI()) {return;}
    this.generating = true;
    this.propertyService
      .generateDescription({
        title: this.model.title!,
        propertyType: this.model.propertyType || '',
        transactionType: this.model.transactionType || '',
        bedrooms: Number(this.model.bedrooms || 0),
        city: this.model.city || '',
      })
      .subscribe({
        next: async (res) => {
          this.model.description = res?.description || this.model.description;
          this.generating = false;
          const t = await this.toastCtrl.create({
            message: 'Descripción generada',
            duration: 1200,
            color: 'success',
          });
          t.present();
        },
        error: async (err) => {
          this.generating = false;
          const t = await this.toastCtrl.create({
            message: 'No se pudo generar la descripción',
            duration: 2000,
            color: 'danger',
          });
          t.present();
          console.error(err);
        },
      });
  }
}
