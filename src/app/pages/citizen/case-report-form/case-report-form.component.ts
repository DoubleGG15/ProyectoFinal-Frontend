import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { ConflictType, ConflictCase } from '../../../models/api.models';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-case-report-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './case-report-form.component.html',
  styleUrls: ['./case-report-form.component.css'],
})
export class CaseReportFormComponent implements OnInit {
  reportForm!: FormGroup;
  selectedFile: File | null = null;
  fileError: string | null = null;

  // Lista mapeada uno a uno con el tipo estricto ConflictType
  conflictTypes: ConflictType[] = ['ruido', 'limites', 'areas comunes', 'mascotas', 'otros'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.reportForm = this.fb.group({
      conflictType: ['', [Validators.required]],
      respondentName: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;

    if (fileList && fileList.length > 0) {
      const file = fileList[0];

      // Validación estricta de tipo de archivo (Imágenes o PDF)
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        this.fileError = 'El archivo debe ser una imagen (JPG/PNG) o documento PDF.';
        this.selectedFile = null;
        return;
      }

      // Validación estricta de peso máximo (5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.fileError = 'El peso del archivo supera el límite permitido de 5MB.';
        this.selectedFile = null;
        return;
      }

      this.fileError = null;
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    if (this.reportForm.valid) {
      const formValues = this.reportForm.value;

      // Construcción atómica del objeto emulando la interfaz ConflictCase
      const newCase: Partial<ConflictCase> = {
        id: crypto.randomUUID(), // Genera un ID temporal único
        reporterId: this.authService.getUserId() || 'ciudadano-anonimo-id',
        reporterName: this.authService.getUserEmail() || 'Vecino Anónimo',
        respondentName: formValues.respondentName,
        conflictType: formValues.conflictType,
        description: formValues.description,
        address: formValues.address,
        status: 'nuevo', // Estado inicial estricto de la rúbrica
        evidenceUrls: this.selectedFile ? [this.selectedFile.name] : [], // Simulación local de carga
      };

      console.log('--- FORMULARIO VÁLIDO ENVIADO ---');
      console.log('Objeto estructurado ConflictCase listo para .NET:', newCase);

      alert('¡Reporte generado con éxito de forma local! Revisa la consola.');
      this.router.navigate(['/ciudadano/dashboard']);
    }
  }

  clearForm(): void {
    this.reportForm.reset();
    this.selectedFile = null;
    this.fileError = null;
  }
}
